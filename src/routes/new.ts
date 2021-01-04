import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@sirmctickets/commontickets';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
	'/api/orders',
	requireAuth,
	[
		body('ticketId')
			.not()
			.isEmpty()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage('TicketId must be provided'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// Find the ticket the user is trying to order in the database

		// Make sure that this ticket is not already reserved

		// Calculate an expiration date for this order

		// Build the order and save is to the database

		// Publish an event saying that an order was created

		res.send({});
	}
);

export { router as newOrderRouter };
