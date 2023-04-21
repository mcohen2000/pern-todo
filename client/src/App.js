import './App.css';
import { useState } from "react";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
  const [lists, setLists] = useState([{name:"List Name", tasks:[]}]);
  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <div className="Lists">
        {lists.map((item, index) => (
          <ToDoList key={index} index={index} list={item} lists={lists} setLists={setLists}/>
        ))}
        <button
          className="newListButton"
          onClick={() => setLists((prevState) => [...prevState, {name:"List Name", tasks:[]}])}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
