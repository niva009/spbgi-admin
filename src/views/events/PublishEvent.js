import React, { useState } from 'react';
import axios from 'axios';

const PublishEvent = ({ next, prev, eventId }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    capacity: '',
    age_restriction: ''
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('capacity', form.capacity);
      formData.append('age_restriction', form.age_restriction);
      if (file) formData.append('event_banner', file);

      const res = await axios.put(`${import.meta.env.VITE_URL}/publishevent/${eventId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMsg('✅ Event published successfully!');
      setShowModal(false);
      next(); // Proceed after publish
    } catch (err) {
      setMsg(err.response?.data?.message || '❌ Failed to publish');
      console.error('Publish error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-4 shadow-sm border rounded">
      <h3 className="mb-3">Publish Event</h3>

      {msg && <div className="alert alert-info">{msg}</div>}

      <div className="mb-3">
        <label>Capacity</label>
        <input
          type="number"
          className="form-control"
          name="capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Age Restriction</label>
        <input
          type="text"
          className="form-control"
          name="age_restriction"
          value={form.age_restriction}
          onChange={(e) => setForm({ ...form, age_restriction: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Event Banner (optional)</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prev}>Back</button>
        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop fade show" style={{ display: 'block' }}>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Publish</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  Are you sure you want to publish this event? Once published, it will be live!
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handlePublish}>Yes, Publish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishEvent;
