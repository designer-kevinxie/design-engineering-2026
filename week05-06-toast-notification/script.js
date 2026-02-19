
const glassesImages = {
  black: "./assets/jins-glasses-black.webp",
  brown: "./assets/jins-glasses-brown.webp",
  tortoise: "./assets/jins-glasses-tortoise.webp", // 以后加颜色只需要改这里
};

const currentOrder = {
  // 控制 UI 用的 Key
  colorKey: "brown",    
  lensId: "01",         
  lensPrice: 0,         

  // 显示和存购物车用的 Value
  colorName: "ブラウン", 
  lensName: "通常クリアレンズ",
  totalPrice: 19900
}


const CART_KEY = "jins_shopping_cart";


////////////////////////windows load////////////////////
/////////////////////////////////////////////////////////
window.addEventListener("load",()=>{
  
  let existhingCartData = [];

  try {
    const savedData = localStorage.getItem(CART_KEY);
    existhingCartData = savedData ? JSON.parse(savedData) : [];
    if (existhingCartData.length === 0) return;
    
    latestCartData = existhingCartData.at(-1);

    document.querySelector(".cart-badge").innerText = existhingCartData.length;
   
    //update img
    updateColor(latestCartData.colorKey);//black/ brown
    //update color option
    document.querySelectorAll(".color-option").forEach(c => c.classList.remove("color-active"));
    document.querySelector(`[data-glasses-color="${latestCartData.colorKey}"]`).classList.add("color-active");
    //update card style
    document.querySelectorAll(".lenses-card").forEach(c =>c.classList.remove("card-active"));
    document.querySelector(`[data-lenses-id="${latestCartData.lensId}"]`).classList.add("card-active");
    
    //uodate text
    updateLensesText(latestCartData.lensName);
    document.querySelector(".lenses-price").innerText = formatPrice(latestCartData.lensPrice);
    document.querySelector(".total-price").innerText = latestCartData.totalPrice;

  } catch (error) {
    console.log(error);
  }
  
  
});

////////////////////////choose frame////////////////////
/////////////////////////////////////////////////////////
const colorSwatches = document.querySelectorAll(".color-option");
colorSwatches.forEach((color) => {
  color.addEventListener("click", (e) => {
    const currentSwatch = e.currentTarget;
    const currentColor = currentSwatch.dataset.glassesColor;

    //// update swatches style(remove others style and toggle)
    colorSwatches.forEach((c) => {
      c.classList.remove("color-active");
    });
    currentSwatch.classList.toggle("color-active");

    // change image and text
    updateColor(currentColor);
  });
});

//[F]:update image and text
function updateColor(color) {
  const glassesImg = document.querySelector(".glasses-image");
  const colorText = document.querySelector(".selected-color-text");
  const popUpFrameText = document.querySelector("#selected-frame");

  glassesImg.src = glassesImages[color];

  if (color == "black") {
    colorText.innerText = "ブラック";
    popUpFrameText.innerText = "ブラック";
    currentOrder.colorName = "ブラック";
    currentOrder.colorKey = "black";
  } else if (color == "brown") {
    colorText.innerText = "ブラウン";
    popUpFrameText.innerText = "ブラウン";
    currentOrder.colorName = "ブラウン";
    currentOrder.colorKey = "brown";
  }
}

//////////////////////choose lenses/////////////////////
/////////////////////////////////////////////////////////
const lensesCards = document.querySelectorAll(".lenses-card");

lensesCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    const currentCard = e.currentTarget;
    
    let lensPrice = currentCard.querySelector(".price-in-card").dataset.price;
    currentOrder.lensPrice = lensPrice;
    currentOrder.lensId = currentCard.dataset.lensesId;

    //update lenses price
    document.querySelector(".lenses-price").innerText = formatPrice(lensPrice);

    // update total price
    let totalPrice = calculatePrice(19900, Number(lensPrice));
    updateTotalPrice(totalPrice);

    //update card style (remove,add)
    lensesCards.forEach((c) => {
      c.classList.remove("card-active");
    });
    updateCardStyle(currentCard);

    //update selected lenses text
    const lensesText = currentCard.querySelector("p").innerText;
    updateLensesText(lensesText);
  });
});

//[F]:calculate price
function calculatePrice(basePrice, lensPrice) {
  let totalPrice = basePrice + lensPrice;
  return totalPrice;
}

//[F]: update card style.
function updateCardStyle(card) {
  card.classList.toggle("card-active");
}

//[F]:update total price
function updateTotalPrice(newPrice) {
  let totalPrice = document.querySelector(".total-price");
  totalPrice.innerText = formatPrice(newPrice);
  currentOrder.totalPrice = formatPrice(newPrice);
}

//[F]:update lenses text
function updateLensesText(text) {
  const lensesText = document.querySelector(".selected-lenses-text");
  const popUpLensesText = document.querySelector("#selected-lenses");
  lensesText.innerText = text;
  popUpLensesText.innerText = text;
  currentOrder.lensName = text;
}

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

////////////////////////favorite button/////////////////////
///////////////////////////////////////////////////////////

const favoriteButton = document.querySelector(".favorite-button");
favoriteButton.addEventListener("click", (e) => {
  console.log(e.currentTarget);
  e.currentTarget.classList.toggle("active");
});

////////////////////////purchase button & toast notification/////////////////////
///////////////////////////////////////////////////////////

const purchaseButton = document.querySelector(".purchase-button");
purchaseButton.addEventListener("click", (e) => {
  showToast("カートに追加しました!");
  saveToLocal();
});

//[F]:show toast function
function showToast(message) {
  //创建一个空的 div 标签 (此时它还在内存里，页面上看不见)
  const toastPopUp = document.createElement("div");
  toastPopUp.className = "toast-notification";

  // Inject HTML into `div`
  const htmlContent = `
   <span>${message}</span>
      <div class="icon-close">
        <svg  alt="icon image of closing" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
   `;
  toastPopUp.innerHTML = htmlContent;

  //add this div into html 
  document.body.appendChild(toastPopUp);

  //delete pop-up element after animation.
  toastPopUp.addEventListener("animationend", (e) => {
    toastPopUp.remove();
  });
};


//[F]:save to LocalStorage
function saveToLocal(){
  let cartList = [];
  try {
    const existhingData = localStorage.getItem(CART_KEY);
    cartList = existhingData ? JSON.parse(existhingData) : [];
  } catch (error) {
    console.log(error,"购物车数据损坏，重置为空");
    cartList = []
  }
  cartList.push(currentOrder);
  localStorage.setItem(CART_KEY,JSON.stringify(cartList));
  updateCartNumber(cartList.length);
};

//[F]:update cart number
function updateCartNumber(Number){
  const cartNumber = document.querySelector(".cart-badge");
  cartNumber.innerText = Number;
};