import { Router } from 'express';
import { expenseRouter } from './expense-routes';
import { userRouter } from './user-routes';

const router = Router();

router.use('/expenses', expenseRouter);
router.use('/users', userRouter);

export default router;
