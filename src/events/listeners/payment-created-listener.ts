import { Message } from 'node-nats-streaming';
import {
	Subjects,
	Listener,
	PaymentCreatedEvent,
	OrderStatus,
} from '@sirmctickets/commontickets';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
	queueGroupName = queueGroupName;

	async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
		const order = await Order.findById(data.orderId);

		if (!order) {
			throw new Error('Order not found');
		}

		order.set({
			status: OrderStatus.Complete,
		});
		await order.save();

		// Publish an event here to tell other services that a order was completed
		// and let they do whatever they want

		msg.ack();
	}
}
