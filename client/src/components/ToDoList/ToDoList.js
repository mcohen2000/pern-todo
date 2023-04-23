import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import { FaTrashAlt } from "react-icons/fa";

export default function ToDoList({ index, list, lists, setLists, todos, setTodos }) {
  const [editing, setEditing] = useState(-1);
  const [listItems, setListItems] = useState([]);
  const [newTask, setNewTask] = useState("");

  const updateLists = (listName, listObj) => {
    // const newLists = [...lists];
    // newLists[index] = { name: listName, tasks: listObj };
    // setLists(newLists);
  };
  const updateText = (id, text) => {
    // const newList = [...list.tasks];
    // newList.forEach((item) => {
    //   if (item.id === id) {
    //     item.text = text;
    //   }
    // });
    // updateLists(list.name, newList);
  };
  const handleComplete = (id) => {
    // const newList = [...list.tasks];
    // newList.forEach((item) => {
    //   if (item.id === id) {
    //     item.completed = !item.completed;
    //   }
    // });
    // updateLists(list.name, newList);
  };

  const handleDelete = (id) => {
    // make a copy of state without deleted item
    // const newList = list.tasks.filter((task) => task.id !== id);
    // updateLists(list.name, newList);
  };
  const submitTask = (task, list) => {
    fetch("http://localhost:9000/todos", {
      method: "POST", 
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task,
        list_id: list
      }),
    })
        .then(res => res.json())
        .then(data => setListItems((prevState) => [...prevState, data]));
  };
  const handleListName = (text) => {
    // updateLists(text, list.tasks);
  };
  // get and filter todos
  useEffect(() => {
    fetch("http://localhost:9000/todos", {method: "GET"})
        .then(res => res.json())
        .then(data => setListItems(data.rows.filter(task => task.list_id === list.list_id)));
  }, [list.list_id])

  return (
    <div className="list-wrapper">
      <h3>
        <input
          className="listName"
          type="text"
          value={list.title}
          onChange={(e) => handleListName(e.target.value)}
        ></input>
        <button
          className="deleteListButton"
          onClick={() => {
            const newLists = [...lists];
            newLists.splice(index, 1);
            setLists(newLists);
          }}
        >
          <FaTrashAlt className="trashIcon" />
        </button>
      </h3>
      <p>{list.list_id}</p>
      <form
        className="addItemForm"
        onSubmit={(e) => {
          e.preventDefault();
          submitTask(newTask, list.list_id);
          e.target.reset();
        }}
      >
        <input
          className="newTaskInput"
          type="text"
          placeholder="Type your task here..."
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button type="submit" className="addItemButton">
          Add Task +
        </button>
      </form>
      <ul className="list">
        {listItems.map((item, index) => (
          <ToDoItem
            task={item}
            key={index}
            index={index}
            handleDelete={handleDelete}
            updateText={updateText}
            handleComplete={handleComplete}
            editing={editing}
            setEditing={setEditing}
          />
        ))}
      </ul>
    </div>
  );
}
