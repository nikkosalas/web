import React from 'react';
import Dashboard from "../Dashboard";



export default function Users(){
    return(
        <div>
        <Dashboard/>

        <h1>Users</h1>
        <div class="table-container">
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
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>1990-05-15</td>
                        <td>Male</td>
                        <td>123-456-7890</td>
                        <td>johndoe@example.com</td>
                        <td>********</td>
                        <td>Senior</td>
                        <td>No</td>
                        <td>No</td>
                        <td><button>Delete</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>1988-08-25</td>
                        <td>Female</td>
                        <td>987-654-3210</td>
                        <td>janesmith@example.com</td>
                        <td>********</td>
                        <td>PWD</td>
                        <td>Yes</td>
                        <td>Asthma</td>
                        <td><button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    )
}