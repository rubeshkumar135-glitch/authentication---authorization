import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.schema.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "user") {
            return res.status(403).json({ message: "You are not user" });
        }

        next();

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: "Invalid token" }); 
    }
};

export default authMiddleware;

