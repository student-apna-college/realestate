import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Trash2, UserPlus } from 'lucide-react';
import "./All.css";


export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('/api/superadmin/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error('Error fetching admins', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/superadmin/create-admin', adminForm);
      setAdminForm({ name: '', email: '', password: '' });
      fetchAdmins();
    } catch (err) {
      console.error('Error creating admin', err);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`/api/superadmin/delete-admin/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error('Error deleting admin', err);
    }
  };

  return (
    <div className="superadmin-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>🛡️ SuperAdmin Panel</h1>
          <p>Manage Admins with power & control</p>
        </header>

        {/* Create Admin Form */}
        <section className="admin-form-section">
          <h2><UserPlus size={20} /> Create New Admin</h2>
          <form onSubmit={handleAdminSubmit} className="admin-form">
            <input
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              placeholder="Admin Name"
              required
            />
            <input
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              placeholder="Admin Email"
              type="email"
              required
            />
            <input
              type="password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              placeholder="Password"
              required
            />
            <button type="submit">Create Admin</button>
          </form>
        </section>

        {/* Admins List */}
        <section className="admin-list-section">
          <h2>🧑‍💼 All Admins</h2>
          {admins.length === 0 ? (
            <p className="no-admins">No admins available.</p>
          ) : (
            <div className="admin-cards">
              {admins.map((admin) => (
                <div key={admin._id} className="admin-card">
                  <p className="admin-id">ID: {admin._id}</p>
                  <h3>{admin.name}</h3>
                  <p>{admin.email}</p>
                  <button onClick={() => deleteAdmin(admin._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
