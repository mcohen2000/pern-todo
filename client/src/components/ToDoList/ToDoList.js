import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import { FaTrashAlt } from "react-icons/fa";

export default function ToDoList({ index, list, lists, setLists, todos, setTodos }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [editing, setEditing] = useState(-1);
  const [listItems, setListItems] = useState([]);
  const [newTask, setNewTask] = useState("");

  const updateTitle = (id, text) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/${id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include", 
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
      }),
    })
  };
  const handleTitle = (text) => {
    setTitle(text);
  };
  const updateText = (id, text) => {
    const updatedTodo = listItems.filter( task => task.todo_id === id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include", 
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        isComplete: updatedTodo[0].iscomplete
      }),
    })
        .then(res => res.json())
        .then(data => setListItems((prevState) => prevState.map(item => {
          if (item.todo_id === data.todo_id){
            return data;
          }
          return item;
        })));
  };
  const handleComplete = (id) => {
    const updatedTodo = listItems.filter( task => task.todo_id === id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
      method: "PATCH",
      mode: "cors",
      credentials: "include", 
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: updatedTodo[0].text,
        isComplete: !updatedTodo[0].iscomplete
      }),
    })
        .then(res => res.json())
        .then(data => setListItems((prevState) => prevState.map(item => {
          if (item.todo_id === data.todo_id){
            return data;
          }
          return item;
        })));
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/${id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    })
      .then(setListItems((prevState) => (prevState.filter(task => task.todo_id !== id))));
    
  };
  const deleteList = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/${id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    })
      .then(setLists((prevState) => (prevState.filter(list => list.list_id !== id))));
    
  };
  const submitTask = (task, list) => {
    let currentDate = new Date().toJSON();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
      method: "POST",
      mode: "cors",
      credentials: "include", 
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task,
        list_id: list,
        created: currentDate
      }),
    })
        .then(res => res.json())
        .then(data => setListItems((prevState) => [...prevState, data]));
  };
  
  // get and filter todos
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/todos/all`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
        .then(res => res.json())
        .then(data => setListItems(data.rows.filter(task => task.list_id === list.list_id)));
  }, [list.list_id])

  return (
    <div className="list-wrapper">
      <h3>
        {editingTitle ? <input
          className="listNameInput"
          type="text"
          value={title}
          onKeyUp={(e) => {
            if (e.key === 'Enter'){
              updateTitle(list.list_id, title);
              setEditingTitle(false);
            }
          }}
          onBlur={() => {
            updateTitle(list.list_id, title);
            setEditingTitle(false)}
          }
          onChange={(e) => handleTitle(e.target.value)}
        ></input> : <p className="listName" onClick={() => setEditingTitle(true)}>{title}</p>}
        <button
          className="deleteListButton"
          onClick={() => deleteList(list.list_id)}
        >
          <FaTrashAlt className="trashIcon" />
        </button>
      </h3>
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
            key={item.todo_id}
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
