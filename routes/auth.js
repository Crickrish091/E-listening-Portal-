const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret_key';
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password, role });
    await user.save();
    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
