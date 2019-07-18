import mongoose from 'mongoose';

export interface ICreateContact extends mongoose.Document {
	firstName: string;
	lastName?: string;
	phone: string;
	email?: string;
}
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	firstName: String,
	lastName: String,
	phone: String,
	email: String,
	isBlocked: { type: Boolean, default: false },
});

export const Contact = mongoose.model<ICreateContact>('Contact', contactSchema);
