import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"

const RoleAssignment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/role-assignment`, formData);
      toast.success("user role assigned success!")
      setFormData({ name: '', email: '', phone: '', password: '' });
      setErrors({});
    } catch (error) {
      alert('Error assigning role!');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#1E293B',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          color: '#fff',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px' }}>
          Assign Role
        </h2>

        {['name', 'email', 'phone', 'password'].map((field) => (
          <div key={field} style={{ marginBottom: '18px' }}>
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #475569',
                backgroundColor: '#0F172A',
                color: '#fff',
                fontSize: '16px',
              }}
            />
            {errors[field] && (
              <div style={{ color: 'salmon', marginTop: '5px', fontSize: '13px' }}>
                {errors[field]}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3B82F6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563EB')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3B82F6')}
        >
          Assign Role
        </button>
      </form>
    </div>
  );
};

export default RoleAssignment;
