import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// export const sequelize = new Sequelize('cashflow_db', 'postgres', 'new-password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     dialectOptions: {
//       decimalNumbers: true,
//     },
//   });
export const sequelize =
process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_URL:', process.env.DB_URL);