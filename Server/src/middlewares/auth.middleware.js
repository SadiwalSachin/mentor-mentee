import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verfiyUser = async (req, res, next) => {
  try {
    const incomingToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!incomingToken) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(incomingToken, process.env.JWT_TOKEN);

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }

    req.userId = user._id;

    next();
  } catch (error) {
    return res.staus(500).json({
      success: false,
      message: "Some error occured while verifying user",
      error: error,
    });
  }
};

export default verfiyUser
