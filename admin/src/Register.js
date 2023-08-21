import React, {useState} from "react";
import MyImage from './pages/logo.png';

export const Register = (props) => {

    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [name,setName] = useState('');
    
    const handleSubmit = (e) =>{
        
        console.log(name);
    }

    return(
        <div className="form-container">
            <div className="box">
            <img className='login-logo' src={MyImage} />
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Fullname</label>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="name" id="name"  placeholder="Full Name" name="name" />
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUser(e.target.value)} type="username" placeholder="Username" id="username" name="username"/>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password"/>
            <button type="Submit">Register</button>
        </form>
        <button className="link-button" onClick={()=> props.onFormSwitch('login')}>Already have an account? Login Here!</button>
       </div>
        </div>
    )
}