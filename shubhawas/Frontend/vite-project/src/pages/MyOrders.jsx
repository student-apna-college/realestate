import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import './All.css';
import Footer from './Footer';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/orders/my-orders', { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      });
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      await axios.patch(`/api/orders/${orderId}/cancel`, {}, { withCredentials: true });
      alert('Order cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 'Pending' } : order
        )
      );
      alert('Failed to cancel order');
    }
  };

  const toggleItemDetails = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, showDetails: !order.showDetails } : order
      )
    );
  };

  return (
    <div className="container py-4" style={{ background: 'linear-gradient(to bottom, #f0f4f8, #ffffff)' }}>
      <h2 className="mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>🛒 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="lead">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="row">
          {orders.map((order, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm" style={{ borderRadius: '10px' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Order #{order._id}</h5>
                  <p className="mb-1">
                    <strong>Status:</strong> <span className={`badge bg-${order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'danger' : 'warning'}`}>{order.status}</span>
                  </p>
                  <p className="mb-1">
                    <strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Total with Delivery charges:</strong> ₹{order.totalAmount}
                  </p>
                  <div className="mt-auto">
                    <h6 className="fw-bold">Items:</h6>
                    <ul className="list-group list-group-flush">
                      {order.items.slice(0, 1).map((item, i) => (
                        <li key={i} className="list-group-item p-1 small">
                          {item.name} - ₹{item.price} × {item.quantity}
                        </li>
                      ))}
                      {order.items.length > 1 && (
                        <li className="list-group-item p-1 small">
                          +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                        </li>
                      )}
                    </ul>
                    {order.showDetails && (
                      <div className="mt-2">
                        <h6 className="fw-bold">All Items Details:</h6>
                        <ul className="list-group list-group-flush">
                          {order.items.map((item, i) => (
                            <li key={i} className="list-group-item p-1 small">
                              {item.name} - ₹{item.price} × {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      className="mt-2"
                      onClick={() => toggleItemDetails(order._id)}
                    >
                      {order.showDetails ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button
                      className="btn btn-secondary mt-3"
                      disabled
                    >
                      Order Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  
    </div>
  );
}
    <Footer/>