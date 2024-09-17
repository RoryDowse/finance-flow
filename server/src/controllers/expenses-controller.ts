import { Request, Response } from 'express';
import { Expense } from '../models/expenses';
import { User } from '../models/user';

export const getAllExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: User,
          as: 'user', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    res.json(expenses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user', // This should match the alias defined in the association
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  const { amount, description, priority, date, assignedUserId } = req.body;
  try {
    const newExpense = await Expense.create({ amount, description, priority, date, assignedUserId });
    res.status(201).json(newExpense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
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
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.json({ message: 'Expense deleted' });
    } else {
      res.status(404).json({ message: 'Expense not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
