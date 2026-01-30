
////////////////////////choose frame////////////////////
/////////////////////////////////////////////////////////
const glassesImages = {
  "black": "./assets/jins-glasses-black.webp",
  "brown": "./assets/jins-glasses-brown.webp",
  "tortoise": "./assets/jins-glasses-tortoise.webp" // 以后加颜色只需要改这里
};

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



//update image and text
function updateColor(color) {
  const glassesImg = document.querySelector(".glasses-image"); 
  const colorText = document.querySelector(".selected-color-text");
  const popUpFrameText = document.querySelector("#selected-frame");
  
  glassesImg.src = glassesImages[color];
  
  if (color == "black") {
    colorText.innerText = "ブラック";
    popUpFrameText.innerText = "ブラック";
  } else if (color == "brown") {
    colorText.innerText = "ブラウン";
    popUpFrameText.innerText = "ブラウン";
  }
}



//////////////////////choose lenses/////////////////////
/////////////////////////////////////////////////////////
const lensesCards = document.querySelectorAll(".lenses-card");

lensesCards.forEach((card) => {
  card.addEventListener("click", (e) => {

    const currentCard = e.currentTarget;

    let lensPrice = currentCard.querySelector(".price-in-card").dataset.price;

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

//calculate price
function calculatePrice(basePrice, lensPrice) {
  let totalPrice = basePrice + lensPrice;
  return totalPrice;
}

// update card style.
function updateCardStyle(card) {
  card.classList.toggle("card-active");
}

//update total price
function updateTotalPrice(newPrice) {
  let totalPrice = document.querySelector(".total-price");
  totalPrice.innerText = formatPrice(newPrice);
}

//update lenses text
function updateLensesText(text){
    const lensesText = document.querySelector(".selected-lenses-text");
    const popUpLensesText = document.querySelector("#selected-lenses");
    lensesText.innerText = text;
    popUpLensesText.innerText = text;
}

//currency price formatting tool
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
favoriteButton.addEventListener("click",(e)=>{
    console.log(e.currentTarget);
    e.currentTarget.classList.toggle("active");
});