import { Model, DataTypes } from 'sequelize';
import sequelize from '@/lib/sequelize'; // Adjust the path to your Sequelize instance

class Order extends Model {}

Order.init({
    Name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    City: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Phone: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    'Payment Method': { // Use quotes to handle spaces in column names
        type: DataTypes.TEXT,
        allowNull: false,
    },
    'Payment Status': { // Use quotes to handle spaces in column names
        type: DataTypes.TEXT,
        allowNull: false,
    },
    'Product Name': { // Use quotes to handle spaces in column names
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Price: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    'Order Date': { // Use quotes to handle spaces in column names
        type: DataTypes.DATE,
        allowNull: false,
    },
    OrderId: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Order',
    tableName: 'Orders', // Ensure this matches your table name
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
});

export default Order;