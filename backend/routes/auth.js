const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Role = require('../models/Role');

router.post('/login', async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email and populate roles
        const user = await User.findOne({ email }).populate('roles');

        if (!user) {
            // If user is not found, respond with an appropriate message
            return res.status(404).json({ message: "User not found" });
        }

        // Collect permissions from roles
        let permissions = [];
        for (const role of user.roles) {
            // Find the role by ID and get permissions
            const roleDoc = await Role.findById(role._id);
            if (roleDoc) {
                permissions = [...permissions, ...roleDoc.permissions];
            }
        }

        // Print permissions to the console
        // console.log('Permissions:', permissions);

        // Send permissions to frontend
        res.status(200).json({ permissions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
