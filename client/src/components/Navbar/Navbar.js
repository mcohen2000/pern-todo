import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div>
            <h1><Link to={'/'}>PERN TODO</Link></h1>
            <Link to={'/lists'}>Lists</Link>
            
            {user === null ? <>
                <button>
                    <Link to={'/login'}>Login</Link>
                </button>
                <button>
                    <Link to={'/register'}>Register</Link> 
                </button>
            </>:<p>Welcome back {user.email}! <button onClick={() => {
                fetch(`http://localhost:9000/logout`, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    setUser(null); 
                    navigate("/");
                }
                )
            }}
                >Logout</button></p>}
        </div>
    );
}

export default Navbar;
