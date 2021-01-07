import {
	Publisher,
	OrderCreatedEvent,
	Subjects,
} from '@sirmctickets/commontickets';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
}
