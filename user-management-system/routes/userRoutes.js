const express = require('express');
const { userDashboard, adminDashboard, fetchUserOrders } = require('../controllers/userController');
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/user-dashboard', auth(['User', 'Admin']), userDashboard);
router.get('/admin-dashboard', auth(['Admin']), adminDashboard);
router.get('/orders', auth(['User', 'Admin']), fetchUserOrders);


router.post('/update-profile', auth(['User', 'Admin']), async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.user.id; 

    try {
        const updateData = { username, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});


router.delete('/delete-account', auth(['User', 'Admin']), async (req, res) => {
    const userId = req.user.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Account deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});

module.exports = router;
