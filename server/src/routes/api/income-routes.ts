import express from 'express';
import {
    getAllIncome,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome,
    // getTotalIncome // Optional: if you need a total income endpoint
} from '../../controllers/income-controller.js'; // Adjust the path as needed

const router = express.Router();

// Define the routes for income
router.get('/', getAllIncome);              // Get all income entries
router.get('/:id', getIncomeById);          // Get a specific income entry by ID
router.post('/', createIncome);             // Create a new income entry
router.put('/:id', updateIncome);           // Update an existing income entry by ID
router.delete('/:id', deleteIncome);        // Delete an income entry by ID

// Optional: Define a route for total income
// router.get('/total', getTotalIncome);

export { router as incomeRouter };
