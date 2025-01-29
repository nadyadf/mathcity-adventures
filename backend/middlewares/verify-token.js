import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({ message: 'Token tidak diberikan' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }

    req.user = decoded;
    next();
  })
}

export default verifyToken;