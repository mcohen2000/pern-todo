import './App.css';
import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList/ToDoList";

function App() {
  const [lists, setLists] = useState([]);
  function handleNewList() {
    let currentDate = new Date().toJSON();
    console.log(currentDate);
    fetch("http://localhost:9000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        created: currentDate,
      }),
    })
        .then(res => res.json())
        .then(data => setLists((prevState) => [...prevState, data]))
  };
  useEffect(() => {
    fetch("http://localhost:9000/lists", {method: "GET"})
        .then(res => res.json())
        .then(data => setLists(data));
  }, [])
  return (
    <div className="App">
      <h1>ToDo List App</h1>
      <div className="Lists">
        {lists.map((item, index) => (
          <ToDoList key={index} index={index} list={item} lists={lists} setLists={setLists} />
        ))}
        <button
          className="newListButton"
          onClick={() => handleNewList()}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
