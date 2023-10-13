import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import { firestore } from '../firebase'; // Import your Firebase configuration

export default function Driver() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Function to fetch driver data from Firestore
    const fetchDriverData = async () => {
      try {
        const driverData = [];
        const querySnapshot = await firestore.collection('drivers').get();
        
        querySnapshot.forEach((doc) => {
          driverData.push({ id: doc.id, ...doc.data() });
        });
        
        setDrivers(driverData);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    // Call the fetchDriverData function to load driver data
    fetchDriverData();
  }, []);

  const deleteDriver = async (id) => {
    try {
      await firestore.collection('drivers').doc(id).delete();
      // Remove the deleted driver from the drivers state
      setDrivers((prevDrivers) => prevDrivers.filter((driver) => driver.id !== id));
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div>
      <Dashboard />
      <h1>Booking</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>DriverID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Birthdate</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Password</th>
              <th>ProfilePicture</th>
              <th>DriverRating</th>
              <th>AvailabilityStatus</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.driverID}</td>
                <td>{driver.firstname}</td>
                <td>{driver.lastname}</td>
                <td>{driver.birthdate}</td>
                <td>{driver.phoneNumber}</td>
                <td>{driver.email}</td>
                <td>{driver.password}</td>
                <td>{driver.profilePicture}</td>
                <td>{driver.driverRating}</td>
                <td>{driver.availabilityStatus}</td>
                <td>
                  <button onClick={() => deleteDriver(driver.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}