import React, { useState, useEffect } from 'react';
import Dashboard from "../Dashboard";
import { firestore } from '../firebase'; // Import the Firestore instance

export default function Users() {
  const [users, setUsers] = useState([]); // State to hold user data

  useEffect(() => {
    // Function to fetch user data from Firestore
    const fetchUserData = async () => {
      try {
        const userCollection = firestore.collection('users');
        const userSnapshot = await userCollection.get();
        const userData = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Call the function when the component mounts
  }, []);

  const deleteUser = async (id) => {
    try {
      await firestore.collection('users').doc(id).delete();
      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Dashboard />
      <h1>Users</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>BirthDate</th>
              <th>Gender</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Password</th>
              <th>UserType</th>
              <th>Disabilities</th>
              <th>MedicalCondition</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.Firstname}</td>
                <td>{user.Lastname}</td>
                <td>{user.BirthDate}</td>
                <td>{user.Gender}</td>
                <td>{user.PhoneNumber}</td>
                <td>{user.Email}</td>
                <td>********</td>
                <td>{user.UserType}</td>
                <td>{user.Disabilities}</td>
                <td>{user.MedicalCondition}</td>
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