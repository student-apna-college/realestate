import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ShopRegisterQuery = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get('/shop/ragister/getshop-query');
        setShops(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch shop registration queries');
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shop Registration Queries</h2>
      {loading ? (
        <p>Loading shops...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>PAN</th>
                <th>Address</th>
                <th>Category</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {shops.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">No registration queries found</td>
                </tr>
              ) : (
                shops.map((shop, index) => (
                  <tr key={shop._id}>
                    <td>{index + 1}</td>
                    <td>{shop.name}</td>
                    <td>{shop.email}</td>
                    <td>{shop.phone}</td>
                    <td>{shop.pan}</td>
                    <td>{shop.address}</td>
                    <td>{shop.categoryofshop}</td>
                    <td>{new Date(shop.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShopRegisterQuery;
