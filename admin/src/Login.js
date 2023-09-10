import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 

import MyImage from './pages/logo.png';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');  // Define 'username' state

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  if (loggedIn) {
    window.location.href = '/dashboard';
  }

  return (
    <div className="form-container">
      <div className="box">
        <img className='login-logo' src={MyImage} alt="Logo" />
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            type="text"
            placeholder="Username"
            id="username"
            name="username"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
            id="password"
            name="password"
          />
          <button className="btn-form" type="submit">Login</button>
        </form>
        <button
          className="link-button"
          onClick={() => props.onFormSwitch('register')}
        >
          Don't have an account? Register Here!
        </button>
      </div>
    </div>
  );
};