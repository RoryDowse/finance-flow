import { Expense } from '../models/expenses.js';
import { User } from '../models/user.js';
export const getAllExpenses = async (_req, res) => {
    try {
        const expenses = await Expense.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        res.json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getExpenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'assignedUser', // This should match the alias defined in the association
                    attributes: ['username'], // Include only the username attribute
                },
            ],
        });
        if (expense) {
            res.json(expense);
        }
        else {
            res.status(404).json({ message: 'Expense not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const createExpense = async (req, res) => {
    const { amount, description, priority, date, assignedUserId } = req.body;
    try {
        const newExpense = await Expense.create({ amount, description, priority, date, assignedUserId });
        res.status(201).json(newExpense);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, priority, date, assignedUserId } = req.body;
    try {
        const expense = await Expense.findByPk(id);
        if (expense) {
            expense.amount = amount;
            expense.description = description;
            expense.priority = priority;
            expense.date = date;
            expense.assignedUserId = assignedUserId;
            await expense.save();
            res.json(expense);
        }
        else {
            res.status(404).json({ message: 'Expense not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);
        if (expense) {
            await expense.destroy();
            res.json({ message: 'Expense deleted' });
        }
        else {
            res.status(404).json({ message: 'Expense not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getTotalExpenses = async (_req, res) => {
    try {
        const expenses = await Expense.findAll();
        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        res.json({ totalExpenses });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
