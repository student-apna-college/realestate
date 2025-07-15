import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Footer from './Footer';
import imageCompression from 'browser-image-compression';
import 'bootstrap/dist/css/bootstrap.min.css';

// export default function ProductCreate() {
//   const [shopId, setShopId] = useState('');
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     price: '',
//     quantity: 1,
//     category: '',
//     subCategory: '',
//     unit: '',
//     image: null,
//   });
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     const fetchShopId = async () => {
//       try {
//         const { data: user } = await axios.get('/api/auth/me');
//         const { data: details } = await axios.get(`/api/admin/${user._id}/details`);
//         setShopId(details.shop._id);
//       } catch (error) {
//         console.error('Failed to fetch shopId:', error);
//       }
//     };
//     fetchShopId();
//   }, []);

//   const handleChange = async (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image' && files.length > 0) {
//       const imageFile = files[0];
//       const options = {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 1920,
//         useWebWorker: true
//       };
//       try {
//         const compressedBlob = await imageCompression(imageFile, options);
//         const compressedFile = new File([compressedBlob], imageFile.name, {
//           type: compressedBlob.type,
//           lastModified: Date.now()
//         });
//         setForm((prev) => ({ ...prev, image: compressedFile }));
//         setImagePreview(URL.createObjectURL(compressedFile));
//       } catch (error) {
//         console.error('Compression failed:', error);
//       }
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: '',
//       description: '',
//       price: '',
//       quantity: 1,
//       category: '',
//       subCategory: '',
//       unit: '',
//       image: null
//     });
//     setImagePreview(null);
//     document.getElementById('image').value = '';
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!shopId) return alert("Shop ID not loaded yet.");
//     if (!form.image) return alert("Please upload a product image.");

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null && value !== '') formData.append(key, value);
//     });
//     formData.append('shopId', shopId);

//     try {
//       await axios.post('/api/products/', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       alert('Product created!');
//       resetForm();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to create product');
//     }
//   };

//   return (
//     <div className="bg-dark text-white min-vh-100 d-flex flex-column">
//       <div className="container py-5 flex-grow-1">
//         <div className="card bg-secondary text-white p-4 shadow-lg">
//           <h2 className="text-center mb-4">🛍️ Create Product</h2>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">Product Name</label>
//                 <input type="text" name="name" value={form.name} onChange={handleChange} required className="form-control bg-dark text-white border-light" />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Price (₹)</label>
//                 <input type="number" name="price" value={form.price} onChange={handleChange} required className="form-control bg-dark text-white border-light" />
//               </div>

//               <div className="col-12">
//                 <label className="form-label">Description</label>
//                 <textarea name="description" value={form.description} onChange={handleChange} rows={3} required className="form-control bg-dark text-white border-light" />
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Quantity</label>
//                 <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min={1} className="form-control bg-dark text-white border-light" />
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Category</label>
//                 <select name="category" value={form.category} onChange={handleChange} required className="form-select bg-dark text-white border-light">
//                   <option value="">Select</option>
//                   <option>Grocery</option><option>Clothing</option><option>Electronics</option><option>Construction</option>
//                 </select>
//               </div>

//               <div className="col-md-4">
//                 <label className="form-label">Sub Category</label>
//                 <select name="subCategory" value={form.subCategory} onChange={handleChange} className="form-select bg-dark text-white border-light">
//                   <option value="">Select</option>
//                   <option>Men</option><option>Women</option><option>Kids</option><option>Others</option>
//                 </select>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Unit</label>
//                 <select name="unit" value={form.unit} onChange={handleChange} className="form-select bg-dark text-white border-light">
//                   <option value="">Select</option>
//                   <option>kg</option><option>piece</option><option>litre</option><option>others</option>
//                 </select>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Product Image</label>
//                 <input type="file" name="image" id="image" accept="image/*" onChange={handleChange} required className="form-control bg-dark text-white border-light" />
//               </div>

//               {imagePreview && (
//                 <div className="col-12">
//                   <label className="form-label">Image Preview</label><br />
//                   <img src={imagePreview} alt="Preview" className="img-thumbnail bg-dark border border-light" style={{ maxWidth: '200px' }} />
//                 </div>
//               )}

//               <div className="col-12 mt-3">
//                 <button type="submit" className="btn btn-warning w-30 fw-bold" disabled={!shopId}>
//                   <i className="bi bi-upload me-2"></i>Upload Product
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }








