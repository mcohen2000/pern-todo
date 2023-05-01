import { useState, useEffect } from "react";
import ToDoList from "../ToDoList/ToDoList";

const UserLists = () => {
  const [lists, setLists] = useState([]);
  function handleNewList() {
    let currentDate = new Date().toJSON();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        created: currentDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => setLists((prevState) => [...prevState, data]));
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists`, { method: "GET", mode: "cors",
    credentials: "include", })
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);
  return (
    <div className='Lists'>
      {lists.map((item, index) => (
        <ToDoList
          key={index}
          index={index}
          list={item}
          lists={lists}
          setLists={setLists}
        />
      ))}
      <button className='newListButton' onClick={() => handleNewList()}>
        +
      </button>
    </div>
  );
};

export default UserLists;
