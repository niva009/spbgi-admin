import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/order/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <p className="text-lg font-semibold">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-8 text-black">
        <h2 className="text-3xl pb-30 mb-20 font-bold text-center text-indigo-700">Order Details</h2>

        <Section title="User Information">
          <Info label="Name:" value={<span style={{ marginLeft: "8px", color: "green", fontWeight: "bolder" }}>{order.user_id?.name}</span>} />
          <Info label="Email:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.user_id?.email}</span>} />
          <Info label="PhoneNumber :" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.user_id?.phone}</span>} />
        </Section>

        <Section title="Order Info">
          <Info label="Registration:" value={<span style={{ marginLeft: "8px", color: "red", fontWeight: "bolder" }}>{order?.registration_id}</span>} />
          <Info label="Order Status:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order?.order_status}</span>} />
          <Info label="Payment Status:" value={<span style={{ marginLeft: "8px", color: "green", fontWeight: "bolder" }}>{order?.payment_status}</span>} />
        </Section>

        <Section title="Billing Information">
          <Info label="Address:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.billingId?.address}</span>} />
          <Info label="State:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.billingId?.state}</span>} />
          <Info label="Position:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.billingId?.position}</span>} />
          <Info label="Institution:" value={<span style={{ marginLeft: "8px", fontWeight: "bolder" }}>{order.billingId?.instution}</span>} />
        </Section>

        {/* Mark Attendance Button */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
  <button
    onClick={() => alert("Attendance Marked")}
    style={{
      padding: '12px 24px',
      backgroundColor: '#4F46E5', // Indigo color
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center',
      transition: 'background-color 0.3s ease',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#4338CA')} // Hover effect
    onMouseOut={(e) => (e.target.style.backgroundColor = '#4F46E5')} // Reset hover effect
  >
    Mark Attendance
  </button>
</div>


      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xl sm:text-2xl font-semibold text-center text-indigo-600 mb-4 border-b border-gray-300 pb-2">
      {title}
    </h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
    <span className="font-medium text-gray-800">{label}</span>
    <span className="text-gray-700 sm:text-right">{value || "-"}</span>
  </div>
);

export default OrderDetails;
