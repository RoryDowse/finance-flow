import { Router } from 'express';
import { investmentRouter } from './investment-routes.js';
import { travelRouter } from './travel-routes.js';

const router = Router();

router.use('/investment', investmentRouter);
router.use('/travel', travelRouter);

export default router;
