import { Message } from 'node-nats-streaming';
import {
	Listener,
	ExpirationCompleteEvent,
	Subjects,
	OrderStatus,
} from '@sirmctickets/commontickets';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
	queueGroupName = queueGroupName;

	async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
		const order = await Order.findById(data.orderId);

		if (!order) {
			throw new Error('Order not found');
		}

		order.set({
			status: OrderStatus.Cancelled,
		});
		await order.save();
	}
}
