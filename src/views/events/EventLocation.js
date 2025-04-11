import React, { useState } from "react";
import axios from "axios";

const EventLocation = ({ next, prev, data, eventId, update }) => {
  const [form, setForm] = useState({
    venue_name: data?.venue_name || "",
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    country: data?.country || "",
    postal_code: data?.postal_code || "",
    is_virtual: data?.is_virtual || false,
    virtual_link: data?.virtual_link || "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  console.log("event id", eventId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    setSuccess(false);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/updateeventlocation/${eventId}`,
        form
      );
      update(form);
      setMsg("✅ Location updated successfully!");
      setSuccess(true);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-4 shadow-sm border rounded">
      <h4 className="mb-3">Update Event Location</h4>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Venue Name *</label>
          <input
            type="text"
            className="form-control"
            name="venue_name"
            value={form.venue_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address *</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label>City *</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label>Country *</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Postal Code</label>
          <input
            type="text"
            className="form-control"
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
          />
        </div>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="is_virtual"
            name="is_virtual"
            checked={form.is_virtual}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="is_virtual">
            This is a virtual event
          </label>
        </div>

        {form.is_virtual && (
          <div className="mb-3">
            <label>Virtual Event Link *</label>
            <input
              type="url"
              className="form-control"
              name="virtual_link"
              value={form.virtual_link}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={prev}
            disabled={loading}
          >
            ⬅ Back
          </button>

          <div className="d-flex gap-3">
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Location"}
            </button>

            {success && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={next}
              >
                Next ➡
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventLocation;
