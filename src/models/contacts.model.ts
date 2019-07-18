import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	id: Number,
	createdAt: String, // the ISO date of when the contact was created
	isBlocked: Boolean,
	value: {
		firstName: String,
		lastName: String,
		phone: String,
		email: String,
	},
});

export const Contact = mongoose.model('Contact', contactSchema);
