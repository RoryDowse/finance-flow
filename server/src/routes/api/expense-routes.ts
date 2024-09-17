import express from 'express';
import {
    getAllExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
} from '../../controllers/expense-controller.js';

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpense);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export { router as expenseRouter };