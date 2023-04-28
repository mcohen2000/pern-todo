import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initialFormState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  function handleChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [`${e.target.id}`]: e.target.value,
    }));
  }
  function handleSubmit(data){
    console.log("data", data);
    const options = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:9000/login`, options).then((res) => res.json()).then((data) => {
      console.log(data);
    if(data.email){
      console.log("redirect!!");
      navigate("/");
    }
    });;
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
        }}>
        <div>
          <label htmlFor='email' className='form-label'>
            Email:
          </label>
          <input type='text' className='form-control' id='email' name='email' onChange={(e) => handleChange(e)} required />
        </div>
        <div>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-input' id='password' name='password' onChange={(e) => handleChange(e)} required />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
