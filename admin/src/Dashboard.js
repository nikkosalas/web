import React from 'react';
import './dashboard.css';
import './design.css';
import { useLocation } from 'react-router-dom';
const Dashboard = () => {
  const location = useLocation();

  
  const isDashboardPath = location.pathname === '/dashboard';
  
  return (
    <div>
    <nav className='nav'>
      <a href ='/dashboard' className='site-title'>Admin</a>
      <ul>
        <li>
          <a href='/feedback'>Feedback</a>
          </li>
          <li>
          <a href='/users'>Users</a>
          </li>
          <li>
          <a href='/rides'>Rides</a>
          </li>
          <li>
          <a href='/driver'>Driver</a>
        </li>
        <li>
          <a href='/'>Logout</a>
        </li>
      </ul>


    </nav>

    {isDashboardPath && 
    
    
    <h2 className='dash'>Content...</h2>
    
    
    
    
    
    
    
    
    } 
  
    </div>
  );
};

export default Dashboard;