import express from 'express';
import { getTotalExpenses } from '../../controllers/expenses-controller.js';
import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from '../../controllers/expenses-controller.js';
const router = express.Router();
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
// Route for total expenses
router.get('/total', getTotalExpenses);
export { router as expenseRouter };
