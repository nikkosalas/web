import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from "./Dashboard";
import Feedback from "./pages/Feedback";
import Users from "./pages/Users";
import Driver from "./pages/Driver";
import Rides from "./pages/Rides";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [key, setKey] = useState(""); // Key for CSSTransition

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    setKey(new Date().getTime()); // Change the key for CSSTransition
  };

  return (
    <Router>
      <TransitionGroup>
        <CSSTransition key={key} classNames="fade" timeout={300}>
          <Routes>
            <Route
              exact path="/" element={ currentForm === "login" ? ( <Login onFormSwitch={toggleForm} /> ) : (<Register onFormSwitch={toggleForm} /> ) }
            />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/feedback" element={<Feedback />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/driver" element={<Driver />} />
            <Route exact path="/rides" element={<Rides />} />
            {/* Other routes */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  );
}

export default App;