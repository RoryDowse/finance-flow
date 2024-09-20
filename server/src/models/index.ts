import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
console.log('DB_NAME:', process.env.DB_NAME);
console.log('Working directory:', process.cwd());

import { sequelize } from '../config/connection.js';
import { UserFactory } from './user.js';
import { IncomeFactory } from './income.js';
import { ExpenseFactory } from './expenses.js';

const User = UserFactory(sequelize);
const Income = IncomeFactory(sequelize);
const Expense = ExpenseFactory(sequelize);

User.hasMany(Income, { foreignKey: 'assignedUserId', as: 'incomes' });
Income.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

User.hasMany(Expense, { foreignKey: 'assignedUserId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

export { sequelize, User, Income, Expense };
