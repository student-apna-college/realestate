import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Ragister from './auth/Ragister';
import PublicHome from './pages/PublicHome';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import ProductCreate from './pages/ProductCreate';
import Navbar from './pages/Navbar'
// import ShopProducts from './pages/ShopProducts';
import 'bootstrap/dist/css/bootstrap.min.css';
// import CartPage from './pages/CartPage'
import About from './pages/About';
import Contact from './pages/Contact';
import CreatShop from './pages/CreatShop'


import CheckoutCOD from './pages/CheckoutCOD';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import Terms from './pages/Terms&Conditions/Terms';
import VendorOnboarding from './pages/Terms&Conditions/VendorOnboarding.JSX';
import ShopRagisterForm from './pages/ShopRagisterForm';
import SuperAdminShopManager from './pages/SuperAdminShopManager';
import ContactQuery from './pages/ContectQuery';
import ShopRagisterQuery from './pages/ShopRagisterQuery';
import CompanyProperties from './pages/CompanyProperties';




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
