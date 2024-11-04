const Order = require('../models/Order');

// Fetch user orders
const fetchUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; 
        const orders = await Order.find({ user: userId }); 

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }

        res.status(200).json({ orders }); 
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};


const userDashboard = (req, res) => {
    res.status(200).json({ message: 'User dashboard' });
};

const adminDashboard = (req, res) => {
    res.status(200).json({ message: 'Admin dashboard' });
};

module.exports = {
    userDashboard,
    adminDashboard,
    fetchUserOrders,
};
