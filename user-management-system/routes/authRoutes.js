// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();


router.post('/register', auth(['Admin']), register);


router.post('/login', login);

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io', 
            port: 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: 'no-reply@yourdomain.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Reset your password using this link: http://yourdomain.com/reset-password/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Password reset link sent');
    } catch (error) {
        res.status(500).send('Server error');
    }
});


router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).send('User not found');

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).send('Password reset successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
