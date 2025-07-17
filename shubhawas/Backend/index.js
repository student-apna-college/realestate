// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// import Cart from "./routes/cart.js";
import superAdminRoute from "./routes/superAdminRoute.js";
import companyRegisterRoute from "./routes/companyRegisterRoute.js"
import helmet from "helmet";
import contactRoute from "./routes/contactRoute.js"




dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT 
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));


app.use(
  cors({
   origin: ['http://localhost:5173', 'https://realestate-1-nqdb.onrender.com'],
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/companys", companyRoutes);
app.use("/api/property", propertyRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/cart", Cart);
app.use("/api/superadmin", superAdminRoute);
app.use("/shop/ragister" , companyRegisterRoute)
app.use('/api/superadmin', superAdminRoute);
app.use('/api', contactRoute);


app.use("/uploads/company-images", express.static("uploads/company-images"));

app.use('/uploads/property', express.static('uploads/property'));


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
