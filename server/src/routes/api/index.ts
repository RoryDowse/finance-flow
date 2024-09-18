import { Router } from 'express';
import { userRouter } from './user-routes';
// import { incomeRouter } from './income-routes';
import { expenseRouter } from './expense-routes';


const router = Router();

router.use('/user', userRouter);
// router.use('/income', incomeRouter);
router.use('/expenses', expenseRouter);


export default router;
