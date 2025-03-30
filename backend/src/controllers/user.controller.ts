import { Request, Response } from "express";
import User from "../models/user";

interface AuthRequest extends Request {
  user?: any;
}

// Get logged-in user
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
