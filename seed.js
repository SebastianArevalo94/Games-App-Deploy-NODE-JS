import {Product} from "./models/Product.js";
import mongoose from "mongoose";
import {products} from "./data/products.js";
import "./database.js";

const seedDB = async() => {
    await Product.deleteMany({});
    await Product.insertMany(products);
};

seedDB().then(() => {
    console.log('data base seeded :v');
    mongoose.connection.close();
});

