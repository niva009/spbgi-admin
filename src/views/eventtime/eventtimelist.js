import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventTimeList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // ✅ Correct usage

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/event-time`);
        console.log('Event times:', res);
        setEvents(res.data.data);
      } catch (error) {
        console.error('Failed to fetch event times:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdate = (id) => {
    // ✅ Navigate to the update route
    navigate(`/event-time-update/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Times</h2>
      {events.length === 0 ? (
        <p>No event times available.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Day</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td className="border p-2">{event._id}</td>
                <td className="border p-2">{event.day}</td>
                <td className="border p-2">{event.date}</td>
                <td className="border p-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(event._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventTimeList;
