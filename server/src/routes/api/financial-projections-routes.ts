import express from 'express';
import {
    getStockProjections,
    getCurrencyProjections
} from '../../controllers/financial-projections-controller.js';

const router = express.Router();

router.get('/stock:ticker', getStockProjections);
router.get('/currency:currencyCode', getCurrencyProjections);

export { router as financialProjectionsRouter };