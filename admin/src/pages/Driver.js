import Dashboard from "../Dashboard";

import React from 'react';

export default function Driver(){
    return(
        <div>
        <Dashboard/>

        <h1>Driver</h1>
        <div class="table-container">
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
                    <tr>

                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>1990-05-15</td>
                        <td>123-456-7890</td>
                        <td>johndoe@example.com</td>
                        <td>********</td>
                        <td>profile.jpg</td>
                        <td>4.5</td>
                        <td>Available</td>
                        <td><button>Delete</button></td>

                    </tr>
                    <tr>

                        <td>2</td>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>1988-08-25</td>
                        <td>987-654-3210</td>
                        <td>janesmith@example.com</td>
                        <td>********</td>
                        <td>avatar.jpg</td>
                        <td>4.0</td>
                        <td>Unavailable</td>
                        <td><button>Delete</button></td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    );

}