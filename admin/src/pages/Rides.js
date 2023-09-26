import React, { useState, useEffect } from 'react';
import Dashboard from "../Dashboard";
import { firestore } from '../firebase'; // Import the Firestore instance

export default function Rides() {
  const [rides, setRides] = useState([]); // State to hold ride data

  useEffect(() => {
    // Function to fetch ride data from Firestore
    const fetchRideData = async () => {
      try {
        const rideCollection = firestore.collection('rides');
        const rideSnapshot = await rideCollection.get();
        const rideData = rideSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRides(rideData);
      } catch (error) {
        console.error('Error fetching ride data:', error);
      }
    };

    fetchRideData(); // Call the function when the component mounts
  }, []);

  const deleteRide = async (id) => {
    try {
      await firestore.collection('rides').doc(id).delete();
      // Remove the deleted ride from the state
      setRides((prevRides) => prevRides.filter((ride) => ride.id !== id));
    } catch (error) {
      console.error('Error deleting ride:', error);
    }
  };

  return (
    <div>
      <Dashboard />
      <h1>Rides</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>RideID</th>
              <th>UserID</th>
              <th>DriverID</th>
              <th>PickUpLocation</th>
              <th>DropOffLocation</th>
              <th>RideDate</th>
              <th>RideStatus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.id}</td>
                <td>{ride.UserID}</td>
                <td>{ride.DriverID}</td>
                <td>{ride.PickUpLocation}</td>
                <td>{ride.DropOffLocation}</td>
                <td>{ride.RideDate}</td>
                <td>{ride.RideStatus}</td>
                <td>
                  <button onClick={() => deleteRide(ride.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}






