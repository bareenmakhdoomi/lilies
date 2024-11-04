const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 

const app = express();
app.use(express.json());


const mongoURI = 'MONGODB_URI=mongodb://BareenAltaf:Bareen123@localhost:27017/user_management_system'; 


mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + mongoURI);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


app.use('/api', userRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
