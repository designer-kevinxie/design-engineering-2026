// ==========================================
// 📦 模块一：中央数据库 (Design System Data)
// ==========================================

// 1. 镜框数据库
const framesDatabase = [
  { id: "brown", name: "ブラウン", cssColor: "#5e3b33", img: "./assets/jins-glasses-brown.webp" },
  { id: "black", name: "ブラック", cssColor: "#3e2b26", img: "./assets/jins-glasses-black.webp" }
];

// 2. 镜片数据库
const lensesDatabase = [
  { id: "01", name: "通常クリアレンズ", price: 0, img: "./assets/clear-lens.png" },
  { id: "02", name: "JINS SCREEN", price: 5500, img: "./assets/clear-lens.png" },
  { id: "03", name: "極薄レンズ", price: 11000, img: "./assets/clear-lens.png" }
];

// 3. 常量定义
const BASE_PRICE = 19900; // 镜框基础价
const DRAFT_KEY = "jins_current_draft"; // 用来保存用户没结账时的当前选择
const CART_KEY = "jins_shopping_cart"; // 用来保存真正的购物车订单


// ==========================================
// 📝 模块二：全局状态 (The State)
// ==========================================
// 这是整个页面的“灵魂”。页面上显示什么，全听它的。
let currentOrder = {
  frameId: "brown", 
  frameName: "ブラウン",
  lensId: "01", 
  lensName: "通常クリアレンズ",
  lensPrice: 0,
  totalPrice: 19900
};


// ==========================================
// 🚀 模块三：初始化 (页面刚加载时干的活)
// ==========================================
window.addEventListener("load", () => {
  // 1. 先尝试从草稿箱里恢复用户上次选的东西
  loadDraftFromLocal(); 
  
  // 2. 启动两台自动铺货机器 (它们会根据 currentOrder 自动打勾)
  renderAndBindFrames();
  renderAndBindLenses();
  
  // 3. 更新结算卡片的总价和文字
  updateSummaryUI();

  // 4. 更新购物车右上角的小红点
  updateCartBadge();
});


// ==========================================
// 🏭 模块四：渲染与绑定机器 (Render Functions)
// ==========================================

// [F]：渲染镜框颜色
function renderAndBindFrames(){
    const container = document.getElementById("color-swatches-container");
    let htmlString = "";

    framesDatabase.forEach(frame =>{
        let isActive = "";
        if (frame.id === currentOrder.frameId){
            isActive = "color-active";
        }
        htmlString +=`
            <li
              class="color-option ${isActive}"
              style="--btn-color: ${frame.cssColor}"
              data-glasses-color="${frame.id}">
            </li>
        `
        
    });
    // 一次性上架
    container.innerHTML = htmlString;

    // 🎯 给新上架的颜色按钮绑点击事件
    document.querySelectorAll(".color-option").forEach(btn =>{
        btn.addEventListener("click",(e)=>{
            const clickedId = e.currentTarget.dataset.glassesColor;

            //get data when clicked
            const targetData = framesDatabase.find(item => item.id ===clickedId);

            //update current order data
            currentOrder.frameId = targetData.id;
            currentOrder.frameName = targetData.name;
            
            //save data and update UI
            // calls itself 只要我改了数据，就调用一次渲染函数，画面永远是 100% 正确的！
            saveDraftToLocal();
            renderAndBindFrames();
            updateSummaryUI();
            
            
        });
    });
};

// [F]：渲染镜片卡片
function renderAndBindLenses(){
    const container = document.getElementById("lenses-container");
    let htmlString = "";
    lensesDatabase.forEach((lens)=>{
        let isActive = "";
        if(lens.id ===currentOrder.lensId){
            isActive = "card-active";
        }
        htmlString +=`
        <div class="lenses-card ${isActive}" data-lenses-id="${lens.id}">
              <img src="${lens.img}" alt="image of a clear lens" />
              <p>${lens.name}</p>
              <div class="plus-price">
                <span>+</span>
                <span class="price-in-card">¥${lens.price}</span>
              </div>
            </div>
        `
    });

    container.innerHTML = htmlString;
    
    // 🎯 给新上架的按钮绑点击事件
    document.querySelectorAll(".lenses-card").forEach((card)=>{
        card.addEventListener("click",(e)=>{
            const clickedId = e.currentTarget.dataset.lensesId;

             //get data when clicked
            const targetData = lensesDatabase.find(item => item.id === clickedId);
            
            currentOrder.lensId = targetData.id;
            currentOrder.lensName = targetData.name;
            currentOrder.lensPrice = targetData.price;
            currentOrder.totalPrice = BASE_PRICE + targetData.price;
            
            saveDraftToLocal();
            renderAndBindLenses();
            updateSummaryUI();
            
        });
    });
};


