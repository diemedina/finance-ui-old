import React from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import './login.scss';

export default function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [location, navigate] = useLocation();

  function submitForm(data) {
    console.log(data);
    navigate("/dashboard");
  }
  
  return (
    <div className='login'>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit(submitForm)}>
        <input {...register('username', {required: true})} type="text" placeholder='Username'/>
        {errors.username && <small>* Username required</small>}
  
        <input {...register('password', {required: true})} type="password" placeholder='Password'/>
        {errors.password && <small>* Password required</small>}

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}
