import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
	phone: { type: String, index: true, unique: true, required: true },
	email: { type: String, index: true, unique: true},
	isBlocked: { type: Boolean, default: false },
});

contactSchema.plugin(uniqueValidator, {message: 'is already in your contact.'})
export const Contact = mongoose.model<ICreateContact>('Contact', contactSchema);
