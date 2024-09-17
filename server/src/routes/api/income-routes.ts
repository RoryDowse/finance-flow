import express from 'express';
import {
    getAllIncomes,
    getIncome,
    addIncome,
    updateIncome,
    deleteIncome
} from '../../controllers/income-controller.js';

const router = express.Router();

router.get('/', getAllIncomes);
router.get('/', getIncome);
router.post('/', addIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

export { router as incomeRouter };