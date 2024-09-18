import { Income } from '../models/index.js';

export const seedIncomes = async () => {
  await Income.bulkCreate([
    {
      amount: 5000,
      assignedUserId: 1, // Ensure the UUID generated for the user matches this in a real scenario
    },
    {
      amount: 3000,
      assignedUserId: 2,
    },
    // Add more income records...
  ]);
};