export default function PropertyCreate() {
  const [companyId, setCompanyId] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    propertyType: '',
    purpose: '',
    price: '',
    maintenance: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnishing: '',
    parking: '',
    amenities: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    lat: '',
    lng: '',
    projectName: '',
    reraId: '',
    availableFrom: '',
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const { data: user } = await axios.get('/api/auth/me');
        const { data: details } = await axios.get(`/api/admin/${user._id}/details`);
        setCompanyId(details.company._id);
      } catch (error) {
        console.error('Failed to fetch companyId:', error);
      }
    };
    fetchCompanyId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = async (e) => {
    const files = Array.from(e.target.files);
    const compressedImages = [];
    const previewsArray = [];

    for (const file of files) {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      try {
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, {
          type: compressedBlob.type,
          lastModified: Date.now(),
        });
        compressedImages.push(compressedFile);
        previewsArray.push(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('❌ Image compression failed:', error);
      }
    }

    setImages(compressedImages);
    setPreviews(previewsArray);
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      propertyType: '',
      purpose: '',
      price: '',
      maintenance: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      balconies: '',
      furnishing: '',
      parking: '',
      amenities: '',
      address: '',
      locality: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
      lat: '',
      lng: '',
      projectName: '',
      reraId: '',
      availableFrom: '',
    });
    setImages([]);
    setPreviews([]);
    document.getElementById('images').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔎 Submitting form...");
    console.log("Company ID:", companyId);
    console.log("Form values:", form);

    if (!companyId) {
      console.error("❌ Company ID not loaded");
      return alert('Company ID not loaded yet.');
    }
    if (images.length === 0) {
      console.error("❌ No images uploaded");
      return alert('Please upload property images.');
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formData.append(key, value);
      } else {
        console.warn(`⚠️ Field "${key}" is empty or missing`);
      }
    });
    images.forEach((img) => formData.append('images', img));

    // ✅ Send correct field matching backend: company
    formData.append('companyId', companyId);

    console.log("✅ FormData keys being sent:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await axios.post('/api/property/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Property created successfully!');
      resetForm();
    } catch (error) {
      console.error("❌ Submission error:", error.response?.data || error);
      alert(error.response?.data?.message || '❌ Failed to create property');
    }
  };

  return (
    <div className="bg-dark text-primary min-vh-100 d-flex flex-column">
      <div className="container py-5 flex-grow-1">
        <div className="card glassmorphic-bg text-primary p-4 shadow-lg border-light">
          <h2 className="text-center mb-4">🏡 Create Property Listing</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-4">

              <div className="col-md-6">
                <label className="form-label text-primary">Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} required className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">Property Type</label>
                <select name="propertyType" value={form.propertyType} onChange={handleChange} required className="form-select bg-dark text-primary border-light">
                  <option value="">Select</option>
                  <option>Apartment</option><option>Independent House</option><option>Villa</option><option>Plot</option>
                  <option>Commercial Office</option><option>Shop</option><option>Warehouse</option><option>Other</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Purpose</label>
                <select name="purpose" value={form.purpose} onChange={handleChange} required className="form-select bg-dark text-primary border-light">
                  <option value="">Select</option><option>Sale</option><option>Rent</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Price (₹)</label>
                <input type="text" name="price" value={form.price} onChange={handleChange} required className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Maintenance (₹/month)</label>
                <input type="number" name="maintenance" value={form.maintenance} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Area (sq.ft.)</label>
                <input type="number" name="area" value={form.area} onChange={handleChange} required className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Bedrooms</label>
                <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Bathrooms</label>
                <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Balconies</label>
                <input type="number" name="balconies" value={form.balconies} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Furnishing</label>
                <select name="furnishing" value={form.furnishing} onChange={handleChange} className="form-select bg-dark text-primary border-light">
                  <option value="">Select</option><option>Unfurnished</option><option>Semi-Furnished</option><option>Fully-Furnished</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Parking</label>
                <input type="number" name="parking" value={form.parking} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">Amenities (comma-separated)</label>
                <input type="text" name="amenities" value={form.amenities} onChange={handleChange} placeholder="e.g., Lift, Gym, Pool" className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-12">
                <label className="form-label text-primary">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-12">
                <label className="form-label text-primary">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={2} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Locality</label>
                <input type="text" name="locality" value={form.locality} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">City</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">State</label>
                <input type="text" name="state" value={form.state} onChange={handleChange} required className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Pincode</label>
                <input type="text" name="pincode" value={form.pincode} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-4">
                <label className="form-label text-primary">Coordinates (lat, lng)</label>
                <input type="text" name="lat" value={form.lat} onChange={handleChange} placeholder="Latitude" className="form-control bg-dark text-primary border-light mb-2" />
                <input type="text" name="lng" value={form.lng} onChange={handleChange} placeholder="Longitude" className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">Project Name</label>
                <input type="text" name="projectName" value={form.projectName} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">RERA ID</label>
                <input type="text" name="reraId" value={form.reraId} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">Available From</label>
                <input type="date" name="availableFrom" value={form.availableFrom} onChange={handleChange} className="form-control bg-dark text-primary border-light" />
              </div>

              <div className="col-md-6">
                <label className="form-label text-primary">Property Images</label>
                <input type="file" name="images" id="images" accept="image/*" onChange={handleImages} multiple required className="form-control bg-dark text-primary border-light" />
              </div>

              {previews.length > 0 && (
                <div className="col-12">
                  <label className="form-label text-primary">Image Previews</label>
                  <div className="d-flex flex-wrap gap-2">
                    {previews.map((src, idx) => (
                      <img key={idx} src={src} alt="Preview" className="img-thumbnail bg-dark border border-light" style={{ maxWidth: '150px' }} />
                    ))}
                  </div>
                </div>
              )}

              <div className="col-12 mt-3">
                <button type="submit" className="btn btn-success w-30 fw-bold" disabled={!companyId}>
                  <i className="bi bi-upload me-2"></i>Upload Property
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
