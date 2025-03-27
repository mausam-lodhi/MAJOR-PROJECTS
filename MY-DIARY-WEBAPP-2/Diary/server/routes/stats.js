const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Entry = require('../models/Entry');

router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const entryCount = await Entry.countDocuments();
    
    res.json({
      userCount,
      entryCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;