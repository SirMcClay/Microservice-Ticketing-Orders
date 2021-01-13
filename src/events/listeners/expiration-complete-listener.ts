import { Message } from 'node-nats-streaming';
import {
	Listener,
	ExpirationCompleteEvent,
	Subjects,
} from '@sirmctickets/commontickets';
import { queueGroupName } from './queue-group-name';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
	queueGroupName = queueGroupName;

	async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {}
}
