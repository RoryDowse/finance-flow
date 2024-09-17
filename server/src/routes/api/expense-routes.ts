import express from 'express';
import {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
} from '../../controllers/expenses-controller';

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export { router as expenseRouter };