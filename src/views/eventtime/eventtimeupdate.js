import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateEventTime = () => {
  const { id: eventId } = useParams(); // ✅ Get ID from route
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/event-time/${eventId}`);
        setFormData(response.data.data); // Adjust according to your response structure
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e, sessionIndex, topicIndex, speakerField) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };

    if (sessionIndex !== undefined) {
      if (topicIndex !== undefined) {
        if (speakerField) {
          updatedData.sessions[sessionIndex].topics[topicIndex].speaker[speakerField] = value;
        } else {
          updatedData.sessions[sessionIndex].topics[topicIndex][name] = value;
        }
      } else if (name === 'chairpersons') {
        updatedData.sessions[sessionIndex].chairpersons = value.split(',');
      } else {
        updatedData.sessions[sessionIndex][name] = value;
      }
    } else {
      updatedData[name] = value;
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${import.meta.env.VITE_URL}/event-time/${eventId}`, formData);
      alert('Event updated successfully!');
      console.log(res.data);
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!formData) return <div>Event not found or failed to load.</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Update Event Time</h2>

      <div>
        <label>Day:</label>
        <input type="text" name="day" value={formData.day} onChange={handleChange} className="border p-2 w-full" />
      </div>
      <div>
        <label>Date:</label>
        <input type="text" name="date" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
      </div>

      {formData.sessions.map((session, sessionIndex) => (
        <div key={sessionIndex} className="border p-4 rounded bg-gray-50">
          <h3 className="font-semibold">Session {sessionIndex + 1}</h3>

          <input type="text" name="timeSlot" placeholder="Time Slot"
            value={session.timeSlot} onChange={(e) => handleChange(e, sessionIndex)} className="border p-2 w-full mb-2" />

          <input type="text" name="sessionTitle" placeholder="Session Title"
            value={session.sessionTitle} onChange={(e) => handleChange(e, sessionIndex)} className="border p-2 w-full mb-2" />

          <input type="text" name="sessionNote" placeholder="Session Note"
            value={session.sessionNote} onChange={(e) => handleChange(e, sessionIndex)} className="border p-2 w-full mb-2" />

          <input type="text" name="chairpersons" placeholder="Chairpersons (comma separated)"
            value={session.chairpersons.join(',')} onChange={(e) => handleChange(e, sessionIndex)} className="border p-2 w-full mb-2" />

          <h4 className="font-medium mt-4">Topics</h4>
          {session.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="ml-4 mb-4 border-l pl-4">
              <input type="text" name="title" placeholder="Topic Title"
                value={topic.title} onChange={(e) => handleChange(e, sessionIndex, topicIndex)} className="border p-2 w-full mb-1" />

              <input type="text" name="name" placeholder="Speaker Name"
                value={topic.speaker.name} onChange={(e) => handleChange(e, sessionIndex, topicIndex, 'name')} className="border p-2 w-full mb-1" />

              <input type="text" name="designation" placeholder="Speaker Designation"
                value={topic.speaker.designation} onChange={(e) => handleChange(e, sessionIndex, topicIndex, 'designation')} className="border p-2 w-full mb-1" />
            </div>
          ))}
        </div>
      ))}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">Update Event</button>
    </form>
  );
};

export default UpdateEventTime;
