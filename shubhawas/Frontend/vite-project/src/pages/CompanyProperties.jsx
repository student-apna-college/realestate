// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../api/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './All.css';
import Footer from './Footer';




// export default function ShopProducts() {
//   const { shopId } = useParams();
//   const [products, setProducts] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [selectedPriceRange, setSelectedPriceRange] = useState('');

//   useEffect(() => {
//     axios.get(`/api/products/shop/${shopId}`)
//       .then(res => setProducts(res.data))
//       .catch(err => console.error("Error fetching products:", err));
//   }, [shopId]);

//   const addToCart = async (product) => {
//     try {
//       await axios.post('/api/cart/add', {
//         itemId: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: 1,
//         shopId,
//       }, { withCredentials: true });

//       toast.success(`🛒 ${product.name} added to cart!`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored"
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error('⚠️ Please login to add items to your cart.', {
//           position: "top-right",
//           autoClose: 3000,
//           theme: "colored"
//         });
//       }
//       console.error('Add to cart error:', err);
//     }
//   };

//   const priceRanges = [
//     { label: 'All', value: '' },
//     { label: '₹1 - ₹100', value: '1-100' },
//     { label: '₹100 - ₹200', value: '100-200' },
//     { label: '₹200 - ₹300', value: '200-300' },
//     { label: '₹400 - ₹600', value: '400-600' },
//     { label: '₹600 - ₹1000', value: '600-1000' },
//     { label: '₹1000+', value: '1000+' },
//   ];

//   const isInPriceRange = (price) => {
//     if (!selectedPriceRange || selectedPriceRange === '') return true;
//     if (selectedPriceRange === '1000+') return price > 1000;
//     const [min, max] = selectedPriceRange.split('-').map(Number);
//     return price >= min && price <= max;
//   };

//   const filteredProducts = products.filter(product =>
//     (product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchKeyword.toLowerCase())) &&
//     isInPriceRange(product.price)
//   );

//   return (
//     <div className="shop-bg">
//       <div className="container py-5 fade-in">
//         <h2 className="text-center mb-4 animated-heading">
//           <span style={{ color: "#FF6F00", fontWeight: "bold" }}>
//             Welcome to BlendBaba
//           </span>
//           <br />
//           <small style={{ fontSize: "18px", color: "#444" }}>
//             Please select an item you love ❤️
//           </small>
//         </h2>

//         {/* Search Input */}
//         <div className="mb-4 text-center">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="form-control search-box mx-auto"
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//           />
//         </div>

//         {/* Price Filter Buttons */}
//         <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
//           {priceRanges.map(range => (
//             <button
//               key={range.value}
//               className={`btn btn-outline-warning filter-btn ${selectedPriceRange === range.value ? 'active' : ''}`}
//               onClick={() => setSelectedPriceRange(range.value)}
//             >
//               {range.label}
//             </button>
//           ))}
//         </div>

//         {/* Product Grid */}
//         <div className="row">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map(product => (
//               <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//                 <div className="card product-card h-100 shadow-sm">
//                   <img
//                     src={`http://localhost:5000/uploads/products/${product.image}`}
//                     alt={product.name}
//                     className="card-img-top"
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   />
//                   <div className="card-body d-flex flex-column justify-content-between">
//                     <div>
//                       <h5 className="card-title">{product.name}</h5>
//                       <p className="card-text text-muted">₹{product.price}</p>
//                       <p className="card-text text-muted">Description: {product.description}</p>
//                       <p className="card-text text-muted">Unit: {product.unit}</p>
//                     </div>
//                     <button
//                       onClick={() => addToCart(product)}
//                       className="btn btn-warning mt-2 add-cart-btn"
//                     >
//                       Add to Cart 🛒
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-muted py-5">
//               <h5>No products found 🛍️</h5>
//             </div>
//           )}
//         </div>
//       </div>

//       <ToastContainer />
//       <Footer />
//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  ListGroup,
  Form,
  Modal,
  Button,
  Carousel,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import m1 from '../images/rgba.jpg';
import home from '../images/home.jpg';
import home1 from '../images/home1.jpg';
import home2 from '../images/home2.jpg';
import vid1 from '../images/vid1.mp4'
import Apartments1 from '../images/Apartments1.jpg'
import cement  from '../images/cement.jpg'

export default function CompanyProperties() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [category, setCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [location, setLocation] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const API_BASE_URL = 'https://realestate-zsnn.onrender.com';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`api/property/company/${companyId}`);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [companyId]);

  useEffect(() => {
    let updated = properties;

    if (keyword) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.description?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (propertyType) updated = updated.filter((p) => p.propertyType === propertyType);
    if (category) updated = updated.filter((p) => p.categoryName === category);
    if (priceMin) updated = updated.filter((p) => p.price >= parseInt(priceMin));
    if (priceMax) updated = updated.filter((p) => p.price <= parseInt(priceMax));
    if (location) updated = updated.filter((p) =>
      p.location?.city?.toLowerCase().includes(location.toLowerCase())
    );
    if (areaMin) updated = updated.filter((p) => p.area >= parseInt(areaMin));
    if (areaMax) updated = updated.filter((p) => p.area <= parseInt(areaMax));
    if (purpose) updated = updated.filter((p) => p.purpose?.toLowerCase() === purpose.toLowerCase());

    setFilteredProperties(updated);
  }, [
    keyword, propertyType, category, priceMin, priceMax,
    location, areaMin, areaMax, purpose, properties,
  ]);

  const handleImageClick = (src) => {
    setModalImage(src);
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading properties...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const uniqueTypes = Array.from(new Set(properties.map((p) => p.propertyType))).filter(Boolean);
  const uniqueCategories = Array.from(new Set(properties.map((p) => p.categoryName))).filter(Boolean);

  return (
    <>

    <Carousel className="custom-carousel" data-bs-interval="10000">
        <Carousel.Item>
          <img className="d-block w-30 carousel-image" src={home} alt="First slide"  />
          <Carousel.Caption>
            <h3 style={{ fontWeight: 'bold', color: '#ffc107' }}>Welcome to ShubhAwas</h3>
            <p>Come and Take your Dream Home Key.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-30 carousel-image" src={home1} alt="Second slide" />
          <Carousel.Caption>
            <h3 style={{ fontWeight: 'bold', color: '#ffc107' }}>Welcome to ShubhAwas</h3>
            <p>Come and Take your Dream Home Key.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-30 carousel-image" src={home2} alt="Third slide" />
          <Carousel.Caption>
            <h3 style={{ fontWeight: 'bold', color: '#ffc107' }}>Welcome to ShubhAwas</h3>
            <p>Come and Take your Dream Home Key.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


    <Container
  fluid
  className="mt-4"
  style={{ background: 'linear-gradient(to right,rgb(218, 230, 241),rgb(227, 238, 225))' }}
>
      <h2 className="mb-4 text-center text-primary fw-bold">Properties Listed by Company</h2>

      {/* Search bar */}
      <Row className="mb-4">
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              className="py-3 shadow-sm rounded-pill"
              placeholder="🔎 Search by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Sidebar filters */}
        <Col lg={3} className="mb-4">
          <Card className="p-3 shadow-sm border-0">
            <Card.Title className="text-center text-secondary mb-3">Filters</Card.Title>

            <Form.Group className="mb-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">All types</option>
                {uniqueTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {uniqueCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Min</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min price"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Max</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max price"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location (City)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Mumbai"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area Min (sq.ft)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min area"
                value={areaMin}
                onChange={(e) => setAreaMin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Area Max (sq.ft)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max area"
                value={areaMax}
                onChange={(e) => setAreaMax(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Purpose (Commercial/Residential)</Form.Label>
              <Form.Select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="">All purposes</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
              </Form.Select>
            </Form.Group>
          </Card>
        </Col>

        {/* Properties grid */}
        <Col lg={9}>
          {filteredProperties.length === 0 ? (
            <Alert variant="info" className="text-center shadow-sm">No properties match your filters.</Alert>
          ) : (
            <Row>
              {filteredProperties.map((property) => (
                <Col key={property._id} md={6} xl={6} className="mb-4">
                  <Card className="shadow-lg border-0 h-100">
                    {property.images && property.images.length > 0 ? (
                      <div style={{ height: '400px', cursor: 'pointer' }}>
                        <div
                          id={`carousel-${property._id}`}
                          className="carousel slide h-100"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner h-100">
                            {property.images.map((img, idx) => {
                              const imgSrc = `${API_BASE_URL}/${img.url.startsWith('uploads/') ? img.url : 'uploads/property/' + img.url}`;
                              return (
                                <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''} h-100`}>
                                  <img
                                    src={imgSrc}
                                    alt={img.alt || property.title}
                                    className="d-block w-100 h-100 rounded-top"
                                    style={{ objectFit: 'cover' }}
                                    onClick={() => handleImageClick(imgSrc)}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          {property.images.length > 1 && (
                            <>
                              <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${property._id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                              </button>
                              <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${property._id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-secondary d-flex justify-content-center align-items-center text-white" style={{ height: '230px' }}>
                        No Image
                      </div>
                    )}

                    <Card.Body className="p-3">
                      <Card.Title className="text-dark fs-5 fw-bold mb-3">Description:{property.title}</Card.Title>

                      <ListGroup variant="flush" className="mb-2 small">
                        <ListGroup.Item><strong>Price:</strong> ₹{property.price?.toLocaleString() || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><strong>Type:</strong> {property.propertyType || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><strong>Category:</strong> {property.categoryName || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><strong>Purpose:</strong> {property.purpose || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><strong>Project:</strong> {property.projectName || 'N/A'}</ListGroup.Item>
                        <ListGroup.Item><strong>RERA ID:</strong> {property.reraId || 'N/A'}</ListGroup.Item>
                      </ListGroup>

                      <Card.Text className="small text-muted mb-2">
                        <strong>Bedrooms:</strong> {property.bedrooms} &nbsp;
                        <strong>Bathrooms:</strong> {property.bathrooms} &nbsp;
                        <strong>Balconies:</strong> {property.balconies}
                      </Card.Text>

                      <Card.Text className="small text-muted mb-2">
                        <strong>Area:</strong> {property.area ? `${property.area} sq.ft` : 'N/A'}<br />
                        <strong>Furnishing:</strong> {property.furnishing || 'N/A'}<br />
                        <strong>Maintenance:</strong> {property.maintenance ? `₹${property.maintenance}/month` : 'N/A'}
                      </Card.Text>

                      <Card.Text className="small text-muted mb-2">
                        <strong>Location:</strong> {property.location
                          ? `${property.location.address || ''}, ${property.location.locality || ''}, ${property.location.city || ''}, ${property.location.state || ''} ${property.location.pincode || ''}`
                          : 'N/A'}
                      </Card.Text>

                      {property.amenities && property.amenities.length > 0 && (
                        <div className="mb-2">
                          <strong>Amenities:</strong>
                          <div className="d-flex flex-wrap gap-1">
                            {property.amenities.map((amenity, idx) => (
                              <Badge key={idx} bg="info">{amenity}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Card.Text className="small text-muted mt-2">
                        Listed on: {new Date(property.listedDate).toLocaleDateString()}
                      </Card.Text>
                    </Card.Body>

                    <Card.Footer className="d-flex justify-content-between align-items-center bg-white border-0">
                      <Badge bg={property.status === 'Active' ? 'success' : 'secondary'}>
                        {property.status}
                      </Badge>
                      <Button variant="primary" size="sm" onClick={() => navigate('/contact')}>
                        Contact/Purchase/Visit
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body className="p-0">
          <img src={modalImage} alt="Large View" className="w-100 h-100" style={{ objectFit: 'contain' }} />
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>

 <div className="container my-4 p-3" style={{ borderRadius: '10px' }}>
  
  <div className="row g-4 justify-content-center">
    {/* First Card */}
    <div className="col-12 col-md-6">
      <div
        className="p-4 shadow text-white h-100"
        style={{
          background: 'rgb(236, 231, 231)',
          borderRadius: '12px',
        }}
        
      >
        <img src={Apartments1} style={{width:'100%' , height:'200px', borderRadius:"10px"}}></img>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', color:"grey", fontWeight:"600"}}>
          Our journey began not with listings,{' '}
          <span style={{  fontWeight:"600" }}>
            but with listening. Listening to the frustrations of buyers
          </span>{' '}
          tired of scattered information, to the dreams of sellers looking to
          reach the right audience, and to the heartbeat of the industry that
          craved innovation.{' '}
         {' '}
          properties—it offers possibilities.
        </p>
      </div>
    </div>

    {/* Second Card */}
    <div className="col-12 col-md-6">
      <div
        className="p-4 shadow text-white h-100"
        style={{
          background: 'rgb(235, 230, 230)',
          borderRadius: '12px',
        }}
      >
         <img src={cement } style={{width:'100%' , height:'200px', borderRadius:"10px"}}></img>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.6', color:"grey", fontWeight:"600"}}>
          In a world constantly shifting and growing, where cities rise and
          lifestyles evolve, owning a place to call home remains one of the
          deepest human desires—one that transcends generations, cultures, and
          borders. 
        </p>
      </div>
    </div>
  </div>
 
</div>

 <div className="public-video-container position-relative">
        <video
          src={vid1}
          autoPlay
          muted
          loop
          playsInline
          className="w-100"
          style={{ height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
        />
        <div className="video-overlay-content text-white text-center">
          <h1 className="display-4 fw-bold">Welcome to ShubhAwas</h1>
          <h2 className="display-4 fw-bold">Come and Take your Dream Home Key</h2>
          <p className="lead">Your trusted destination for online Real Estate</p>
          <button className="btn btn-primary mt-3">Explore Now</button>
        </div>
      </div>


    <Footer></Footer>
    </>
  );
}
