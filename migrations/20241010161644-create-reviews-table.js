// migrations/XXXXXX-create-reviews-table.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('reviews', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userEmail: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            productId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reviewScore: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
            },
            reviewText: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('reviews');
    }
};