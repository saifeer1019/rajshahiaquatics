// models/Review.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize'); // Adjust the path as necessary

class Review extends Model {}

Review.init({
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.STRING, // Assuming product._id is a string
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews', // Name of the table in the database
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Review;