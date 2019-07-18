import mongoose from 'mongoose';

export interface ICreateContact extends mongoose.Document {
	firstName: string;
	lastName?: string;
	phone: string;
	email?: string;
}
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
	isBlocked: { type: Boolean, default: false },
});

export const Contact = mongoose.model<ICreateContact>('Contact', contactSchema);
