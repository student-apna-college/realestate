import { useEffect, useState, useMemo } from 'react';
import axios from '../api/axios';
import Footer from './Footer';
import { FaBox, FaTimesCircle, FaCheckCircle, FaRupeeSign } from 'react-icons/fa';


export default function SuperAdminDashboard() {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    axios.get('/api/shops/all', { withCredentials: true })
      .then(res => setShops(res.data))
      .catch(err => console.error("Failed to fetch shops", err));
  }, []);

  const filteredShops = useMemo(
    () =>
      shops.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [shops, searchTerm]
  );

  const viewAnalytics = async (shopId) => {
    setSelectedShop(shopId);
    setLoadingAnalytics(true);
    try {
      const res = await axios.get(`/api/superadmin/shops/${shopId}/analytics`, { withCredentials: true });
      setAnalytics(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
      setAnalytics(null);
    } finally {
      setLoadingAnalytics(false);
    }
  };


   function Spinner() {
  return (
    <div className="text-center my-4">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );
}
  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">🛠️ SuperAdmin Dashboard</h2>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search shops..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Shop Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredShops.map(shop => (
          <div className="col" key={shop._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-semibold">Shop Name: {shop.name}</h5>
                <p className="card-title fw-semibold">Location: {shop.location}</p>
                <p className="card-title fw-semibold">Category: {shop.category}</p>
                <p className="card-title fw-semibold">Address: {shop.address}</p>
                <p className="card-title fw-semibold">Phone: {shop.phone}</p>
                <p className="card-title fw-semibold">Pan card: {shop.pan}</p>
                
                
                <p><strong>👤 Admin:</strong> {shop.admin?.name || '—'}</p>
                <p><strong>💳 Razorpay ID:</strong> {shop.razorpayAccountId || 'Not created'}</p>
                <button className="btn btn-outline-primary mt-2" onClick={() => viewAnalytics(shop._id)}>
                  📊 View Analytics
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredShops.length === 0 && (
          <div className="col-12">
            <p className="text-center text-muted">No shops found.</p>
          </div>
        )}
      </div>

      {/* Analytics Section */}
      {selectedShop && (
        <div className="mt-5">
          <h4 className="mb-3 fw-bold">📈 Analytics for Selected Shop</h4>
          {loadingAnalytics ? (
            <Spinner />
          ) : analytics ? (
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card text-white bg-primary h-100 shadow">
                  <div className="card-body d-flex align-items-center">
                    <FaBox size={30} className="me-3" />
                    <div>
                      <h6 className="card-title">Total Products</h6>
                      <h5>{analytics.productCount}</h5>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card text-white bg-danger h-100 shadow">
                  <div className="card-body d-flex align-items-center">
                    <FaTimesCircle size={30} className="me-3" />
                    <div>
                      <h6 className="card-title">Cancelled Orders</h6>
                      <h5>{analytics.cancelledCount}</h5>
                      <small>₹{analytics.cancelledTotal}</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card text-white bg-success h-100 shadow">
                  <div className="card-body d-flex align-items-center">
                    <FaCheckCircle size={30} className="me-3" />
                    <div>
                      <h6 className="card-title">Delivered Orders</h6>
                      <h5>{analytics.deliveredCount}</h5>
                      <small>₹{analytics.deliveredTotal}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-danger">Failed to load analytics.</p>
          )}
        </div>
      )}

      
    </div>
  );
}
