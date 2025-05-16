const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: 'Unauthorized: no active session' });
    }
  
    next();
  };
  
  module.exports = requireAuth;
  