import express from 'express';
import { calculateCashflow } from '../../controllers/calculate-cashflow-controller.js';

const router = express.Router();

router.get('/cashflow', calculateCashflow);

export { router as calculateCashflowRouter };