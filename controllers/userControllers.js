import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const key = process.env.JWT_SECRET_KEY;

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      const token = jwt.sign(
        { _id: user.id, name:user.name, lastName: userFind.lastName ,email: user.email, role: user.role, photo: userFind.photo  },
        key
      );
      await user.save();
      res
        .status(201)
        .json({ message: "User created!", data: user, token: token });
    } else {
      res
        .status(400)
        .json({ message: "ERROR. The email is already registered!." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await User.findOne({ email });
    if (!userFind) {
      res.status(400).json({ message: "User does not exist!" });
    } else {
      if (password !== userFind.password) {
        res.status(403).json({ message: "Incorrect password" });
      } else {
        const token = jwt.sign(
          { _id: userFind.id, name:userFind.name, lastName: userFind.lastName , email: userFind.email, role: userFind.role, photo: userFind.photo },
          key
        );
        res.cookie("token", token);
        res
          .status(200)
          .json({ message: `Welcome ${userFind.name}!`, token: token, user: userFind });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const GetAll = async (req, res) => {
  try {
    if (req.decoded.role === "admin") {
      const users = await User.find();
      res.status(200).json({ message: "Success Get All Users", data: users });
    } else {
      res.status(401).json({
        message: "You are not allowed to access to this information.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const GetOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Success Get User", data: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    } else {
      user.name = name;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user = await User.findOneAndUpdate({ _id: req.params.id }, user, {
        new: true,
      });
      res.status(200).json({ message: "User Updated!", data: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    if (req.decoded.role === "admin") {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(400).json({ message: "User not found" });
      } else {
        await User.findOneAndRemove({ _id: req.params.id });
        res.status(200).json({ message: "Success Deconste User", data: user });
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
