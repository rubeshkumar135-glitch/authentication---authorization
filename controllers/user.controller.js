import User from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword, "Hashed Password");

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            role
        })
        await newUser.save();

        res.status(200).json({ message: "User registered successfully", data: newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: "invalid credentials" });
        }
        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.token = token;

        res.status(200).json({ message: "login successful", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.status(200).json({ message: "User found", data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}



