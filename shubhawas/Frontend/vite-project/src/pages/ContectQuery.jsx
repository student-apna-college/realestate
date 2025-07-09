import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ContactQuery = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('/api/getall-contact');
        setContacts(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch contacts');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Messages</h2>
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No messages found</td>
                </tr>
              ) : (
                contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.yourmessage}</td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
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

export default ContactQuery;
