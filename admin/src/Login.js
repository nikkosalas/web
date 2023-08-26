import React, { useState } from "react";
import MyImage from './pages/logo.png';
export const Login = (props) => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
    
      setLoggedIn(true);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin(); // Call the handleLogin function to check credentials
  };

  
  if (loggedIn) {
    window.location.href = '/dashboard';
  }

  return (
    <div className="form-container">
      <div className="box">
      <img className='login-logo' src={MyImage} />
        <form className="login-form" onSubmit={handleSubmit}>

          <label htmlFor="username">Username</label>
          <input value={username} onChange={(e) => setUser(e.target.value)} type="text" placeholder="Username" id="username" name="username" />
        
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
        
          <button type="submit">Login</button>
        </form>

        <button
          className="link-button"onClick={() => props.onFormSwitch('register')}> Don't have an account? Register Here!
        </button>
      </div>
    </div>
  );
};