import React from 'react';
import Dashboard from "../Dashboard";


export default function Feedback(){
    return(
        <div>
        <Dashboard/>

        <h1>Feedback</h1>

        <div class="table-container">
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
        <tr>
            <td>1</td>
            <td>101</td>
            <td>201</td>
            <td>5</td>
            <td>Great service!</td>
            <td>2023-08-10</td>
            <td><button>Delete</button></td>
        </tr>
        <tr>
            <td>2</td>
            <td>102</td>
            <td>202</td>
            <td>4</td>
            <td>Good experience.</td>
            <td>2023-08-12</td>
            <td><button>Delete</button></td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
    )
}