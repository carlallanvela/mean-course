const jwt = require('jsonwebtoken');

// Express Middleware: Executed on request
module.exports = (req, res, next) => {
  try {
    // Get token from Bearer [token]
    const token = req.headers.authorization.split(' ')[1];
    // Verify token with secret
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
}
