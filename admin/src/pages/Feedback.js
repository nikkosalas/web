import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import { firestore } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0); // State to hold feedback count

  useEffect(() => {
    // Function to fetch feedback data from Firestore
    const fetchFeedbackData = async () => {
      try {
        const feedbackCollection = collection(firestore, 'feedbacks');
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const feedbackData = feedbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackData);
        // Update feedback count
        setFeedbackCount(feedbackData.length);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    // Call the fetchFeedbackData function to load feedback data
    fetchFeedbackData();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      const feedbackDoc = doc(firestore, 'feedbacks', id);
      await deleteDoc(feedbackDoc);
      // Remove the deleted feedback from the feedbacks state
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
      // Update feedback count after deletion
      setFeedbackCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <Dashboard feedbackCount={feedbackCount} />
      <h1>Feedback</h1>
      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Comment</th>
              <th>FeedbackDate</th>
              <th>FeedbackID</th>
              <th>UserID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.comment}</td>
                <td>{feedback.feedbackDate}</td>
                <td>{feedback.feedbackID}</td>
                <td>{feedback.userID}</td>
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