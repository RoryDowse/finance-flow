import { Request, Response } from 'express';
import { Income } from '../models/income.js'; // Adjust path and model name as needed
import { User } from '../models/user.js'; // Assuming the same User model is used

export const getAllIncome = async (_req: Request, res: Response) => {
  try {
    const income = await Income.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', // Adjust alias if needed
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    res.json(income);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getIncomeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const income = await Income.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', // Adjust alias if needed
          attributes: ['username'], // Include only the username attribute
        },
      ],
    });
    if (income) {
      res.json(income);
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createIncome = async (req: Request, res: Response) => {
  const { amount, description, date, assignedUserId } = req.body;
  try {
    const newIncome = await Income.create({ amount, description, date, assignedUserId });
    res.status(201).json(newIncome);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, description, date, assignedUserId } = req.body;
  try {
    const income = await Income.findByPk(id);
    if (income) {
      income.amount = amount;
      income.description = description;
      income.date = date;
      income.assignedUserId = assignedUserId;
      await income.save();
      res.json(income);
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const income = await Income.findByPk(id);
    if (income) {
      await income.destroy();
      res.json({ message: 'Income deleted' });
    } else {
      res.status(404).json({ message: 'Income not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalIncome = async (_req: Request, res: Response) => { // should this be retrieveTotalIncome?
    try {
      const income = await Income.findAll();
      const totalIncome = income.reduce((total, income) => total + income.amount, 0);
      console.log("totalIncomeRoute");
      console.log(totalIncome);
      res.json({ totalIncome });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  