import express from 'express';
import 'dotenv/config';
import connection from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const { identityNumber, password } = req.body;
  try {
    const query = 'SELECT * FROM student WHERE identity_number = ?';
    const [result] = await connection.query(query, [identityNumber]);

    const isValidPassword = bcrypt.compareSync(password, result[0]['password']);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Wrong Password', statusCode: 401 });
    }
    
    const token = jwt.sign({ id: result[0]['id'], identityNumber: result[0]['identity_number']}, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ message: 'Login succesfully', statusCode: 200, user: result[0], token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;