const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection URI
        const uri = 'mongodb://localhost:3000/PcPartPicker';

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
