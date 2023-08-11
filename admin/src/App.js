import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from "./Dashboard";
import Feedback from "./pages/Feedback";
import Users from "./pages/Users";
import Driver from "./pages/Driver";
import Rides from "./pages/Rides";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  let component;

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    switch (window.location.pathname) {
      case "/":
        component = <App />;
        break;
      case "/users":
        component = <Users />;
        break;
      case "/feedback":
        component = <Feedback />;
        break;
      case "/driver":
        component = <Driver />;
        break;
      case "/rides":
        component = <Rides />;
        break;
      default:
        component = null; 
        break;
    }
  };

  return (



    <Router>
      <Routes>
        <Route exact path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}/>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/driver" element={<Driver />} />
        <Route exact path="/rides" element={<Rides />} />
        {/* Use the component variable within the Routes element */}
        {component}
      </Routes>
    </Router>
  );
}

export default App;