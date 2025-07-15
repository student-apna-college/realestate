import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Get logged-in user
import axios from '../api/axios';
import Footer from './Footer';

export default function AdminDashboard() {
  const { user, loading: userLoading } = useAuth();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios.get(`/admin/${user._id}/details`)
      .then(res => {
        setDetails(res.data);
      })
      .catch(error => {
        console.error('Error fetching admin details:', error);
        setDetails(null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (userLoading || loading) return <div>Loading...</div>;
  if (!details || !details.shop) return <div>No Company details available.</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Company: {details.shop.name || 'N/A'}</h3>
      {details.shop.image && (
  <img
    src={`http://localhost:5000/uploads/shop-images/${details.shop.image}`}
    alt="Shop"
    width="100"
  />
)}
      <Footer/>
    </div>
  );
}
