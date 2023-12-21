import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getDatabase, push, ref, set, onValue  } from "firebase/database";

function App() {
let [inputValue, setInputValue] = useState()
let [todo, setTodo]= useState([])

const db = getDatabase();


let handleChange = (e)=>{
  setInputValue(e.target.value);
}
// wirte operation firebase

let handleClick = ()=>{
  set(push(ref(db, 'todo')), {
    userName: inputValue,
  })
}

// read operation firebase

useEffect(()=>{
  const todoRef = ref(db, 'todo');
  onValue(todoRef, (snapshot) => { 
    let arr = []
    snapshot.forEach((item)=>{
      arr.push(item.val())
      setTodo(arr)
    })
  });
},[])



  return (
    <>
    <div>
      <input onChange={handleChange} type="text"  placeholder='Enter Your Name '/> <button onClick={handleClick}> add</button>
    </div>

    {
      todo.map((item, index)=>(
        <ul key={index}>
        <li >{item.userName}</li>
      </ul>
      ))
    }
      
    </>
  )
}

export default App
