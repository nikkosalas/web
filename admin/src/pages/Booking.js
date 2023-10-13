import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

import { database } from '../firebase'; // Import your Firebase configuration

export default function Booking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Function to fetch booking data from the Realtime Database
    const fetchBookingData = () => {
      const database = getDatabase();
      const bookingsRef = ref(database, 'bookings'); // Reference to the 'bookings' node in the Realtime Database

      onValue(bookingsRef, (snapshot) => {
        if (snapshot.exists()) {
          const bookingData = Object.values(snapshot.val());
          setBookings(bookingData);
        }
      });
    };

    // Call the fetchBookingData function to load booking data
    fetchBookingData();
  }, []);

  const deleteBooking = (id) => {
    const database = getDatabase();
    const bookingRef = ref(database, 'bookings/' + id);

    remove(bookingRef)
      .then(() => {
        // The booking is deleted successfully
        // You can also update the local state to remove the deleted booking
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingID !== id));
      })
      .catch((error) => {
        console.error('Error deleting booking:', error);
      });
  };

  return (
    <div>
      <Dashboard />
      <h1>Booking</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>bookingDate</th>
              <th>bookingID</th>
              <th>bookingStatus</th>
              <th>passengerName</th>
              <th>passengerType</th>
              <th>vehicleColor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingID}>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingID}</td>
                <td>{booking.bookingStatus}</td>
                <td>{booking.passengerName}</td>
                <td>{booking.passengerType}</td>
                <td>{booking.vehicleColor}</td>
                <td>
                  <button onClick={() => deleteBooking(booking.bookingID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}