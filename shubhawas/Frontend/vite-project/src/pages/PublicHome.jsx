import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './All.css';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
  Pagination,
  Carousel,
  Form,
} from 'react-bootstrap';
import m1 from '../images/rgba.jpg';
import home from '../images/home.jpg';
import home1 from '../images/home1.jpg';
import home2 from '../images/home2.jpg';
import badarpur from '../images/badarpur.jpg'
import cements from '../images/cement.jpg'
import fraud from '../images/fraud.jpg'
import independent from '../images/Independent Houses indian.jpg';
import vid5 from '../images/vid4.mp4'
import Footer from './Footer';



export default function PublicHome() {
  const [companys, setcompanys] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const companysPerPage = 9;

  useEffect(() => {
    axios
      .get('/api/companys/all')
      .then((res) => setcompanys(res.data))
      .catch((err) => console.error('Error fetching companys:', err));
  }, []);

  const categories = [...new Set(companys.map((company) => company.category).filter(Boolean))];
  const locations = [...new Set(companys.map((company) => company.location).filter(Boolean))];

  const  handlecompanyClick = (companyId) => navigate(`/company/${companyId}`);

  const filteredcompanys = companys.filter((company) => {
    const keyword = searchKeyword.toLowerCase();
    const matchesSearch =
      company.name?.toLowerCase().includes(keyword) ||
      company.admin?.name?.toLowerCase().includes(keyword) ||
      company.category?.toLowerCase().includes(keyword) ||
      company.location?.toLowerCase().includes(keyword);
    const matchesCategory = selectedCategory ? company.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const indexOfLast = currentPage * companysPerPage;
  const indexOfFirst = indexOfLast - companysPerPage;
  const currentcompanys = filteredcompanys.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredcompanys.length / companysPerPage);

  

  return (
    <div
      style={{
        background: 'linear-gradient(to right,rgb(226, 227, 233),rgb(238, 236, 222))',
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      {/* Carousel Banner */}
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img className="d-block w-30 carousel-image" src={home} alt="First slide" />
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


    





      <Container className="py-4">
        <h2 className="text-center mb-3 fw-bold text-uppercase" style={{ color: 'gray' }}>
          Welcome to SubhAwas  <span style={{ color: 'orange' }}>– Your Gateway to Dream Homes</span>
        </h2>
        <h4 className="text-center mb-5 fw-light" style={{ color: 'gray' }}>
          Discover premium residential plots, apartments, and commercial properties in your city.  <span style={{ color: 'blue' }}>At SubhAwas, we turn your vision of a perfect home into reality with trusted services and unmatched expertise in real estate.</span>
        </h4>



         <h4 className="text-center mb-5 fw-light" style={{ color: 'gray' }}>
          We have listed Indies Best Compines in RealEstate market  <span style={{ color: 'blue' }}>Our Preiroty to serve better.</span>
        </h4>

        <Row>
          {/* Sidebar Filters */}
          <Col md={3} className="mb-4">
            <div className="filter-box">
              <h5 className=" mb-3" style={{ color: 'black' }}>Filters</h5>

              {/* Search */}
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search company, owner, category, location..."
                  value={searchKeyword}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Button variant="outline-light" onClick={() => setSearchKeyword('')}>
                  ✕
                </Button>
              </InputGroup>

              {/* Category Filter */}
              <Form.Label style={{ color: 'gray' }}>Category</Form.Label>
              <Form.Select
                className="mb-3"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>

              {/* Location Filter */}
              <Form.Label style={{ color: 'gray' }}>Location</Form.Label>
              <Form.Select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Form.Select>
            </div>
          </Col>

          {/* company Cards */}
          <Col md={9}>
            <Row>
              {currentcompanys.map((company) => (
                <Col key={company._id} xs={12} sm={6} md={4} className="mb-4">
                  <Card onClick={() => handlecompanyClick(company._id)} className="company-card cursor-pointer shadow-sm">
                    {company.image && (
                      <Card.Img
                        variant="top"
                        src={`http://localhost:5000/uploads/company-images/${company.image}`}
                        alt={company.name}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    )}
                   <Card.Body>
  <Card.Title>{company.name}</Card.Title>
  <Card.Text>Owner: {company.admin?.name || 'Unknown'}</Card.Text>
  <Card.Text>Category: {company.category || 'N/A'}</Card.Text>
  <Card.Text>Location: {company.location || 'Unknown'}</Card.Text>

  {/* ★★★★☆ Rating */}
  <div className="star-rating mb-2">
    <span className="fa fa-star checked"></span>
    <span className="fa fa-star checked"></span>
    <span className="fa fa-star checked"></span>
    <span className="fa fa-star checked"></span>
    <span className="fa fa-star"></span>
  </div>

  <Button
    variant="warning"
    className="w-30"
    onClick={(e) => {
      e.stopPropagation();
      handlecompanyClick(company._id);
    }}
  >
    View company
  </Button>
</Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <Pagination className="justify-content-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>




       <div className="container-home" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="logo-section" style={{ flex: 1, padding: '20px' }}>
    <img src={cements} alt="Home Logo" style={{ width: '100%', maxWidth: '800px' , borderRadius:"5px"}} />
  </div>
  <div className="logo-content" style={{ flex: 1, padding: '20px' , color:"black"}}>
    <h1>Welcome to SubhAwas</h1>
    <p>Your trusted partner in real estate solutions. Discover plots, apartments, and commercial properties tailored to your needs.At Shubhawas, we believe a home is more than just walls — it’s where life’s best moments unfold. Whether you’re looking for a modern apartment, a luxurious villa, or a cozy family house, we offer thoughtfully designed properties in vibrant communities.With a commitment to quality construction, transparent processes, and dedicated support, Shubhawas makes your journey to owning your dream home smooth and stress-free.</p>
  </div>
</div>





       <div className="container-home" style={{ display: 'flex', alignItems: 'center'}}>
  
  <div className="logo-content" style={{ flex: 1, padding: '20px' , color:"black"}}>
    <h1>Shubhawas: Building Homes, Creating Memories</h1>
    <p>At Shubhawas, we understand that a home isn’t just a physical space; it’s where your stories begin. That’s why we create thoughtfully planned residential communities designed for modern living. With lush green spaces, modern amenities, and sustainable design practices, our projects are crafted to enhance your lifestyle.

Whether you’re buying your first home or upgrading to a luxurious villa, we promise a seamless experience from start to finish.</p>
  </div>

  <div className="logo-section" style={{ flex: 1, padding: '20px' }}>
    <img src={badarpur} alt="Home Logo" style={{ width: '100%', maxWidth: '800px' , borderRadius:"5px"}} />
  </div>
</div>





       <div className="container-home" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="logo-section" style={{ flex: 1, padding: '20px' }}>
    <img src={independent} alt="Home Logo" style={{ width: '100%', maxWidth: '800px' , borderRadius:"5px"}} />
  </div>
  <div className="logo-content" style={{ flex: 1, padding: '20px' , color:"black"}}>
    <h1>Welcome to SubhAwas</h1>
    <p>Why Choose Shubhawas?</p>
      <p> <span>Quality Craftsmanship:</span> We use only premium materials and follow strict construction standards, ensuring every home stands the test of time.</p>

<p><span> Prime Locations:</span> Our projects are strategically located with easy access to schools, hospitals, companyping centers, and transport hubs.</p>

<p><span>Transparent Process:</span> From planning to possession, we keep you informed every step of the way, with no hidden charges.</p>

<p> <span>Personalized Service: </span>Our experienced team is dedicated to helping you choose the perfect property that matches your needs and budget.</p>
  </div>
</div>



       <div className="container-home" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="logo-section" style={{ flex: 1, padding: '20px' }}>
    <img src={fraud} alt="Home Logo" style={{ width: '100%', maxWidth: '800px' , borderRadius:"5px"}} />
  </div>
  <div className="logo-content" style={{ flex: 1, padding: '20px' , color:"black"}}>
    <h1>Welcome to SubhAwas</h1>
    <p>Real estate fraud is rising, and innocent buyers are often the target. From fake documents to false promises, scammers use many tricks to cheat people out of their life savings.</p>

<p>Common red flags to watch out for:</p>
<p> Unbelievable deals that seem “too good to be true.”</p>
<p> Sellers refusing to show property documents or asking for urgent payments.</p>
<p> Agents avoiding site visits or pressuring you to sign quickly.</p>
<p>Properties sold with disputed titles or legal issues.</p>
  </div>
</div>
      

    <div className="public-video-container position-relative">
  <video
    src={vid5}
    autoPlay
    muted
    loop
    playsInline
    className="w-100"
    style={{ height: '400px', objectFit: 'cover' }}
  />

  <div className="video-overlay-content text-white text-center">
    <h1 className="display-4 fw-bold">Welcome to ShubhAwas</h1>
    <h2 className="display-4 fw-bold">Come and Take your Dream Home Key</h2>
    <p className="lead">Your trusted destination for online Real Estate</p>
    <button className="btn btn-primary mt-3">Explore Now</button>
  </div>
</div>


      <Footer />
    </div>
  );
}
