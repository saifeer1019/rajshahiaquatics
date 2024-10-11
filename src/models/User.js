   // models/User.js
   import { DataTypes } from 'sequelize'; // Use ES6 import if your project supports it
   import sequelize from '../lib/sequelize'; // Ensure this path is correct

   const User = sequelize.define('User', {
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
     email: {
       type: DataTypes.STRING,
       unique: true,
       allowNull: false,
     },
   });

   export default User;