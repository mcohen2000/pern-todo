import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <div className="navWrapper">
            <nav>
                <h1><Link to={'/'}>PERN TODO</Link></h1>
                <div className="navLinks">


                        {user === null ? <>

                    <div className="userLinks">
                                <Link className="userBtn loginBtn" to={'/login'}>Login</Link>
                            
                                <Link className="userBtn registerBtn" to={'/register'}>Register</Link> 
                            </div>
                        </>:<>
                            <Link className="listsLink" to={'/lists'}>Lists</Link>
                            <div className="userLinks">
                            <p>Welcome back {user.email}!</p> <button className="userBtn logoutBtn" onClick={() => {
                                fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
                                    method: "POST",
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
                        >Logout</button>
                        
                        </div>
                        </>}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
