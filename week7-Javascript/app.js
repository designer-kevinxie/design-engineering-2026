// const cart = [
//   { name: "键盘", price: 300 },
//   { name: "鼠标", price: 150 },
//   { name: "显示器", price: 1200 },
// ];

// // 用 reduce 算 total,应该得到 1650
// const total = cart.reduce((acc, item) => {
//   return acc + item.price;
// }, 0);

// console.log(total);

// const photos = [
//   { author: "Kevin" },
//   { author: "Aki" },
//   { author: "Kevin" },
//   { author: "Kevin" },
//   { author: "Aki" },
// ];

// // 目标:用 reduce 算出 { Kevin: 3, Aki: 2 }

// const authorCounts = photos.reduce((acc, item) => {
//   acc[item.author] = (acc[item.author] || 0) + 1
//   // 2. 别忘了把 acc 返回出去(下一轮还要用它!)
//   return acc;
// }, {});

// const users = [
//   { name: "Kevin", age: 31, active: true },
//   { name: "Aki", age: 28, active: false },
//   { name: "Yuki", age: 35, active: true },
// ];
// // 拿到年龄大于 30 的第一个用户对象
// const user = users.find(item.age>30);
// const user = users.find((item)=>(item.age>30));

const photo = { id: 5, author: "Kevin", url: "..." };
const colors = ["#FF0000", "#00FF00", "#0000FF"];

const { author } = photo;
const [, , blue] = colors;

const palette = { primary: "#C16952", accent: "#3D7A8A" };

const newPalette = { ...palette, background: "#FCF3E3" };
const newPalette = { ...palette, primary: "#FF0000" };
