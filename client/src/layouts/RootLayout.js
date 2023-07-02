import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../UserContext";
import "./RootLayouts.scss";
import Loading from "../components/Loading/Loading";

const RootLayout = () => {
  let location = useLocation();
  const [user, setUser] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  useEffect(() => {
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    };
    // fetch(`/api/auth`, options)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, options)
      .then((res) => {
        if(res.status === 200 || res.status === 401){
          setApiConnected(true);
        };
        return res.json();
      })
      .then((data) => {
        console.log("user data from auth", data);
        if (data.email){
          setUser(data);
        }
      })
  }, [location, apiConnected]);
  
  return (
    <div className='root-layout'>
      <UserContext.Provider value={{ user, setUser }}>
        {apiConnected ? <>  
          <Navbar/>

          <Outlet />
        </>:<Loading/>}
      </UserContext.Provider>
    </div>
  );
};

export default RootLayout;
