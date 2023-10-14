import React, { useEffect, useState } from 'react';
import './dashboard.css';
import './design.css';
import { useLocation } from 'react-router-dom';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { getDatabase, ref, onValue } from 'firebase/database';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Dashboard = () => {
  const location = useLocation();
  const isDashboardPath = location.pathname === '/dashboard';
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  // Function to fetch booking count from the Realtime Database
  const fetchBookingCount = () => {
    const database = getDatabase();
    const bookingsRef = ref(database, 'bookings');

    onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setBookingCount(Object.keys(snapshot.val()).length);
      }
    });
  };

  useEffect(() => {
    if (isDashboardPath) {
      const userQuery = query(collection(firestore, 'users'));
      const feedbackQuery = query(collection(firestore, 'feedbacks'));
      const tripQuery = query(collection(firestore, 'trips'));

      const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
        const filteredUsers = snapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.isRegisterComplete === true && !user.isAdmin);
        setUserCount(filteredUsers.length);
      });

      const unsubscribeFeedback = onSnapshot(feedbackQuery, (snapshot) => {
        setFeedbackCount(snapshot.docs.length);
      });

      const unsubscribeTrip = onSnapshot(tripQuery, (snapshot) => {
        setTripCount(snapshot.docs.length);
      });

      fetchBookingCount();

      return () => {
        unsubscribeUser();
        unsubscribeFeedback();
        unsubscribeTrip();
      };
    }
  }, [isDashboardPath]);

  return (
    <div>
        <nav className="nav">
          <a href="/dashboard" className="site-title">
            Admin
          </a>
          <ul>
            <li>
              <a href="/users">
                <AccountCircleIcon fontSize="small" /> Users
              </a>
            </li>
            <li>
              <a href="/feedback">
                <RateReviewIcon fontSize="small" /> Feedback
              </a>
            </li>
            <li>
              <a href="/trip">
                <DirectionsCarFilledIcon fontSize="small" /> Trips
              </a>
            </li>
            <li>
              <a href="/booking">
                <BookmarksIcon fontSize="small" /> Booking
              </a>
            </li>
            <li>
              <a href="/">
                <ExitToAppIcon fontSize="small" /> Logout
              </a>
            </li>
          </ul>
        </nav>

      {isDashboardPath && (
        <div className="stats">
          <div className="card">
            <AccountCircleIcon fontSize="large" />
            <h2 className="user">User</h2>
            <p>{userCount}</p>
          </div>

          <div className="card">
            <RateReviewIcon fontSize="large" />
            <h2 className="feedback">Feedback</h2>
            <p>{feedbackCount}</p>
          </div>

          <div className="card">
            <DirectionsCarFilledIcon fontSize="large" />
            <h2 className="ride">Trips</h2>
            <p>{tripCount}</p>
          </div>

          <div className="card">
            <BookmarksIcon fontSize="large" />
            <h2 className="booking">Booking</h2>
            <p>{bookingCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;