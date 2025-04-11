import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = ({ next, update, data }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    tags: "",
    start_date: "",
    end_date: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...data, // preload data if exists
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/view-category`)
      .then((res) => setCategories(res.data?.data || []))
      .catch((err) => console.error("Category fetch failed", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/createevent`, form);
      setMsg("🎉 Event created successfully!");

      // Update parent state
      update({ ...form, eventId: res.data?.eventId });

      // Move to next step
      if (next) next();
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-4 shadow-sm border rounded">
      <h3 className="mb-3">Create Event</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description *</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Category *</label>
          <select
            className="form-select"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="eg: tech, music, AI"
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Start Date *</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>End Date *</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Timezone *</label>
          <input
            type="text"
            className="form-control"
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
