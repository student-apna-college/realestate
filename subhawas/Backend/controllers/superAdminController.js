// controllers/superAdminController.js
import Property from '../models/Property.js';
// import Order from '../models/Order.js';
import User from '../models/User.js';
import Company from '../models/Company.js';
import bcrypt from "bcryptjs";

export const superAdminController = async (req, res) => {
  const { CompanyId } = req.params;

  try {
    // Count products for the shop
    const productCount = await Product.countDocuments({CompanyId });

    // Fetch all orders for the shop
    const orders = await Order.find({ Company: CompanyId });

    // Filtered stats
    const cancelledOrders = orders.filter(order => order.status === 'Cancelled');
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');

    const cancelledCount = cancelledOrders.length;
    const deliveredCount = deliveredOrders.length;

    const cancelledTotal = cancelledOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const deliveredTotal = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      productCount,
      cancelledCount,
      deliveredCount,
      cancelledTotal,
      deliveredTotal
    });

  } catch (error) {
    console.error('Error fetching company analytics:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already exists' });
   const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({ name, email, password: hashedPassword, role: 'admin' });
  res.status(201).json(admin);
};

export const updateAdmin = async (req, res) => {
  const admin = await User.findById(req.params.id);
  if (!admin || admin.role !== 'admin') return res.status(404).json({ message: 'Admin not found' });
  Object.assign(admin, req.body);
  await admin.save();
  res.json(admin);
};

export const deleteAdmin = async (req, res) => {
  const admin = await User.findById(req.params.id);
  if (!admin || admin.role !== 'admin') return res.status(404).json({ message: 'Admin not found' });
  await admin.deleteOne();
  res.json({ message: 'Admin deleted' });
};

export const createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json(company);
};

export const updateCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: 'company not found' });
  Object.assign(company, req.body);
  await company.save();
  res.json(company);
};

export const deleteCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: 'company not found' });
  await company.deleteOne();
  res.json({ message: 'company deleted' });
};

export const getAllAdmins = async (req, res) => {
  const admins = await User.find({ role: 'admin' }).select('-password');
  res.json(admins);
};

export const getAllCompany = async (req, res) => {
  const Companys = await Company.find().populate('admin', 'name email');
  res.json(Companys);
};

export const getAllProperty = async (req, res) => {
  const products = await Property.find().populate('CompanyId', 'name');
  res.json(products);
};