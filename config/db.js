const mongoose = require('mongoose');

const connect = async () => {
  const link = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${link.connection.host}`);
};

module.exports = connect;
