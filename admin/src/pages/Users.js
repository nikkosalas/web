import React, { useState, useEffect } from 'react';
import Dashboard from "../Dashboard";
import { firestore } from '../firebase'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default function Users() {
  const [users, setUsers] = useState([]); // State to hold user data
  const [userCount, setUserCount] = useState(0); // State to hold user count

  useEffect(() => {
    // Function to fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const userCollection = collection(firestore, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userData = userSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.isRegisterComplete === true && !user.isAdmin); // Filter condition
        setUsers(userData);

        // Update the user count
        setUserCount(userData.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, []);

  const deleteUser = async (id) => {
    try {
      const userDoc = doc(firestore, 'users', id); // Reference to the document
      await deleteDoc(userDoc); // Delete the document
      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      // Update the user count after deletion
      setUserCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Dashboard userCount={userCount} />
      <h1>Users</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>accountCreationDate</th>
              <th>age</th>
              <th>birthdate</th>
              <th>email</th>
              <th>firstname</th>
              <th>fontSize</th>
              <th>isAvailable</th>
              <th>isRegisterComplete</th>
              <th>isVerified</th>
              <th>lastname</th>
              <th>medicalCondition</th>
              <th>phoneNumber</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.accountCreationDate}</td>
                <td>{user.age}</td>
                <td>{user.birthdate}</td>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.fontSize}</td>
                <td>{user.isAvailable}</td>
                <td>{user.isRegisterComplete}</td>
                <td>{user.isVerified}</td>
                <td>{user.lastname}</td>
                <td>{user.medicalCondition}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table border="1">
          <thead>
            <tr>
              <th>profilePicture</th>
              <th>registerType</th>
              <th>sex</th>
              <th>totalTrips</th>
              <th>userID</th>
              <th>userType</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.profilePicture}</td>
                <td>{user.registerType}</td>
                <td>{user.sex}</td>
                <td>{user.totalTrips}</td>
                <td>{user.userID}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}