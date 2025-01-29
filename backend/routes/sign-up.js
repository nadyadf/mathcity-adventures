import e from "express";
import connection from "../db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = e.Router();

router.post('/', async (req, res) => {
  const { identityNumber, password } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, 10);

  const initialCandy = 250;
  try {
    const findStudent = 'SELECT * FROM student WHERE is_registered = 0 AND identity_number = ?';
    let student = await connection.query(findStudent, [identityNumber]);
    if (student[0].length === 0) {
      return res.status(409).json({ message: 'Student already registered', statusCode: 409});
    } 
    
    const query = 'UPDATE student set is_registered = 1, candy = ?, password = ? WHERE identity_number = ?';
    const [result] = await connection.query(query, [initialCandy, encryptedPassword, identityNumber]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found', statusCode: 404 });
    }

    const queryStudent = `SELECT * FROM student WHERE identity_number = ${identityNumber}`;
    [student] = await connection.query(queryStudent);
    const token = jwt.sign({ id: student[0]['id'], identityNumber: student[0]['identity_number']}, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ message: 'Registration succesfully', statusCode: 200, user: student[0], token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});

export default router;