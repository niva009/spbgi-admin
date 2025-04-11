import React, { useState } from "react";
import axios from "axios";

const TicketDetails = ({ next, prev, data = [], update, eventId }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    sale_price: "",
    currency: "INR",
    quantity: "",
    sales_start_date: "",
    sales_end_date: "",
    ...data // preload if available
  });


  if (!eventId) {
    return <div className="alert alert-warning">Event ID not available. Please go back and create the event first.</div>;
  }
  console.log("event id", eventId);

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const { name, price, currency, quantity, sales_start_date, sale_price } = form;

    if (!name || !price || !currency || !quantity || !sales_start_date || !sale_price) {
      setMsg("⚠️ All required fields must be filled!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/updateticket/${eventId}`,
        form
      );

      update(form); // Update parent state
      next(); // Move to next step
      console.log("Ticket updated successfully", res.data);
      setMsg("✅ Ticket updated successfully!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 p-4 shadow-sm border rounded">
      <h3 className="mb-3">Ticket Details</h3>
      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name *</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Price *</label>
            <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Sale Price *</label>
            <input type="number" className="form-control" name="sale_price" value={form.sale_price} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Currency *</label>
            <select className="form-select" name="currency" value={form.currency} onChange={handleChange} required>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Quantity *</label>
            <input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Sales Start Date *</label>
            <input type="datetime-local" className="form-control" name="sales_start_date" value={form.sales_start_date} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Sales End Date</label>
            <input type="datetime-local" className="form-control" name="sales_end_date" value={form.sales_end_date} onChange={handleChange} />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={prev}>
            Back
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketDetails;
