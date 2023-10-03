import React from 'react';
import './dashboard.css';
import './design.css';
import { useLocation } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PersonIcon from '@mui/icons-material/Person';


const Dashboard = ({ userCount }) => { // Receive userCount as a prop
  const location = useLocation();
  const isDashboardPath = location.pathname === '/dashboard';
  
  console.log('userCount in Dashboard:', userCount);
 
  return (
    <div>
      <nav className='nav'>
        <a href ='/dashboard' className='site-title'>Admin</a>
        <ul>
          <li>
            <a href='/users'>Users</a>
          </li>
          <li>
            <a href='/feedback'>Feedback</a>
          </li>
          <li>
            <a href='/rides'>Rides</a>
          </li>
          <li>
            <a href='/'>Logout</a>
          </li>
        </ul>
      </nav>

      {isDashboardPath && 
        <div className='stats'>
          <div className='card'>
            <AccountCircleIcon fontSize="large" />
            <h2 className='user'>User</h2>
            <p>{userCount}</p> {/* Display the userCount */}
          </div>


      <div className='card'>
      <RateReviewIcon fontSize="large" />
        <h2 className='feedback'>Feedback</h2>
        <p>00</p>
      </div>

      <div className='card'>
      <DirectionsCarFilledIcon fontSize="large" />
        <h2 className='ride'>Ride</h2>
        <p>00</p>
      </div>

      <div className='card'>
      <PersonIcon fontSize="large" />
        <h2 className='driver'>Driver</h2>
        <p>00</p>
      </div>
     
    </div>
    
    } 
  
    </div>
  );
};
export default Dashboard;