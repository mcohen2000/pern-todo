import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialFormState = {
    firstname: "",
    lastname: "",
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
    fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, options).then((res) => res.json()).then((data) => {
      console.log(data);
      if(data.email){
        console.log("redirect!!");
        navigate("/");
      }
    });
  }
  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
        }}>
        <div>
          <label htmlFor='firstname' className='form-label'>
            First Name:
          </label>
          <input
            type='text'
            className='form-input'
            id='firstname'
            name='firstname'
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor='lastname' className='form-label'>
            Last Name:
          </label>
          <input
            type='text'
            className='form-input'
            id='lastname'
            name='lastname'
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor='email' className='form-label'>
            Email:
          </label>
          <input
            type='text'
            className='form-input'
            id='email'
            name='email'
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-input'
            id='password'
            name='password'
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
