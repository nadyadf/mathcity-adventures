import express from 'express';
import connection from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM student';
    const [result] = await connection.query(query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search/:identityNumber', async (req, res) => {
  try {
    const { identityNumber } = req.params;
    const query = 'SELECT * FROM student WHERE identity_number = ?';
    const [result] = await connection.query(query, [identityNumber]);

    if (result.length === 0) {
      return res.status(404).json({
        message: 'Student not found',
        statusCode: 404,
      });
    }

    res.json({ 
      message: 'Student is available',
      statusCode: 200,
      data: result[0]
    });
  } catch(err) {
    console.log('error')
    res.status(500).json({ error: err.message});
  }
});

router.get('/gallery/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const query = 'SELECT g.spot_name, g.picture_url, g.city_id, g.type FROM student_gallery sg INNER JOIN gallery g on sg.gallery_id = g.id WHERE student_id = ?';
    const result = await connection.query(query, [studentId]);

    if(result[0].length === 0) {
      return res.status(404).json({ statusCode: 404, message: 'The student do not have any picture'});
    }

    res.json({ statusCode: 200, result: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:identityNumber', async (req, res) => {
  const { identityNumber } = req.params;

  const { nickName, avatarUrl } = req.body;

  try {
    const [result] = await connection.query('UPDATE student set nick_name = ?, avatar_url = ?, is_setup = 1 WHERE identity_number = ?', [nickName, avatarUrl, identityNumber]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found'});
    }
    res.status(200).json({ message: 'Student updated succesfully', statusCode: 200});
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:studentId/total-exp', async (req, res) => {
  try {
    const { studentId } = req.params;

    const query = 'SELECT SUM(exp) AS total_exp FROM student_exp WHERE student_id = ?';
    const result = await connection.query(query, [studentId]);
    res.json({ result: result[0][0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:studentId/:cityId', async (req, res) => {
  try {
    const { studentId, cityId } = req.params;

    const query = 'SELECT * FROM student_exp WHERE student_id = ? AND city_id = ?';
    const result = await connection.query(query, [studentId, cityId]);
    res.json({ data: result[0][0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const query = 'SELECT s.nick_name, s.avatar_url, SUM(se.exp) AS total_exp FROM student_exp se INNER JOIN student s on se.student_id = s.id GROUP BY s.id HAVING total_exp > 0 ORDER BY total_exp DESC';
    const result = await connection.query(query);
    console.log(result)
    res.json({ data: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:studentId/buy-city', async (req, res) => {
  const { studentId } = req.params;
  const { cityId } = req.body;
  try {
    const query = 'UPDATE student_exp SET is_locked = 0 WHERE student_id = ? AND city_id = ?'
    const result = await connection.query(query, [studentId, cityId]);

    res.json({result: result[0], message: 'City unlocked', studentId, cityId});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;