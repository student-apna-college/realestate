import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Cart } from 'react-bootstrap-icons';
import weblogo from '../images/subhawas.png'



export default function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{backgroundColor:"black"}}>
      <div className="container-fluid">
         <Link className="navbar-brand" to="/">
        <img src={weblogo} alt="BlendBaba" className="nav-logo" />
      </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
           <li className="nav-item">
  <Link className="nav-link" to="/cart">
    <Cart size={20} className="me-1 mb-1 align-text-bottom" />
    Cart
  </Link>

</li>

            {!loading && user?.role === "user" && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-orders">
                  My Bookings
                </Link>
              </li>
            )}

            {!loading && user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/create-product">
                    Create Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/all-orders">
                    All Orders
                  </Link>
                </li>
              </>
            )}




            {!loading && user?.role === "superadmin" && (
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/superadmin">
                  Analytics
                </Link>


                <Link className="nav-link" to="/contact-query">
                  Contact Query
                </Link>


                <Link className="nav-link" to="/shop-query">
                  Shop Query
                </Link>
                
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/superadmincrud">
                  CURD
                </Link> 

                <li className="nav-item">
                <Link className="nav-link" to="/create-shop">
                  Create Shops
                </Link> 
              </li>
              </li>
              </>
            )}
            
          </ul>

          <div className="d-flex align-items-center">
            {!loading && user ? (
              <>
                <span className="text-white me-3">Hi, {user.name}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2 btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-light btn-sm" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
