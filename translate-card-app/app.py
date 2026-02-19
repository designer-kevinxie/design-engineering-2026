import os
import sqlite3
from flask import Flask, render_template, request, jsonify
from janome.tokenizer import Tokenizer
from google import genai


# 初始化 Flask 应用
app = Flask(__name__)

# --- 配置部分 ---
# 请将此处替换为你的 API Key
# 建议使用环境变量，但在初学阶段可以直接填入测试
# 推荐使用 Gemini Flash 或 GPT-4o-mini 以节省成本
API_KEY = "AIzaSyAK1T3-jwvaHfIdc5b3DjtWaMm1CRhP6RU" 
# client = OpenAI(api_key=API_KEY, base_url="...") # 如果用Gemini需调整base_url
client = genai.Client(api_key= API_KEY)

# 初始化日文分词器 (这是免费的本地库，不用消耗 token)
# 它的作用是把 "私は学生です" 切分成 "私", "は", "学生", "です"
jp_tokenizer = Tokenizer()

# --- 数据库部分 ---
def init_db():
    """初始化数据库，创建一个用来存句子的表"""
    conn = sqlite3.connect('my_study_app.db')
    c = conn.cursor()
    # 创建一个表：包含ID，中文原文，英文翻译，日文翻译
    c.execute('''CREATE TABLE IF NOT EXISTS history
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  chinese TEXT, 
                  english TEXT, 
                  japanese TEXT)''')
    conn.commit()
    conn.close()

# 启动时先运行一次数据库初始化
init_db()

# --- 路由部分 (网页的访问入口) ---

@app.route('/')
def index():
    """主页：显示输入框和历史记录"""
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    """
    核心功能：
    1. 接收中文
    2. 用 AI 翻译成英日
    3. 用本地代码把日文切分成单词
    4. 保存并返回结果
    """
    data = request.json
    text = data.get('text')

    # 1. 调用 AI 进行翻译 (这是唯一花费 token 的地方)
    # 提示词设计：要求它返回特定的格式，方便我们解析
    prompt = f"Please translate the following Chinese text into natural English and Japanese.\nText: {text}\nFormat:\nEnglish: [English translation]\nJapanese: [Japanese translation]"
    
    try:
        # 这里使用 gpt-4o-mini 或 gemini-1.5-flash
        response = client.models.generate_content(
             model="gemini-2.5-flash-lite", contents = prompt
        )
        result_text = response.text

        # 简单地解析 AI 返回的文本 (根据上面要求的格式)
        # 实际开发中可能需要更严谨的解析
        english_res = result_text.split("English:")[1].split("Japanese:")[0].strip()
        japanese_res = result_text.split("Japanese:")[1].strip()

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # 2. 对日文进行分词 (本地运行，免费)
    # 我们需要把句子拆开，前端才能实现“点击单个单词”
    jp_words = []
    for token in jp_tokenizer.tokenize(japanese_res):
        # token.surface 是单词本身 (如 "学生")
        # token.reading 是读音 (如 "ガクセイ")，这对于学习日文很有用！
        jp_words.append({
            "word": token.surface,
            "reading": token.reading
        })

    # 3. 把英文按空格切分 (简单处理)
    en_words = english_res.split(' ')

    # 4. 保存到数据库 (供复习用)
    conn = sqlite3.connect('my_study_app.db')
    c = conn.cursor()
    c.execute("INSERT INTO history (chinese, english, japanese) VALUES (?, ?, ?)", 
              (text, english_res, japanese_res))
    conn.commit()
    conn.close()

    # 返回给前端
    return jsonify({
        "english_full": english_res,
        "english_words": en_words,
        "japanese_full": japanese_res,
        "japanese_words": jp_words
    })

if __name__ == '__main__':
    app.run(debug=True)