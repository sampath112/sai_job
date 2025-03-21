const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    { id, type: 'Bearer' }, // Add token type
    process.env.JWT_SECRET,
    {
      expiresIn: '30d', // Consider reducing for production (e.g., '1h')
      issuer: 'JobPortalAPI', // Identify who issues the token
      audience: 'JobPortalAdmin', // Identify the intended audience
    }
  );
};

module.exports = generateToken;
