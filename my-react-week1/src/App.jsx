




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



