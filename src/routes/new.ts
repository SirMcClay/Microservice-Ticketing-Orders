import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@sirmctickets/commontickets';

const router = express.Router();

router.post('/api/orders', async (req: Request, res: Response) => {
	res.send({});
});

export { router as newOrderRouter };
