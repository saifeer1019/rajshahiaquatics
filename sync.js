const sequelize = require('./src/lib/sequelize'); // Adjust the path as necessary
const Review = require('./src/models/Reviews'); // Adjust the path as necessary

// Sync the database
sequelize.sync()
    .then(() => {
        console.log('Reviews table created successfully!');
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    });