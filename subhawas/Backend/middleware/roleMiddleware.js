export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role.toLowerCase())) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
