import React, { useEffect, useState } from "react";
import axios from "axios";





const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data (replace URL with your API or static JSON path)

   const token =  localStorage.getItem("token") 

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-all-orders`, {

                headers:{
                    Authorization: `${token}`
                }
            }); // Replace with your API endpoint
            setOrders(response?.data?.orders);

            console.log("order details",response);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    fetchOrders()

  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Position</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Order Status</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3">{order.user_id?.name}</td>
                <td className="p-3">{order.user_id?.email}</td>
                <td className="p-3">{order.billingId?.phone}</td>
                <td className="p-3 capitalize">{order.billingId?.position}</td>
                <td className="p-3 capitalize">{order.payment_status}</td>
                <td className="p-3 capitalize">{order.order_status}</td>
                <td className="p-3">{order.payment_method}</td>
                <td className="p-3">{order.transaction_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
