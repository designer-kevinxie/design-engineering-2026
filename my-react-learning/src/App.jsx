// Week 01
// Week 01
// Week 01

// function ProfileCard({name,role,photo,skills}){
//     return(
//         <>
//         <h2>{name}</h2>
//         <p>{role}</p>
//         <img src={photo} alt={name} />
//         <div>
//             {skills.map((skill)=>(
//                 <span key={skill}>{skill}</span>
//             ))}
//         </div>
//         </>

//     )
// }

// function App(){
//     return(
//         <div>
//             <h1>React week 01</h1>
//             <ProfileCard
//                 name="Yuki"
//                 role="UI Designer"
//                 photo="https://i.pravatar.cc/150?img=5"
//                 skills={["Figma", "Tailwind", "Design Systems"]}
//             />
//               <ProfileCard
//                 name="Sara"
//                 role="Product Manager"
//                 photo="https://i.pravatar.cc/150?img=20"
//                 skills={["Strategy", "Roadmapping", "User Research"]}
//             />
//               <ProfileCard
//                 name="Hiro"
//                 role="Frontend Developer"
//                 photo="https://i.pravatar.cc/150?img=12"
//                 skills={["React", "TypeScript", "Accessibility"]}

//             />
//         </div>
//     )
// }

// Week 02 State & Events
// Week 02 State & Events
// Week 02 State & Events

// import { useState } from "react"
// import './App.css'

// function App(){
//     const [count,setCount] = useState(0)
//     const [isDark,setDark] = useState(false)

//     function handleClickcount(){
//         setCount(count +1)
//     }
//     function handleClickDark(){
//         setDark(!isDark)
//     }

//     return(
//         <div className={isDark ? "dark" : "light"} >
//             <button onClick={handleClickcount}>You clicked {count}</button>

//             <button onClick={handleClickDark}>{isDark ? "Light mode" : "Dark mode"}</button>
//         </div>
//     )
// }
// export default App

// week 03列表渲染 + 表单。
// week 03列表渲染 + 表单。
// week 03列表渲染 + 表单。
// week 03列表渲染 + 表单。

// import { useState } from "react";

// function App(){

// //useState
//     const [todo, setTodo] = useState("");
//     const [list, setList] = useState([]);

//  // event handle functions
// function handleChange(e){
//     setTodo(e.target.value)
// }

// function handleAdd(){
//     const newItem = {id: Date.now(), name: todo, finish: false}
//     setList([...list,newItem])
//     setTodo("")
// }

// function handleDelete(id){
//     const newList = list.filter((item)=> item.id !==id)
//     setList(newList)
// }

// function handleToggle(id){
//     const newList = list.map((item)=>(item.id ===id ? {...item,finish:!item.finish} : item)
//     )
//     setList(newList)

// }

// ///////UI
// ///////UI
// ///////UI

//     return(
//         <>
//         <input type="text" onChange={handleChange} value={todo} />
//         <button onClick={handleAdd}>Add</button>
//         <ul>
//         {list.map((item)=>( //小括号的作用是"让多行 JSX 自动被 return"

//             <li key={item.id} onClick={()=> handleToggle(item.id)} >

//                 {/* textDecoration 是 CSS 属性的 JSX 写法 */}
//                 <p style={{textDecoration : item.finish ? "line-through" : "none"}}>{item.name}</p>

//                 {/* 传了参数的话会立即执行，所以这边需要一个新的函数包裹带参函数，等待点击执行。 */}
//                 <button onClick={(e) => {
//                     e.stopPropagation()//不让它冒泡到 li
//                     handleDelete(item.id)
//                 }}>删除</button>
//             </li>

//         ))}

//         </ul>
//         </>
//     )
// }

// export default App

// week 04 useEffect + API
// week 04 useEffect + API
// week 04 useEffect + API
// week 04 useEffect + API

// import { useState } from "react";
// import { useEffect } from "react";

// function Gallery() {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // 但 async 函数整体，作为一个函数，调用它时还会再返回一个 Promise——这个是 async 语法自动加的
//     // 包裹一个普通箭头函数,{代码块}返回 undefined,不返回 Promise ✅
//     async function loadPhotos() {
//       try {
//         const res = await fetch(
//           "https://picsum.photos/v2/list?page=1&limit=30",
//         );
//         const data = await res.json();
//         setPhotos(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message); //catch 拿到的 error 是一个 Error 对象，不是字符串。
//       }
//     }
//     loadPhotos(); // 定义完立刻调用
//   }, []);

//   if (loading) return <p>加载中...</p>;
//   if (error) return <p>出错了：{error}</p>;
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(3, 1fr)", // 3 列等宽
//         gap: "12px", // 图片间距
//       }}
//     >
//       {photos.map((photo) => (
//         <div key={photo.id}>
//           <img
//             src={`https://picsum.photos/id/${photo.id}/300/200`}
//             alt={photo.author}
//             style={{ width: "100%", display: "block", borderRadius: "8px" }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// function App() {
//   return <Gallery />;
// }

// export default App;

