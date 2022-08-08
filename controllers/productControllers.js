import { Product } from "../models/Product.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    console.log("Hubo un error", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ message: "Product not found." });
    } else {
      res.status(200).json({ data: product });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const createProduct = async (req, res) => {
  try {
    if (req.decoded.role === "admin") {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: "Product created", data: product });
    } else {
      res.status(401).json({
        message: "You are not allowed to do to this action.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (req.decoded.role === "admin") {
      const { name, price, description, category, photo } = req.body;
      let product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product not found." });
      } else {
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.photo = photo;
        product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          product,
          {
            new: true,
          }
        );
        res.status(201).json({ message: "Product Updated!", data: product });
      }
    } else {
      res.status(401).json({
        message: "You are not allowed to do to this action.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (req.decoded.role === "admin") {
      let product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: "Product Not Found." });
      } else {
        await Product.findOneAndRemove({ _id: req.params.id });
        res
          .status(200)
          .json({ message: "Product deleted", gameDeleted: product });
      }
    } else {
      res.status(401).json({
        message: "You are not allowed to do to this action.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const products = await Product.find();
    let includes = [];
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(req.params.name.toLowerCase())) {
        includes.push(product);
      }
    });
    if (includes.length > 0) {
      res
        .status(200)
        .json({ data: includes });
    } else {
      res.status(200).json({ message: "No products found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};
