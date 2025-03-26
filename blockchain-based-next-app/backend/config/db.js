const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Suppress the warning about strictQuery
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB at:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected Successfully!');
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
  } catch (err) {
    console.error('MongoDB connection error details:', err);
    process.exit(1);
  }
};

module.exports = connectDB;