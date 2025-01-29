import express from 'express';
import verifyToken from '../../middlewares/verify-token.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  res.json({
    message: 'Ini adalah akses terlindungi',
    user: req.user, // Data pengguna yg terverifikasi
  })
})

export default router;