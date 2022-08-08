import jwt from "jsonwebtoken";
import "dotenv/config.js";
const key = process.env.JWT_SECRET_KEY;

export const VerifyToken = (req, res, next) => {
  let auth = req.headers.authorization;
  if (!auth) {
    res
      .status(401)
      .json({ message: "You are not allowed to access to this information." });
  } else {
    let bearer = auth.split(" ")[0];
    let token = auth.split(" ")[1];
    try {
      let payload = jwt.verify(token, key);
      if (bearer !== "Bearer" || !token || !payload) {
        res
          .status(401)
          .json({
            message: "You are not allowed to access to this information.",
          });
      } else {
        req.decoded = {
          _id: payload._id,
          email: payload.email,
          role: payload.role,
        };
        next();
      }
    } catch (error) {
      res
        .status(401)
        .json({
          message: "You are not allowed to access to this information.",
        });
    }
  }
};
