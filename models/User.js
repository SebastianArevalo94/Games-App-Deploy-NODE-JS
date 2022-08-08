import mongoose from "mongoose";

const {model, Schema} = mongoose;

const UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	createdAt: {
		type: Object,
		required: true
	},
});

export const User = mongoose.model('User', UserSchema, 'users')