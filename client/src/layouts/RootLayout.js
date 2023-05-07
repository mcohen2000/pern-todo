import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../UserContext";
import "./RootLayouts.scss";

const RootLayout = () => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const options = {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    };
    // fetch(`/api/auth`, options)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("user data from auth", data);
        if (data.email){
          setUser(data);
        }
      })
  }, [location]);
  
  return (
    <div className='root-layout'>
      <UserContext.Provider value={{ user, setUser }}>
      <Navbar/>

      <Outlet />
      </UserContext.Provider>
    </div>
  );
};

export default RootLayout;
