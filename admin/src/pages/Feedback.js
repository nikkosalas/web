import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard';
import { firestore } from '../firebase'; // Import your Firebase configuration

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Function to fetch feedback data from Firestore
    const fetchFeedbackData = async () => {
      try {
        const feedbackData = [];
        const querySnapshot = await firestore.collection('feedback').get();

        querySnapshot.forEach((doc) => {
          feedbackData.push({ id: doc.id, ...doc.data() });
        });

        setFeedbacks(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    // Call the fetchFeedbackData function to load feedback data
    fetchFeedbackData();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await firestore.collection('feedback').doc(id).delete();
      // Remove the deleted feedback from the feedbacks state
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <Dashboard />
      <h1>Feedback</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>FeedbackID</th>
              <th>UserID</th>
              <th>DriverID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>FeedBackDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.feedbackID}</td>
                <td>{feedback.userID}</td>
                <td>{feedback.driverID}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.comment}</td>
                <td>{feedback.feedbackDate}</td>
                <td>
                  <button onClick={() => deleteFeedback(feedback.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}