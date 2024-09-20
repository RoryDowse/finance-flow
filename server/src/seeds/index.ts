import { seedUsers } from './user-seeds.js';
import { seedIncomes } from './income-seeds.js';
import { seedExpenses } from './expense-seeds.js';
import { sequelize } from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    // Sync the database and drop/recreate all tables
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Seed Users
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    // Seed Income
    await seedIncomes();
    console.log('\n----- INCOME SEEDED -----\n');

    // Seed Expenses
    await seedExpenses();
    console.log('\n----- EXPENSES SEEDED -----\n');

    // Exit the process after successful seeding
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seedAll function
seedAll();
