import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.schema.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            const user = await User.findById(req.user._id);
            if(user.role != "user"){
                return res.status(403).json({ message: "You are not user" });
            }
            next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

export default authMiddleware;

