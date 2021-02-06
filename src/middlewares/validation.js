const jwt = require('jsonwebtoken');
const { JwtError } = require('../errors/');

function verifyJWT(req, res, next) {
  try {
    let token = req.header('Authorization');

    const split = token.split(' ');
    token = split[1];

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    if (err instanceof JwtError) res.status(403).send('Failed to authenticate token.');
    else res.sendStatus(500);
  }
}

module.exports = { verifyJWT };
