from google import genai
from flask import Flask, jsonify, request
from flask_cors import CORS  # 导入这个
from config import API_KEY

app = Flask(__name__)
CORS(app)  # 关键一句：允许所有来源访问你的 API

# -------------------------------------------
# 1. 配置区域 (Configuration)
# -------------------------------------------

client = genai.Client(api_key= API_KEY)
prompt = """
You are a professional translator.Translate user-inputted Chinese into the most common,natural English and Japanese expressions.
Please return the result in PURE JSON format (no markdown code blocks,No Romanization for Japanese needed), with keys: "english" and "japanese".
Here is input text:
"""


# -------------------------------------------
# 2. 工具函数 (Helper Functions)
# -------------------------------------------

def translate_with_gemini(text):
    print("🤔 正在思考地道的表達方式...")
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", 
            contents=f"{prompt} {text}"
            )
       
        # 简单清洗一下返回数据，防止 Gemini 有时候会加 ```json ... ```
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        return clean_text
 
    except Exception as e:
        print(f"❌ Gemini 调用失败: {e}")
        return None
    
# -------------------------------------------
# 3. 路由接口 (Routes)
# -------------------------------------------


@app.route("/translate",methods=["POST"])
def translate_func():
    # 1. 解析前端数据
    # request.json 是 Flask 的魔法属性。
    # 它会自动看包裹标签（Content-Type），发现是 json，
    # 就会自动把刚才那个json字符串 '{"text": "句子句子"}' 
    # 变回 Python 的字典：{'text': '句子句子'}
    data = request.json

    # 前端传的 key 叫 'text'，所以这里用 ['text'] 取出来
    # data['text']：如果字典中不存在 'text' 这个键，程序会直接抛出 KeyError 异常导致崩溃。
    # 使用 data.get('text')：如果键不存在，它会默认返回 None 而不会报错。
    user_text = data.get('text')
    if not user_text:
        return jsonify({"status": "error", "message": "没有收到内容"}), 400
    print(f"📩 收到前端请求: {user_text}")

    
    # 2. 调用 Gemini
    gemini_result = translate_with_gemini(user_text)
    print(gemini_result)

    # 3. 返回给前端（返回一个对象的json格式）
    if gemini_result:
        return jsonify({
            "status": "success",
            "received": gemini_result
            })
    else:
        return jsonify({"status": "error", "message": "翻译服务暂时不可用"}),500




# -------------------------------------------
# 4. 启动程序
# -------------------------------------------
if __name__ == "__main__":
    print("🚀 Flask 服务器已启动: http://127.0.0.1:5000")
    app.run(port=5000,debug=True)