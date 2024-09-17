import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { IncomeFactory } from './income';
import { ExpenseFactory } from './expenses';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Income = IncomeFactory(sequelize);
const Expense = ExpenseFactory(sequelize);

User.hasMany(Income, { foreignKey: 'userId', as: 'incomes' });
Income.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Expense, { foreignKey: 'userId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Income, Expense };
