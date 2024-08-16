const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');

// Create User
router.post('/', async (req, res) => {
  const { firstName, lastName, email, mobile, roles } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, mobile, roles });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read Users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find().populate('roles');
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('roles', 'name');  // Populate role names
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email, mobile, roles } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, mobile, roles }, { new: true }).populate('roles');
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
