import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/get-all-orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setOrders(response?.data?.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  const exportToExcel = () => {
    const excelData = orders.map((order) => ({
      Name: order.user_id?.name,
      Email: order.user_id?.email,
      Phone: order.user_id?.phone,
      Position: order.billingId?.position,
      Institution: order.billingId?.instution,
      Sex: order.billingId?.sex,
      Age: order.billingId?.age,
      "member of Senadhipan Education Foundation": order.billingId?.member,
      "require an invitation letter to process the VISA":order.billingId?.invitation,
      "Payment Status": order.payment_status,
      "Order Status": order.order_status,
      "Payment Method": order.payment_method,
      "Transaction ID": order.transaction_id,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "orders.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Order Details</h2>
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Position</th>
              <th className="p-3">Institution</th>
              <th className="p-3">Sex</th>
              <th className="p-3">Age</th>
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
                <td className="p-3">{order.user_id?.phone}</td>
                <td className="p-3 capitalize">{order.billingId?.position}</td>
                <td className="p-3 capitalize">{order.billingId?.instution}</td>
                <td className="p-3 capitalize">{order.billingId?.sex}</td>
                <td className="p-3">{order.billingId?.age}</td>
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
