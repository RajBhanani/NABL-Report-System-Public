import express from "express";

import { admin, protect } from "../middleware/authMiddleware.js";
import { superadmin } from "../middleware/superAdminMiddleware.js";

import {
  authoriseReport,
  createParameter,
  createParameterSet,
  createReport,
  createSample,
  evaluateTestData,
  getNablData,
  getParams,
  getReports,
  getSamples,
  updateNablData,
  updateParameter,
  updateReport,
  updateSample,
} from "../controller/nablController.js";

const nablRouter = express.Router();

nablRouter.post("/createSample", protect, createSample);
nablRouter.put("/updateSample", protect, updateSample);
nablRouter.get("/getSamples", protect, getSamples);
nablRouter.get("/evaluateTestData", protect, evaluateTestData);
nablRouter.post("/createReport", protect, createReport);
nablRouter.put("/updateReport", protect, updateReport);
nablRouter.put("/authoriseReport", admin, authoriseReport);
nablRouter.get("/getReports", protect, getReports);
nablRouter.get("/getParams", protect, getParams);
nablRouter.get("/getNablData", protect, getNablData);

nablRouter.put("/updateNablData", superadmin, updateNablData);
nablRouter.post("/createParam", superadmin, createParameter);
nablRouter.put("/updateParam", superadmin, updateParameter);
nablRouter.post("/createParamSet", superadmin, createParameterSet);

export default nablRouter;
