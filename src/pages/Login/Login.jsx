import React from 'react';
import { useLocation } from 'wouter';
import './login.css';

export default function Login() {
  const [location, navigate] = useLocation();

  function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    navigate("/dashboard");
  }
  
  return (
    <div className='login'>
      <h1>Sign in</h1>

      <form onSubmit={submitForm}>
        <input type="text" name="username" placeholder='Username'/>
        <input type="password" name="password" placeholder='Password'/>

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}
