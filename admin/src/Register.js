import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";

import MyImage from './pages/logo.png';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // Define 'username' state

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      // Create a reference to the user's data in the Realtime Database
      const db = database();
      const userRef = db.ref('users/' + auth.currentUser.uid);
      
      // Define the user data to be stored
      const userData = {
        name: name,
        username: username,
        email: email,
        // Add other user data here as needed
      };
      
      // Store the user data in the Realtime Database
      await userRef.set(userData);

      alert('Account created successfully.');
      // Redirect to the login page or any other desired location
      props.onFormSwitch('login');
    } catch (error) {
      console.error('Registration error:', error.message);
      alert('Registration failed. ' + error.message); // Display Firebase error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="form-container">
      <div className="box">
        <img className='login-logo' src={MyImage} alt="Logo" />
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Fullname</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            id="name"
            placeholder="Full Name"
            name="name"
          />
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update 'username' state
            type="text" // Use 'text' type for username
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
          <button className="btn-form" type="Submit">Register</button>
        </form>
        <button
          className="link-button"
          onClick={() => props.onFormSwitch('login')}
        >
          Already have an account? Login Here!
        </button>
      </div>
    </div>
  );
};