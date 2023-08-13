import { useState, useEffect } from "react";
import ToDoList from "../ToDoList/ToDoList";
import "./UserLists.scss";

const UserLists = () => {
  const [activeList, setActiveList] = useState(-1);
  const [lists, setLists] = useState([]);
  function handleNewList() {
    let currentDate = new Date().toJSON();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Accept": "application/json",
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/lists/all`, { 
      method: "POST", 
      mode: "cors",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
     })
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);
  return (
    <div className='Lists'>
      
      <ul className="listsPicker">
        <h3 className="listsPickerHeader">Your Lists <button className='newListButton' onClick={() => handleNewList()}>
        +
      </button></h3>
      <div className="listButtons">
        {lists.map((item, index) => {
          // console.log(item);
          return(
            <div key={item.list_id} className="listButtonWrapper" onClick={() => setActiveList(index)}>
                <p>{item.title}</p>
              </div>
        )
      })}
      </div>
    </ul>
    <div className={`currentList${activeList === -1 ? ' inactive': ' active'}`}>
      <button className='backButton' onClick={() => setActiveList(-1)}>Back</button>

    {
      activeList === -1 ? <></> :
      <ToDoList
      key={lists[activeList].list_id}
      list={lists[activeList]}
      lists={lists}
      setLists={setLists}
      setActiveList={setActiveList}
      />
    }
    </div>
      {/* {lists.map((item, index) => (
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
      </button> */}
    </div>
  );
};

export default UserLists;
