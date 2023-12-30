import { useEffect, useState } from 'react'
import './App.css'
import { getDatabase, set , ref, push, onValue, remove, update } from "firebase/database";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  let db = getDatabase();
  let [text, setText] = useState("");
  let [error, setError] = useState("");
  let [dataArray, setDataArray] = useState([])
  let [toggleBtn, setToggleBtn] = useState(false)
  let [todoId, setTodoId] = useState()


  // write data

  let handelChange = (e) =>{
    setError("")
    setText(e.target.value);
  }

  let handelAdd = () =>{
    if(!text){
      setError("please some write")
    }else{
      set(push(ref(db, 'mydata')),{
        name: text,
      })
    }
    setText("")
  }


// read data 
  useEffect(()=>{
    const starCountRef = ref(db, 'mydata');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(), id:item.key});
        setDataArray(arr)
      })
    });
  },[])

  // delete operation
  let handelDelete = (id) =>{
    remove(ref(db, 'mydata/'+ id)).then(()=>{
      toast("Delete Done");
    })
  }
  
  // edit operation
  let handeleteEdit = (item) =>{
    setTodoId(item.id)
    console.log(item);
    setText(item.name)
    setToggleBtn(true)
  }
  // update operation
  let handelUpdate =()=>{
    update(ref(db, 'mydata/' + todoId),{
      name: text,
    }).then(()=>{
      setToggleBtn(false)
      setText("")
      toast("Update Done")
  })
}

// all delete operation
let handelClear =()=>{
  remove(ref(db, 'mydata')).then(()=>{
    toast('🦄 All Delete Done!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })
}


  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <ToastContainer />

    <div>
    <input onChange={handelChange} type="text" placeholder='Enter Your Text' value={text}/> 
    
    {
      toggleBtn
      ?
      <button onClick={handelUpdate} className='addBtn'>Update  </button>
      :
      <button onClick={handelAdd} className='addBtn'>Add  </button>
    }
    <button onClick={handelClear} className='addBtn'>Clear</button>
     <h1 className='error'>{error}</h1>
    </div>
    <ul>
      {
        dataArray.map((item, index)=>{
          return(
            <li key={index}>{item.name}
            <button onClick={()=>handelDelete(item.id)}>Delete</button>
            <button onClick={()=>handeleteEdit(item)}>Edit</button>
            </li>
          )
        })
      }
    </ul>
    </>
  )
}

export default App

