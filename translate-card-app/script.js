// --- 模拟生成卡片的功能 (把这个替换进你之前的JS里) ---
// 注意：这里为了演示UI，我用的是假数据 (mock)。
// 你需要把你之前的 fetch 逻辑套进 renderCard 函数里。

function mockTranslate() {
  // 假设这是后端返回的数据
  const data = {
    chinese:
      document.getElementById("inputText").value || "你好，今天天气不错。",
    english_words: ["Hello", ",", "the", "weather", "is", "nice", "today", "."],
    japanese_words: [
      { word: "今日", reading: "キョウ" },
      { word: "は", reading: "ハ" },
      { word: "いい", reading: "イイ" },
      { word: "天気", reading: "テンキ" },
      { word: "ですね", reading: "デスネ" },
    ],
  };
  renderCard(data);
}

function renderCard(data) {
  const container = document.getElementById("outputArea");

  // 创建卡片容器
  const card = document.createElement("div");
  card.className = "card";

  // 1. 中文头
  let html = `<div class="card-header">${data.chinese}</div>`;

  // 2. 英文区
  html += `<div class="lang-section en-section">
                        <div class="section-label">English</div>
                        <div class="speaker-icon" onclick="alert('朗读英文')">🔊</div>
                        <div class="word-container">`;
  data.english_words.forEach((w) => {
    html += `<span class="word-span" onclick="showDefinition('${w}', '', 'en')">${w}</span> `;
  });
  html += `</div></div>`;

  // 3. 日文区
  html += `<div class="lang-section jp-section">
                        <div class="section-label">日本語</div>
                        <div class="speaker-icon" onclick="alert('朗读日文')">🔊</div>
                        <div class="word-container">`;
  data.japanese_words.forEach((item) => {
    html += `<span class="word-span" onclick="showDefinition('${item.word}', '${item.reading}', 'ja')">${item.word}</span>`;
  });
  html += `</div></div>`;

  card.innerHTML = html;

  // 把新卡片插到最前面 (最新的在最上面)
  container.insertBefore(card, container.firstChild);
}

// --- 底部弹窗逻辑 ---
function showDefinition(word, reading, lang) {
  const sheet = document.getElementById("bottomSheet");
  const overlay = document.getElementById("overlay");
  const title = document.getElementById("sheetWord");
  const sub = document.getElementById("sheetReading");
  const body = document.getElementById("sheetDefinition");

  title.innerText = word;
  sub.innerText = reading ? `[${reading}]` : "";

  // 这里应该调用你的 fetch API 去查字典
  body.innerText = "这里是查询到的含义，例如：n. 天气，气象...";

  sheet.classList.add("active");
  overlay.classList.add("active");
}

function closeSheet() {
  document.getElementById("bottomSheet").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}
