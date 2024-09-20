import { Expense } from '../models/index.js';
export const seedExpenses = async () => {
    await Expense.bulkCreate([
        {
            amount: 1500,
            description: 'Rent',
            priority: 'High',
            date: new Date('2024-09-01'),
            assignedUserId: 1,
        },
        {
            amount: 200,
            description: 'Groceries',
            priority: 'Medium',
            date: new Date('2024-09-01'),
            assignedUserId: 2,
        },
        {
            amount: 100,
            description: 'Utilities',
            priority: 'High',
            date: new Date('2024-09-01'),
            assignedUserId: 1,
        },
        {
            amount: 75,
            description: 'Internet Bill',
            priority: 'Medium',
            date: new Date('2024-09-01'),
            assignedUserId: 2,
        },
        {
            amount: 50,
            description: 'Transportation',
            priority: 'Low',
            date: new Date('2024-09-01'),
            assignedUserId: 1,
        },
        {
            amount: 30,
            description: 'Entertainment Subscription',
            priority: 'Low',
            date: new Date('2024-09-01'),
            assignedUserId: 2,
        }
    ]);
};
