import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    metaTitle: "",
    metadescription: ""
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/view-category`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`
        }
      });
      setCategories(response.data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/add-category`,
        formData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        }

      );
      toast.success("category addedd success");
      setFormData({ name: "", metaTitle: "", metadescription: "" });
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
      setError(err?.response?.data?.message || "Failed to add category");
    }
  };

  const deltecategory = async (id) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.delete(`${import.meta.env.VITE_URL}/delete-category/${id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        }

      );
      setSuccess("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err?.response?.data?.message || "Failed to delete category");
    }
  }

  return (
    <div className="container mt-4">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Title</label>
          <input
            type="text"
            className="form-control"
            name="metatitle"
            value={formData.metatitle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Description</label>
          <textarea
            className="form-control"
            name="metadescription"
            value={formData.metadescription}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Add Category</button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <h3>All Categories</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Meta Title</th>
            <th>Meta Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id || index}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.metatitle}</td>
              <td>{cat.metadescription}</td>
              <td>
              <button className="btn btn-danger"onClick={() =>deltecategory(cat._id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryForm;
