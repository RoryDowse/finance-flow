import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { incomeRouter } from './income-routes.js';
import { expenseRouter } from './expense-routes.js';
const router = Router();
router.use('/users', userRouter);
router.use('/income', incomeRouter);
router.use('/expenses', expenseRouter);
export default router;
