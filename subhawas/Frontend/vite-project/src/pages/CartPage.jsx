// import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import axios from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import Footer from './Footer';

// export default function CartPage() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState({ items: [] });

//   const [subtotal, setSubtotal] = useState(0);
//   const [deliveryCharge, setDeliveryCharge] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     axios
//       .get('/api/cart', { withCredentials: true })
//       .then((res) => {
//         const data = res.data;
//         setCart(data);

//         // Calculate values after setting cart
//         const sub = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//         const uniqueShops = [...new Set(data.items.map((item) => item.shopId))];
//         const delivery = uniqueShops.length * 60;
//         const total = sub + delivery;

//         setSubtotal(sub);
//         setDeliveryCharge(delivery);
//         setTotalAmount(total.toFixed(2));
//       })
//       .catch((err) => {
//         console.error('Error loading cart:', err);
//         setCart({ items: [] });
//         setSubtotal(0);
//         setDeliveryCharge(0);
//         setTotalAmount(0);
//       });
//   }, []);

//   const updateQuantity = async (id, delta) => {
//     const item = cart.items.find((i) => i._id === id);
//     if (!item) return;

//     const newQuantity = item.quantity + delta;

//     try {
//       if (newQuantity <= 0) {
//         await axios.delete(`/api/cart/item/${id}`, { withCredentials: true });
//       } else {
//         await axios.post(
//           '/api/cart/add',
//           {
//             itemId: item._id,
//             name: item.name,
//             price: item.price,
//             quantity: delta,
//             image: item.image,
//             shopId: item.shopId,
//             unit: item.unit,
//             subCategory: item.subCategory,
//           },
//           { withCredentials: true }
//         );
//       }

//       // Reload cart
//       const res = await axios.get('/api/cart', { withCredentials: true });
//       const data = res.data;
//       setCart(data);

//       const sub = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       const uniqueShops = [...new Set(data.items.map((item) => item.shopId))];
//       const delivery = uniqueShops.length * 60;
//       const total = sub + delivery;

//       setSubtotal(sub);
//       setDeliveryCharge(delivery);
//       setTotalAmount(total.toFixed(2));
//     } catch (err) {
//       console.error('Failed to update item quantity', err);
//     }
//   };

//   const removeItem = async (itemId) => {
//     try {
//       await axios.delete(`/api/cart/item/${itemId}`, { withCredentials: true });
//       const res = await axios.get('/api/cart', { withCredentials: true });

//       const data = res.data;
//       setCart(data);

//       const sub = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//       const uniqueShops = [...new Set(data.items.map((item) => item.shopId))];
//       const delivery = uniqueShops.length * 60;
//       const total = sub + delivery;

//       setSubtotal(sub);
//       setDeliveryCharge(delivery);
//       setTotalAmount(total.toFixed(2));
//     } catch (err) {
//       console.error('Failed to remove item', err);
//     }
//   };

//   const clearCart = async () => {
//     await axios.post('/api/cart/clear', {}, { withCredentials: true });
//     setCart({ items: [] });
//     setSubtotal(0);
//     setDeliveryCharge(0);
//     setTotalAmount(0);
//   };

//   const goToAddressPage = () => {
//     navigate('/checkout-cod');
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-center">Your Cart</h2>
//       {cart.items.length === 0 ? (
//         <div className="text-center">
//           <p>Your cart is empty. Please login</p>
//           <Button variant="primary" onClick={() => navigate('/')}>
//             Continue Shopping
//           </Button>
//         </div>
//       ) : (
//         <Row>
//           <Col lg={8}>
//             {cart.items.map((item, idx) => (
//               <Card key={idx} className="mb-3 shadow-sm">
//                 <Row className="g-0 align-items-center">
//                   <Col xs={4} sm={3}>
//                     <img
//                       src={`http://localhost:5000/uploads/products/${item.image}`}
//                       alt={item.name}
//                       className="img-fluid rounded-start"
//                       style={{ objectFit: 'cover', height: '100px', width: '100%' }}
//                     />
//                   </Col>
//                   <Col xs={8} sm={9}>
//                     <Card.Body>
//                       <h5 className="card-title">Item: {item.name}</h5>
//                       <p className="card-text">Price: ₹{item.price}</p>
//                       <p className="card-text">Quantity: {item.quantity}</p>
//                       <p className="card-text">Unit: {item.unit}</p>
//                       <p className="card-text">{item.subCategory}</p>

//                       <div className="d-flex align-items-center gap-2">
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           onClick={() => updateQuantity(item._id, -1)}
//                         >
//                           -
//                         </Button>
//                         <span className="fw-bold">{item.quantity}</span>
//                         <Button
//                           variant="outline-secondary"
//                           size="sm"
//                           onClick={() => updateQuantity(item._id, 1)}
//                         >
//                           +
//                         </Button>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           className="ms-2"
//                           onClick={() => removeItem(item._id)}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Col>
//                 </Row>
//               </Card>
//             ))}
//             <Card className="p-3 mt-3 shadow-sm">
//               <p>Subtotal: ₹{subtotal}</p>
//               <p>Delivery Charges: ₹{deliveryCharge}</p>
//               <p className="fw-bold">Total Amount with Delivary charges: ₹{totalAmount}</p>
//             </Card>
//           </Col>

//           <Col lg={4}>
//             <Card className="p-3 shadow-sm">
//               <h5 className="mb-3">Order Summary</h5>
//               <p>
//                 Total Items:{' '}
//                 <strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
//               </p>
//               <Button variant="success" className="w-100 mb-2" onClick={goToAddressPage}>
//                 Buy (COD)
//               </Button>
//               <Button variant="outline-danger" className="w-100" onClick={clearCart}>
//                 Clear Cart
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       )}
//       <br />
//       <Footer />
//     </div>
//   );
// }
