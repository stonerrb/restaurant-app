const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://babrerushabh1:7uKa7CEwCzsTRWJ7@restaurant.tb5zhqn.mongodb.net/",
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB.');
}); 

module.exports = mongoose;