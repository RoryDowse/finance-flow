import express from 'express';
import { getTotalIncome } from '../../controllers/income-controller.js';
import { getAllIncome, getIncomeById, createIncome, updateIncome, deleteIncome, } from '../../controllers/income-controller.js'; // Adjust the path as needed
const router = express.Router();
// Define the routes for income
router.get('/', getAllIncome); // Get all income entries
router.get('/:id', getIncomeById); // Get a specific income entry by ID
router.post('/', createIncome); // Create a new income entry
router.put('/:id', updateIncome); // Update an existing income entry by ID
router.delete('/:id', deleteIncome); // Delete an income entry by ID
// Route for total income
router.get('/total', getTotalIncome);
export { router as incomeRouter };
