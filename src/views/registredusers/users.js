import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";




const Users = () => { 

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/users`);
            console.log("response", response);
            setUsers(response?.data?.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
        };
    
        fetchUsers();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
        <h1 style={{display:"flex", justifyContent:"center", alignContent:"center", marginBottom:"20px"}}>Registered Users</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id ?? `user-${index}`}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    </tr>
                ))}
                </tbody>
        </table>
        </div>
    );
}

export default Users;