const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, // add this to handle deprecation warning for `findAndModify`
      // useCreateIndex: true, // add this to handle deprecation warning for `createIndex`
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
