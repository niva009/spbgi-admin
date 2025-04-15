import React, { useState } from "react";
import axios from "axios";

const ManualOrderForm = () => {
  const [step, setStep] = useState(1);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [billingForm, setBillingForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
    instution: "",
    position: "",
  });

  const [userId, setUserId] = useState(null);
  const [billingId, setBillingId] = useState(null);
  const [transactionId, setTransactionId] = useState("");

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/user-registration`, userForm); // Replace with your actual API
      console.log("User:", res.data);
      console.log("User ID:", res.data._id);
      setUserId(res.data?.data._id);
      setStep(2);
    } catch (err) {
      alert("User creation failed");
      console.log(err);
    }
  };  

  console.log("User ID:", userId);

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/create-billing-address`, {
        ...billingForm,
        user_id: userId,
      });
      console.log("Billing:", res.data);
      setBillingId(res.data.billing._id);
      console.log("Billing ID:", res.data.billing._id);
      setStep(3);
    } catch (err) {
      alert("Billing creation failed");
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/manual-create-order`, {
        user_id: userId,
        billingId,
        transaction_id: transactionId,
      });
      alert("Order created and email sent!");
      console.log("Order:", res.data.order);
      setStep(1);
      setUserForm({ name: "", email: "", phone: "", password: "" });
      setBillingForm({ name: "", address: "", city: "", state: "", country: "", postal_code: "", phone: "" });
      setTransactionId("");
    } catch (err) {
      alert("Order creation failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-5 text-center">Manual Order Creation</h2>

      {step === 1 && (
        <form onSubmit={handleUserSubmit} className="space-y-3">
          <h3 className="text-xl font-medium mb-2">1️⃣ User Registration</h3>
          <input placeholder="Name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="w-full border p-2" />
          <input placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full border p-2" />
          <input placeholder="Phone" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} className="w-full border p-2" />
          <input placeholder="Password" type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="w-full border p-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register & Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleBillingSubmit} className="space-y-3">
          <h3 className="text-xl font-medium mb-2">2️⃣ Billing Address</h3>
          <input placeholder="Name" value={billingForm.name} onChange={(e) => setBillingForm({ ...billingForm, name: e.target.value })} className="w-full border p-2" />
          <input placeholder="Address" value={billingForm.address} onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })} className="w-full border p-2" />
          <input placeholder="State" value={billingForm.state} onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })} className="w-full border p-2" />
          <input placeholder="position" value={billingForm.position} onChange={(e) => setBillingForm({ ...billingForm, position: e.target.value })} className="w-full border p-2" />
          <input placeholder="instution" value={billingForm.instution} onChange={(e) => setBillingForm({ ...billingForm, instution: e.target.value })} className="w-full border p-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save & Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleOrderSubmit} className="space-y-3">
          <h3 className="text-xl font-medium mb-2">3️⃣ Final Order Creation</h3>
          <input placeholder="Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} className="w-full border p-2" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Order</button>
        </form>
      )}
    </div>
  );
};

export default ManualOrderForm;
