const jwt = require('jsonwebtoken');

// Express Middleware: Executed on request
module.exports = (req, res, next) => {
  try {
    // Get token from Bearer [token]
    const token = req.headers.authorization.split(' ')[1];
    // Verify token with secret
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    // Express.js let's us add data in request
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not authenticated!'
    });
  }
}
