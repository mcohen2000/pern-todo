import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.css";
import { FaTrashAlt } from "react-icons/fa";

export default function ToDoList({ index, list, lists, setLists }) {
  const [editing, setEditing] = useState(-1);
  const newTask = {
    text: "",
    id: uuidv4(),
    completed: false,
  };
  const updateLists = (listName, listObj) => {
    const newLists = [...lists];
    newLists[index] = { name: listName, tasks: listObj };
    setLists(newLists);
  };
  const updateText = (id, text) => {
    const newList = [...list.tasks];
    newList.forEach((item) => {
      if (item.id === id) {
        item.text = text;
      }
    });
    updateLists(list.name, newList);
  };
  const handleComplete = (id) => {
    const newList = [...list.tasks];
    newList.forEach((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    updateLists(list.name, newList);
  };
  const handleTask = (str) => {
    newTask.text = str;
  };

  const handleDelete = (id) => {
    // make a copy of state without deleted item
    const newList = list.tasks.filter((task) => task.id !== id);
    updateLists(list.name, newList);
  };
  const submitTask = (task) => {
    const newList = [...list.tasks, task];
    updateLists(list.name, newList);
  };
  const handleListName = (text) => {
    updateLists(text, list.tasks);
  };

  return (
    <div className="list-wrapper">
      <h3>
        <input
          className="listName"
          type="text"
          value={list.name}
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

      <form
        className="addItemForm"
        onSubmit={(e) => {
          e.preventDefault();
          submitTask(newTask);
          e.target.reset();
        }}
      >
        <input
          className="newTaskInput"
          type="text"
          placeholder="Type your task here..."
          onChange={(e) => handleTask(e.target.value)}
        ></input>
        <button type="submit" className="addItemButton">
          Add Task +
        </button>
      </form>
      <ul className="list">
        {list.tasks.map((item, index) => (
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
