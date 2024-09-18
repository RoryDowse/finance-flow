import { Router } from 'express';
import { userRouter } from './user-routes.js';
// import { incomeRouter } from './income-routes';
import { expenseRouter } from './expense-routes.js';

const router = Router();

router.use('/user', userRouter);
// router.use('/income', incomeRouter);
router.use('/expenses', expenseRouter);

export default router;