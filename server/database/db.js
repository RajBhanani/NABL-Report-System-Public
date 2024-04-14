import mongoose from "mongoose";
import { NABLData } from "../models/nablModels.js";

const connectToDB = async () => {
  const URL = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
    try {
      const update = await NABLData.updateOne(
        { currentYear: new Date().getFullYear() },
        {
          $setOnInsert: {
            currentYear: new Date().getFullYear(),
            currentSoilParamId: 0,
            currentWaterParamId: 0,
            currentCertificationNumber: 7257,
            currentRevision: "01",
            currentSoilId: 0,
            currentWaterId: 0,
            analysedBy: "K.S. Maniyar",
            approvedBy: "Mr D.A. Vyas",
          },
        },
        { upsert: true }
      );
      if (update.upsertedCount > 0) {
        console.log("Date initialised");
      }
    } catch (error) {
      console.log("Error in initialise data:", error.message);
    }
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
};

export default connectToDB;
