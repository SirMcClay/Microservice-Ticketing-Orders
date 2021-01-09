import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { TicketCreatedEvent } from '@sirmctickets/commontickets';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from '../ticket-created-listener';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
	// Create an instance of the listener
	const listener = new TicketCreatedListener(natsWrapper.client);

	// Create a fake data event
	const data: TicketCreatedEvent['data'] = {
		version: 0,
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'Concert',
		price: 10,
		userId: new mongoose.Types.ObjectId().toHexString(),
	};

	// Create a fake message object
	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};

	return { listener, data, msg };
};

it('create and saves a ticket', async () => {
	const { listener, data, msg } = await setup();

	// Call the onMessage function with the data object + message object
	await listener.onMessage(data, msg);

	// Write assertions to make sure a ticket was created
	const ticket = await Ticket.findById(data.id);

	expect(ticket).toBeDefined();
	expect(ticket!.title).toEqual(data.title);
	expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
	// Call the onMessage function with the data object + message object
	// write assertions to make sure ack function is called
});
