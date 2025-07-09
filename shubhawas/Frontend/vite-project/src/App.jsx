import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login.jsx';
import Ragister from './auth/Ragister.jsx';
import PublicHome from './pages/PublicHome.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx';
import ProductCreate from './pages/ProductCreate.jsx';
import Navbar from './pages/Navbar.jsx'
// import ShopProducts from './pages/ShopProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
// import CartPage from './pages/CartPage'
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import CreatShop from './pages/CreatShop.jsx'


import CheckoutCOD from './pages/CheckoutCOD.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import MyOrders from './pages/MyOrders.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import Terms from './pages/Terms&Conditions/Terms.jsx';
import VendorOnboarding from './pages/Terms&Conditions/VendorOnboarding.jsx';
import ShopRagisterForm from './pages/ShopRagisterForm.jsx';
import SuperAdminShopManager from './pages/SuperAdminShopManager.jsx';
import ContactQuery from './pages/ContectQuery.jsx';
import ShopRagisterQuery from './pages/ShopRagisterQuery.jsx';
import CompanyProperties from './pages/CompanyProperties.jsx';




// import About from './pages/About';
// import Contact from './pages/Contact';
// import UserBookings from './pages/UserBookings';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={< Ragister/>}/>
        <Route path='/about' element ={<About/>}/>
        <Route path='/contact' element ={<Contact/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/ragister-form' element={<ShopRagisterForm></ShopRagisterForm>}/>
        <Route path='/superadmincrud' element={<SuperAdminShopManager></SuperAdminShopManager>}/>
        <Route path='/create-shop' element={<CreatShop></CreatShop>}/>
        <Route path="/company/:companyId" element={<CompanyProperties />} />
        
    <Route path="/checkout-cod" element={<CheckoutCOD />} />
    <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-product" element={<ProductCreate />} />
        <Route path="admin/all-orders" element={<AdminOrders />} />
        <Route path="/superadmin" element={<SuperAdminDashboard />} />
         {/* <Route path="/shop/:shopId" element={<ShopProducts />} />   */}
         {/* <Route path='/cart' element={<CartPage />}/> */}
         <Route path="/terms" element={<Terms />} />
         <Route path='/vendor-onboarding-guide' element={<VendorOnboarding />}/>
          <Route path="/contact-query" element={<ContactQuery />} />
          <Route path="/shop-query" element={<ShopRagisterQuery />} />

         
         
         
      </Routes>
      
    </Router>
  );
}
