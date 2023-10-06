import React, { useState, useEffect } from 'react';
import Dashboard from "../Dashboard";
import { firestore } from '../firebase'; // Import the Firestore instance
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

export default function Trips() {
  const [trips, setTrips] = useState([]); // State to hold trip data

  useEffect(() => {
    // Function to fetch trip data from Firestore
    const fetchTripData = async () => {
      try {
        const tripCollection = collection(firestore, 'trips');
        const tripSnapshot = await getDocs(tripCollection);
        const tripData = tripSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripData);
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData(); // Call the function when the component mounts
  }, []);

  const deleteTrip = async (id) => {
    try {
      const tripDoc = doc(firestore, 'trips', id); // Reference to the document
      await deleteDoc(tripDoc); // Delete the document
      // Remove the deleted trip from the state
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div>
      <Dashboard />
      <h1>Trips</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>BookingID</th>
              <th>Complete</th>
              <th>DestinationLatitude</th>
              <th>DestinationLongitude</th>
              <th>DriverUserID</th>
              <th>PassengerUserID</th>
              <th>PickupLatitude</th>
              <th>PickupLongitude</th>
              <th>TripDate</th>
              <th>TripID</th>
              <th>TripStatus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.bookingID}</td>
                <td>{trip.complete}</td>
                <td>{trip.destinationLatitude}</td>
                <td>{trip.destinationLongitude}</td>
                <td>{trip.driverUserID}</td>
                <td>{trip.passengerUserID}</td>
                <td>{trip.pickupLatitude}</td>
                <td>{trip.pickupLongitude}</td>
                <td>{trip.tripDate}</td>
                <td>{trip.tripID}</td>
                <td>{trip.tripStatus}</td>
                <td>
                  <button onClick={() => deleteTrip(trip.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}