//week 5 拆分组件、状态提升（lifting state up）、children prop。
//week 5 拆分组件、状态提升（lifting state up）、children prop。
//week 5 拆分组件、状态提升（lifting state up）、children prop。

// import { useState } from "react";
// import { useEffect } from "react";

// function Gallery() {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     // 但 async 函数整体，作为一个函数，调用它时还会再返回一个 Promise——这个是 async 语法自动加的
//     // 包裹一个普通箭头函数,{代码块}只返回undefined,不返回 Promise ✅
//     async function loadPhotos() {
//       try {
//         const res = await fetch(
//           "https://picsum.photos/v2/list?page=1&limit=30",
//         );
//         const data = await res.json();
//         setPhotos(data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message); //catch 拿到的 error 是一个 Error 对象，不是字符串。
//       }
//     }
//     loadPhotos(); // 定义完立刻调用
//   }, []);

//   if (loading) return <p>加载中...</p>;
//   if (error) return <p>出错了：{error}</p>;
//   //通过query 筛选所搜结果，includes是关键
//   const filteredPhotos = photos.filter((photo) => photo.author.includes(query));

//   return (
//     <>
//       <SearchBar query={query} onQueryChange={setQuery} />

//       {filteredPhotos.length === 0 ? (
//         <p>没有找到匹配的照片</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)", // 3 列等宽
//             gap: "12px", // 图片间距
//           }}
//         >
//           {filteredPhotos.map((photo) => (
//             <div key={photo.id}>
//               <img
//                 src={`https://picsum.photos/id/${photo.id}/300/200`}
//                 alt={photo.author}
//                 style={{ width: "100%", display: "block", borderRadius: "8px" }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// function SearchBar({ query, onQueryChange }) {
//   return (
//     <input
//       type="text"
//       placeholder="搜索..."
//       value={query}
//       onChange={(e) => onQueryChange(e.target.value)}
//     />
//   );
// }

// function App() {
//   return <Gallery />;
// }

// export default App;

//week 6
//week 6
//week 6

import { useState } from "react";

function hexToRgb(hex) {
  hex = hex.replace("#", ""); // remove the "#"
  const r = parseInt(hex.substring(0, 2), 16); // "C1" → 193, base 16
  const g = parseInt(hex.substring(2, 4), 16); // "69" → 105
  const b = parseInt(hex.substring(4, 6), 16); // "52" → 82
  return { r, g, b };
}

function rgbToHsl({ r, g, b }) {
  // normalize to 0–1
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min; // the spread between brightest & darkest

  // --- Lightness ---
  let l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    // delta 0 means gray, keep h=0 s=0
    // --- Saturation ---
    s = delta / (1 - Math.abs(2 * l - 1));

    // --- Hue: which channel is the max decides the base angle ---
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60); // convert to degrees
    if (h < 0) h += 360; // keep it positive
  }

  // round to clean numbers
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

function hexToHsl(hex) {
  return rgbToHsl(hexToRgb(hex));
}

function wrapHue(h) {
  return ((h % 360) + 360) % 360;
}

function generatePalette({ h, s, l }) {
  const background = { h: wrapHue(h), s: 20, l: 95 };
  const foreground = { h: wrapHue(h), s: 25, l: 15 };
  const primary = { h: wrapHue(h), s, l };
  const secondary = { h: wrapHue(h + 30), s: s - 2, l: l + 1 };
  const accent = { h: wrapHue(h - 150), s: s + 3, l: l - 4 };

  return { background, foreground, primary, secondary, accent };
}

function hslToCss({ h, s, l }) {
  return `hsl(${h}, ${s}%, ${l}%)`; // template literal, 拼成 CSS 字符串
}

function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
  // ^#        starts with #
  // [0-9A-Fa-f]  a hex digit (0-9, a-f, A-F)
  // {6}       exactly 6 of them
  // $         then end
}

function ColorPalette() {
  const [primaryHex, setPrimaryHex] = useState("#C16952");
  const [hexInput, setHexInput] = useState("#C16952");
  const palette = generatePalette(hexToHsl(primaryHex));
  const colorsArray = Object.entries(palette);
  console.log(colorsArray);

  function handleHexInput(e) {
    const value = e.target.value;
    setHexInput(value);
    if (isValidHex(value)) {
      setPrimaryHex(value);
    }
  }

  function handlePickerChange(e) {
    const value = e.target.value;
    setPrimaryHex(value); // 取色器吐出的一定合法,直接提交
    setHexInput(value); // 同时同步文字框,保持一致
  }

  return (
    <>
      <ColorPicker value={primaryHex} onChange={handlePickerChange} />
      <ColorInput value={hexInput} onChange={handleHexInput} />
      <div
        style={{
          display: "flex",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        {colorsArray.map(([role, color]) => (
          <div
            key={role}
            style={{
              backgroundColor: hslToCss(color),
              width: "200px",
              height: "200px",
            }}
          >
            {role}
          </div>
        ))}
      </div>
    </>
  );
}

function ColorPicker({ value, onChange }) {
  return <input type="color" value={value} onChange={onChange} />;
}

function ColorInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

function App() {
  return <ColorPalette />;
}

export default App;
