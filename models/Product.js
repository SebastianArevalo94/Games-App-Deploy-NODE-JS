import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
 	name: {
 		type: String,
 		required: true
 	},
 	price: {
 		type: String,
 		required: true
 	},
 	description: {
 		type: String,
 		required: true
 	},
 	category: {
 		type: String,
 		required: true
 	},
 	photo: {
 		type: String,
 		required: true
 	}
});

export const Product = model("Product", ProductSchema, "products");