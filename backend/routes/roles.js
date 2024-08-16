const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Create Role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read Roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Role
router.put('/:id', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Role
router.delete('/:id', async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
