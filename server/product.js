const { Sequelize, DataTypes } = require('sequelize');
const seedData = require('./seed.js'); // Import seed data

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mydatabase.db', // Specify your database file
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Default quantity is 0
  },
});

// Function to initialize the database and insert seed data
const initializeDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
    await Product.bulkCreate(seedData);
    console.log('Database initialized with seed data.');
  } catch (error) {
    console.error('Error initializing the database:', error.message);
  }
};

module.exports = {
  Product,
  initializeDatabase, // Export the initialization function
};
