import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the MongoDB database:', error);
  });

export { mongoose };
