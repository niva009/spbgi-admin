import React, { useState, useEffect } from "react";
import axios from "axios";

const BreakfastList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/breakfast/view-registration`);
        setRegistrations(response.data.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const groupByLegend = (data) => {
    const grouped = {};
    data.forEach((item) => {
      const legend = item.legend || "Unknown Legend";
      if (!grouped[legend]) {
        grouped[legend] = [];
      }
      grouped[legend].push(item);
    });
    return grouped;
  };

  const groupedRegistrations = groupByLegend(registrations);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Breakfast Registrations</h1>
      {Object.entries(groupedRegistrations).map(([legend, users], index) => (
        <div key={index} className="mb-5 p-3 border rounded shadow-sm">
          <h4 className="text-primary mb-3">{legend}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Registration ID</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.registrationId}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
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
