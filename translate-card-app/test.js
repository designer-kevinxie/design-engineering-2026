const inputEl = document.getElementById("input-text");
const btnEl = document.getElementById("save-btn");

// -------------------------------------------
// 1. 页面加载事件
// -------------------------------------------
// 页面加载时自动读取
window.addEventListener("load", () => {
  console.log("页面加载完毕，开始加载本地数据");
  loadHistory(); //加载数据并画图
});

// -------------------------------------------
// 1. 点击事件
// -------------------------------------------
btnEl.addEventListener("click", async () => {
  const text = inputEl.value; //value 用户输入的内容

  // 只有当用户真的输入了内容才继续
  if (text.trim() === "") {
    alert("还没输入内容呢！");
    return;
  }
  //把输入内容创建js对象
  const dataObject = {
    text: text,
    timestamp: Date.now(),
  };
  // console.log("🌟 生成的对象text:", dataObject.text);

  // 传输到python端并返回数据(对象)
  const receivedResult = await sendToPython(dataObject);
  if (!receivedResult) {
    console.log("翻译没成功，停止后续操作");
    return;
  }
  console.log("前端接收到的数据:", receivedResult);

  //存储数据
  saveToHistory(dataObject.text, receivedResult);
  //更新UI
  const card = createCardElement(
    dataObject.text,
    receivedResult.english,
    receivedResult.japanese,
  );
  addCardTopage(card);
  inputEl.value = ""; //清空输入框
});

// -------------------------------------------
// 2. 向后端请求数据，接收数据，保存数据
// -------------------------------------------

//async 告诉浏览器：这个函数里有耗时操作，别让它卡死界面
//只要函数前加了 async，它返回的永远是一个 Promise。
async function sendToPython(dataObject) {
  // 准备 UX：比如让按钮变成“翻译中...”，防止用户狂点
  const btn = document.getElementById("save-btn");
  const originalText = btn.textContent; //textContent 元素文字内容
  btn.textContent = "⏳ 翻译中...";
  btn.disabled = true; // 禁用按钮

  try {
    //await 意思是：等这个请求有了结果再往下执行)
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObject),
    });

    if (!response.ok) {
      // 💣 扔出手雷！(跳出 try 块)
      throw new Error(`服务器出错了：${response.status}`);
    }

    // 成功获取数据。Successfully recevied data
    // 解析结果 (把 Python 返回的 JSON 字符串变回 JS 对象)
    const resultData = await response.json(); //自动调用了 JSON.parse()把json转成了对象。这个对象含有‘status，received’两个属性
    console.log("✅ Python 返回的数据:", resultData);
    const result = JSON.parse(resultData.received); //把json字符串转成对象
    console.log("✅ 转成对象:", result);
    return result;
  } catch (e) {
    // 🛡️ 接住手雷！
    // 这里的 error 就是你上面 throw 的那个 Error 对象
    console.log("没事，我接住了错误：", e.message);
    // 🚑 救火措施：告诉用户发生了什么
    alert("翻译失败，请检查网络或后端。");
  } finally {
    // 🧹 打扫战场 无论有没有出错，这里都会执行
    // 🔓 关键：把按钮恢复，让用户能试第二次
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// -------------------------------------------
// 3. 浏览器本地存储 (LocalStorage)
// -------------------------------------------

function saveToHistory(originalText, translationResult) {
  //1. 数据库表名
  const KEY = "translation_history";

  // 2. 单个数据对象（一条记录）
  const record = {
    id: Date.now(),
    original: originalText,
    english: translationResult.english,
    japanese: translationResult.japanese,
    date: new Date().toLocaleDateString(),
  };

  //3.取出旧数据，如果没有就给个空数组，取回的数据永远是字符串，所以需要JSON.parse转成对象

  let historyList;

  try {
    const jsonString = localStorage.getItem(KEY);
    historyList = JSON.parse(jsonString) || [];
  } catch (error) {
    console.error("(save阶段)历史记录损坏，重置数据库");
    historyList = [];
    // 可选：顺便把坏掉的数据清空，防止下次还报错
    localStorage.removeItem(KEY);
  }

  //4.添加记录到最前面（unshift）
  historyList.unshift(record);

  //存回localStorage，必须再次 Stringify转回字符串，因为 LocalStorage 不收对象
  localStorage.setItem(KEY, JSON.stringify(historyList));

  console.log("✅ 已保存到本地历史:", record);
}

// -------------------------------------------
// 4. 读取并显示本地存储 (LocalStorage)
// -------------------------------------------

function loadHistory() {
  //1. 用数据库表名获取字符串数据
  const KEY = "translation_history";
  const jsonString = localStorage.getItem(KEY);

  if (!jsonString) return; //如果没有本地数据，就停止。
  try {
    const historyList = JSON.parse(jsonString);

    // 🚀 性能优化：使用文档碎片，一次性插入
    const fragment = document.createDocumentFragment();

    historyList.forEach((record) => {
      const card = createCardElement(
        record.original,
        record.english,
        record.japanese,
        record.date,
      );
      // 先挂在碎片上
      fragment.append(card);
    });
    // 一次性挂在墙上
    document.getElementById("results-container").appendChild(fragment);
  } catch (error) {
    console.error("初加载数据失败", error);
    // localStorage.removeItem(KEY);
  }
}

// -------------------------------------------
// 4. create Card 函数。只负责画画，不管数据是从 Python 来的，还是从 LocalStorage 来的。
// -------------------------------------------

function createCardElement(original, english, japanese, timestamp) {
  //创建容器
  const card = document.createElement("div");
  card.className = "sentence-card fade-in"; // 记得写好 CSS 动画

  card.innerHTML = `
    <div class="card-header">
      <span class="time">${timestamp || new Date().toLocaleTimeString()}</span>
      <div class="original-part">
        <span class="original-text">${original}</span>
        <button class="delete-btn" onclick="deleteItem(this)">X</button>
      </div>
    </div>
    <div class="card-body">
      <div class="lang-row">
        <span class="lang-tag">🇬🇧</span>
        <p>${english}</p>
      </div>
      <div class="lang-row">
        <span class="lang-tag">🇯🇵</span>
        <p>${japanese}</p>
      </div>
    </div>
    
    `;
  return card;
}
//📌 把卡片贴到墙上 (Container)
function addCardTopage(cardElement) {
  const container = document.getElementById("results-container");
  container.prepend(cardElement);
}
