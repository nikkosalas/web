import React from 'react';
import Dashboard from "../Dashboard";



export default function Rides(){
    return(
        <div>
        <Dashboard/>

        <h1>Rides</h1>
        <div class="table-container">
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
                                <tr>

                                <td>1</td>
                                <td>101</td>
                                <td>201</td>
                                <td>123 Main St</td>
                                <td>456 Elm St</td>
                                <td>2023-08-10</td>
                                <td>Completed</td>
                                <td><button>Delete</button></td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>102</td>
                                <td>202</td>
                                <td>789 Oak Ave</td>
                                <td>567 Maple St</td>
                                <td>2023-08-12</td>
                                <td>Cancelled</td>
                                <td><button>Delete</button></td>

                                </tr>
                        </tbody>
                </table>
        </div>
        </div>
    )
}