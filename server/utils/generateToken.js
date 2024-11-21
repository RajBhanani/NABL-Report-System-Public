import jwt from "jsonwebtoken";

const sessionHours = 8;

const generateToken = async (res, userId, userRole) => {
  const token = jwt.sign({ userId, userRole }, process.env.JWT_SECRET, {
    expiresIn: sessionHours * 60 * 60 * 1000,
  });
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${
      sessionHours * 60 * 60
    }; Partitioned;`
  );
};

export default generateToken;
