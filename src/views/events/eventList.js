import React, { useState, useEffect } from "react";
import axios from "axios";

const BreakfastList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/showallevents`);
        setRegistrations(response.data.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const groupedByLegend = registrations.reduce((acc, curr) => {
    const legend = curr.legend || "Unknown";
    if (!acc[legend]) acc[legend] = [];
    acc[legend].push(curr);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Event List</h1>

      {Object.entries(groupedByLegend).map(([legend, users], index) => (
        <div key={index} className="mb-5 p-3 border rounded shadow-sm">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Location</th>
                <th>Ticket Price</th>
                <th>categoryname</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.title}</td>
                  <td>{user.location?.venue_name}</td>
                  <td>{user.tickets?.sale_price}</td>
                  <td>{user.category}</td>
                  <td>
                    {new Date(user.end_date).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default BreakfastList;
