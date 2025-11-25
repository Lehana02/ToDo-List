import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const handleEdit = (e, id) => {
    let editTodo = todos.filter((item) => item.id === id);
    setTodo(editTodo[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  };
  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS()
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };
  const toggleFinished=()=>{
    setShowFinished(!showFinished)
  }
  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto rounded-xl my-5 p-5 bg-violet-100 md:w-1/2 min-h-[80vh]">
      <h1 className="text-center font-bold text-2xl">TaskManager - Manage you todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input type="text" onChange={handleChange} onKeyDown={(e) => {if(e.key === "Enter" && todo.length>3) handleAdd()}} value={todo} className="w-full rounded-md px-3 py-1" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 disabled:bg-violet-500 hover:bg-violet-950 p-2 py-1 font-bold text-sm rounded-md text-white">
            Save
          </button>
        </div>
          <input className="my-4" type="checkbox" checked={showFinished} onChange={toggleFinished}/>Show Finished
          <div className="h-[1px] bg-black opacity-25 my-2"></div>
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos.map((item, key) => {
            return ((showFinished || !item.isCompleted) &&
              <div key={key} className="todo my-3 justify-between flex">
                <div className="flex gap-5">
                  <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckbox} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm rounded-md mx-1 text-white">
                    <FaEdit/>
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 font-bold text-sm rounded-md mx-1 text-white" >
                    <AiFillDelete/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
