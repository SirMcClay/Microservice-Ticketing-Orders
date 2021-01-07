import {
	Subjects,
	Publisher,
	OrderCancelledEvent,
} from '@sirmctickets/commontickets';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
