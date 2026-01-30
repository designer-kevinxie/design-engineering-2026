# Week 03-04: JINS Product Detail Page (Interactive) 交互式详情页

> **Focus:** JavaScript DOM Manipulation, Event Logic, and State Management.

## 🚀 Features Implemented
* **Dynamic Image Switcher:** changing frame colors updates the product image instantly.
* **Real-time Price Calculator:** logic handles base price + lens upgrades (¥0, ¥5,500, ¥11,000).
* **Sticky Footer (Mobile):** implemented a "Price Pop-up" that stays fixed at the bottom on mobile devices.
* **Exclusive Selection Logic:** custom functionality to ensure only one lens/color is active at a time.
* **Currency Formatting:** utilized `Intl.NumberFormat` for professional Japanese Yen display.

## 💻 Technical Highlights
### 1. Data-Driven DOM
Instead of hardcoding values in JS, I used HTML `data-` attributes to store product information, making the JS logic cleaner and reusable.

```javascript
// Example: Storing price in HTML
<div class="lenses-card" data-price="5500">...</div>

// Example: Retrieving it in JS
let lensPrice = currentCard.querySelector(".price-in-card").dataset.price;
```
### 2. State Management Strategy
Used a "Remove All -> Add One" strategy for handling exclusive selection states (Radio Logic).

**📸 Preview:**
W03-04
> ![JINS Card Preview](./assets/w3-w4-preview-sm.jpg)
W02
> ![JINS Cards Preview](./assets/w3-w4-preview-md.jpg)
> ![JINS Cards Preview](./assets/w3-w4-preview-lg.jpg)



### 3.Code Notes:
- `append` vs `appendChild`(elements only)
- `document.createElement("div")`
- `innerText`(visible on the screen) vs `textContent`（html itself）
- `getAttribute`,  `setAttribute`,`removeAttribute`  
- using const.attribute directtly `div.id`,`div.class`,`div.classList.add()`,`div.classList.remove()`,`classList.toggle("class",true)`
- `div.dataset.newTest`(`<div data-new-test = "this is a new test"></div>`)
- `forEach` function
- `e.currentTarget`
- currency price formatting tool
  
