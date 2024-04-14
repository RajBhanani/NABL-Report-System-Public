import express from "express";

import {
  userRegister,
  verifyAdminLogin,
} from "../controller/adminController.js";

import { superadmin } from "../middleware/superAdminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/verify", superadmin, verifyAdminLogin);

export default adminRouter;
