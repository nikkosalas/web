import React, { useState, useEffect } from 'react';
import './dashboard.css';
import './design.css';
import { useLocation } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firebase configuration

const Dashboard = () => {
  const location = useLocation();
  const isDashboardPath = location.pathname === '/dashboard';
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);

  useEffect(() => {
    if (isDashboardPath) {
      const userQuery = query(collection(firestore, 'users'));
      const feedbackQuery = query(collection(firestore, 'feedbacks'));
      const tripQuery = query(collection(firestore, 'trips'));

      const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
        setUserCount(snapshot.docs.length);
      });

      const unsubscribeFeedback = onSnapshot(feedbackQuery, (snapshot) => {
        setFeedbackCount(snapshot.docs.length);
      });

      const unsubscribeTrip = onSnapshot(tripQuery, (snapshot) => {
        setTripCount(snapshot.docs.length);
      });

      return () => {
        unsubscribeUser();
        unsubscribeFeedback();
        unsubscribeTrip();
      };
    }
  }, [isDashboardPath]);

  return (
    <div>
      <nav className='nav'>
        <a href='/dashboard' className='site-title'>
          Admin
        </a>
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

      {isDashboardPath && (
        <div className='stats'>
          <div className='card'>
            <AccountCircleIcon fontSize='large' />
            <h2 className='user'>User</h2>
            <p>{userCount}</p>
          </div>

          <div className='card'>
            <RateReviewIcon fontSize='large' />
            <h2 className='feedback'>Feedback</h2>
            <p>{feedbackCount}</p>
          </div>

          <div className='card'>
            <DirectionsCarFilledIcon fontSize='large' />
            <h2 className='ride'>Trips</h2>
            <p>{tripCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;