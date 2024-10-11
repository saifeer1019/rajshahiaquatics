import sequelize from '@/lib/sequelize';
import User from '@/models/User';

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Use force: true to drop existing tables
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();