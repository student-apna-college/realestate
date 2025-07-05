import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Toast, ToastContainer } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import "./All.css";
import Footer from "./Footer";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/admin/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch admin orders:", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setToastMsg("Order marked as Delivered ✅");
      setShowToast(true);
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      await axios.patch(`/api/orders/${orderId}/cancel`, {}, { withCredentials: true });
      alert("Order cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Pending" } : order
        )
      );
      alert("Failed to cancel order");
    }
  };

 

const generateInvoice = async (order) => {
  const doc = new jsPDF();
  const qrData = await QRCode.toDataURL(`Order ID: ${order._id}`);

  // ===== COLORS =====
  const primaryColor = [0, 102, 204]; // Blue
  const accentColor = [230, 247, 255]; // Light Blue Background
  const darkText = [40, 40, 40];

  // ===== HEADER =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text("Thanx For shop in BlendBaba", 14, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  doc.text("Order Invoice", 14, 28);

  // ===== CUSTOMER INFO =====
  const userName = order.user?.name || "N/A";
  const userEmail = order.user?.email || "N/A";
  const orderDate = new Date(order.createdAt).toLocaleString();
  const userAddress = order.address || "N/A";

  const boxTop = 34;
  const addressLines = doc.splitTextToSize(`Address: ${userAddress}`, 120);
  const addressY = boxTop + 26;
  const addressEndY = addressY + addressLines.length * 5;
  const statusY = addressEndY + 4;
  const dateY = statusY + 6;
  const dynamicBoxHeight = Math.max(48, dateY - boxTop + 6);

  // ===== BOX =====
  doc.setFillColor(...accentColor);
  doc.setDrawColor(...primaryColor);
  doc.rect(12, boxTop, 185, dynamicBoxHeight, 'FD'); // FD = Fill + Draw

  // ===== CUSTOMER INFO TEXT =====
  doc.setTextColor(...darkText);
  doc.setFontSize(10);
  doc.text(`Order ID: ${order._id}`, 16, boxTop + 6);
  doc.text(`Customer: ${userName}`, 16, boxTop + 14);
  doc.text(`Email: ${userEmail}`, 16, boxTop + 20);
  doc.text(addressLines, 16, addressY);
  doc.text(`Status: ${order.status}`, 16, statusY);
  doc.text(`Date: ${orderDate}`, 16, dateY);

  // ===== QR CODE =====
  doc.addImage(qrData, "PNG", 160, boxTop + 2, 30, 30);

  // ===== ITEMS TABLE =====
  const items = order.items || [];
  const itemRows = items.map((item, idx) => [
    idx + 1,
    item.name,
    item.unit || '-',
    item.quantity,
    `Rs${item.price}`,
    `Rs${item.price * item.quantity}`,
  ]);

  autoTable(doc, {
    startY: boxTop + dynamicBoxHeight + 10,
    head: [["#", "Item Name", "Unit", "Qty", "Price", "Total"]],
    body: itemRows,
    styles: { fontSize: 10, textColor: darkText },
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 },
  });

  // ===== SUMMARY =====
  const finalY = doc.lastAutoTable.finalY + 10;
  const deliveryCharge = 60;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = subtotal + deliveryCharge;

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...darkText);
  doc.text(`Subtotal: Rs${subtotal}`, 14, finalY);
  doc.text(`Delivery Charge: Rs${deliveryCharge}`, 14, finalY + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...primaryColor);
  doc.text(`Grand Total: Rs${grandTotal}`, 14, finalY + 14);

  // ===== SAVE FILE =====
  doc.save(`Invoice_${order._id}.pdf`);
};



  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  const totalIncome = filteredOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
  const totalCancelled = filteredOrders.filter(order => order.status === "Cancelled").length;
  const totalDelivered = filteredOrders.filter(order => order.status === "Delivered").length;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Orders Placed on Your Shop</h2>

      <div className="summary-container mb-4">
        <div className="summary-item"><h5>Total Income</h5><p>Rs{totalIncome}</p></div>
        <div className="summary-item"><h5>Total Cancelled Orders</h5><p>{totalCancelled}</p></div>
        <div className="summary-item"><h5>Total Delivered Orders</h5><p>{totalDelivered}</p></div>
        <div className="summary-item"><h5>Total Orders</h5><p>{filteredOrders.length}</p></div>
      </div>

      <div className="mb-3 d-flex justify-content-end">
        <Form.Select
          style={{ width: "200px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </Form.Select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Cancel</th>
              <th>Placed At</th>
              <th>Delivered At</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name}<br /><small>{order.user?.email}</small></td>
                <td>
                  <ul className="list-unstyled mb-0">
                    {order.items?.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.name}</strong> <br />
                        Rs{item.price} × {item.quantity} = Rs{item.price * item.quantity}<br />
                        Unit: {item.unit} | Category: {item.subCategory}
                      </li>
                    ))}
                    <small className="text-muted">Order ID: {order._id}</small>
                  </ul>
                </td>
                <td>Rs{order.totalAmount}</td>
                <td>{order.status === "Delivered" ? order.address : <span className="text-muted">Hidden</span>}</td>
                <td>
                  <span className={`badge bg-${order.status === "Delivered" ? "success" : order.status === "Cancelled" ? "danger" : "warning"}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "Pending" && (
                    <Button size="sm" variant="success" onClick={() => updateStatus(order._id, "Delivered")}>
                      Confirm
                    </Button>
                  )}
                </td>
                <td>
                  {order.status === "Pending" && (
                    <Button size="sm" variant="danger" onClick={() => handleCancelOrder(order._id)}>
                      Cancel
                    </Button>
                  )}
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : "--"}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => generateInvoice(order)}>
                    Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </div>
  );
}