//[F]：统一修改页面上散落的文字和图片
function updateSummaryUI(){
    // 1. find data depending on current frame and update frame lenses text
    const currentFrameData = framesDatabase.find(f => f.id === currentOrder.frameId);
    document.querySelector("#glasses-image").src = currentFrameData.img;
    document.querySelector("#selected-frame-color").textContent = currentFrameData.name;
    document.querySelector("#selected-frame-color-check").textContent = currentFrameData.name;
    
    // 1. find data depending on current lenses and update lenses text
    const currentLensesData = lensesDatabase.find(l => l.id ===currentOrder.lensId);
    document.querySelector("#selected-lenses").textContent = currentLensesData.name;
    document.querySelector("#selected-lenses-check").textContent = currentLensesData.name;

    // update price text
    document.querySelector("#lenses-price-check").textContent = formatPrice(currentLensesData.price);
    document.querySelector("#base-price-check").textContent = formatPrice(BASE_PRICE);
    document.querySelector("#total-price-check").textContent = formatPrice(currentOrder.totalPrice);
};

// ==========================================
// 💾 模块五：数据持久化 (LocalStorage)
// ==========================================
// [草稿箱]：每次点击都存一下，刷新页面不丢失

//[F]:save & load Draft to local
function saveDraftToLocal() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(currentOrder));
};
function loadDraftFromLocal(){
    const draft = localStorage.getItem(DRAFT_KEY);
    if(draft){
        currentOrder = JSON.parse(draft);
    }
};

//[F]:add to cart and save to local
function addToCart(){
    let cartList = [];
    try {
        const existhingCartData = localStorage.getItem(CART_KEY);
        cartList = existhingCartData ? JSON.parse(existhingCartData) : [];
    } catch (error) {
        cartList = [];
    }

    const newItem = {
        ...currentOrder,
        orderId: Date.now(),
        date: new Date().toLocaleDateString()
    };

    cartList.push(newItem);
    localStorage.setItem(CART_KEY,JSON.stringify(cartList));

    updateCartBadge();
};

//[F]:cart badge number
function updateCartBadge(){
    try {
        const existhingCartData = localStorage.getItem(CART_KEY);
        const cartList = existhingCartData ? JSON.parse(existhingCartData) : [];
        document.getElementById("cart-badge").innerText = cartList.length;
    } catch (error) {
        document.getElementById("cart-badge").innerText = "0";
    }
};


// ==========================================
// 🛠️ 模块六：杂项交互 (格式化、Toast、收藏)
// ==========================================

//[F]:currency price formatting tool
function formatPrice(price) {
  // 创建一个“日元格式化工具”
  // 'ja-JP' = 日本标准
  // style: 'currency' = 货币模式
  // currency: 'JPY' = 日元
  let formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });
  // 输出结果： "￥19,900" (注意：它自动加上了符号)
  return formatter.format(price);
}

//[F]:add to cart button click event

document.querySelector(".purchase-button").addEventListener("click",()=>{
    addToCart();
    showToast("商品をカートに追加しました");
});


//[F]: Toast 弹窗
function showToast(message) {
  const toastPopUp = document.createElement("div");
  toastPopUp.className = "toast-notification";
  toastPopUp.innerHTML = `
   <span>${message}</span>
   <div class="icon-close">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
   </div>
  `;
  document.body.appendChild(toastPopUp);
  toastPopUp.addEventListener("animationend", () => toastPopUp.remove());
}

// [F]: favorite icon 收藏按钮
document.querySelector(".favorite-button").addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active");
});