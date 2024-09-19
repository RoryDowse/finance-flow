import { Income } from '../models/index.js';
// Seed incomes with additional fields: description and date
export const seedIncomes = async () => {
    await Income.bulkCreate([
        {
            amount: 5000,
            description: 'Salary for June 2024',
            date: new Date('2024-06-30'),
            assignedUserId: 1,
        },
        {
            amount: 3000,
            description: 'Freelance project payment',
            date: new Date('2024-07-15'),
            assignedUserId: 2,
        },
        // Add more income records as needed...
    ]);
};
