import React, { useState } from 'react';
import axios from 'axios';

const CreateEventTime = () => {
  const [formData, setFormData] = useState({
    day: '',
    date: '',
    sessions: [
      {
        timeSlot: '',
        sessionTitle: '',
        sessionNote: '',
        chairpersons: [''],
        topics: [
          {
            title: '',
            speaker: {
              name: '',
              designation: ''
            }
          }
        ]
      }
    ]
  });

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

  const addSession = () => {
    setFormData(prev => ({
      ...prev,
      sessions: [
        ...prev.sessions,
        {
          timeSlot: '',
          sessionTitle: '',
          sessionNote: '',
          chairpersons: [''],
          topics: [
            {
              title: '',
              speaker: {
                name: '',
                designation: ''
              }
            }
          ]
        }
      ]
    }));
  };

  const addTopic = (sessionIndex) => {
    const updatedSessions = [...formData.sessions];
    updatedSessions[sessionIndex].topics.push({
      title: '',
      speaker: {
        name: '',
        designation: ''
      }
    });
    setFormData({ ...formData, sessions: updatedSessions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/event-time`, formData);
      alert('Event saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Create Event Time</h2>

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
          <button type="button" onClick={() => addTopic(sessionIndex)} className="text-sm text-blue-600 mt-2">+ Add Topic</button>
        </div>
      ))}

      <button type="button" onClick={addSession} className="bg-yellow-400 p-2 rounded">+ Add Session</button>
      <br />
      <button type="submit" className="bg-green-600 text-white p-2 rounded mt-4">Submit</button>
    </form>
  );
};

export default CreateEventTime;
