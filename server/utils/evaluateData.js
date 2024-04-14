import { Parser } from "expr-eval";
import {
  NABLParameterSets,
  NABLSoilParameters,
  NABLWaterParameters,
} from "../models/nablModels.js";

const evaluateData = async (sampleType, analysisSet, reportData) => {
  const coll = sampleType === "S" ? NABLSoilParameters : NABLWaterParameters;
  const setParameters = await NABLParameterSets.findOne({
    name: analysisSet,
  }).select("parameters");
  const paramFormulae = await coll.find({}).select("paramId paramFormula");
  const setFormulae = paramFormulae.filter((set) =>
    setParameters.parameters.includes(set.paramId)
  );
  let calculatedData = {};
  Object.keys(reportData).forEach((key) => {
    const value = reportData[key];
    if (value !== null && typeof value === "object") {
      const index = setFormulae.findIndex(
        (param) => param.paramId === Number(key)
      );
      const data = Parser.evaluate(setFormulae[index].paramFormula, value);
      calculatedData = {
        ...calculatedData,
        [key]: Number(data.toPrecision(5)),
      };
    } else {
      calculatedData = {
        ...calculatedData,
        [key]: Number(value),
      };
    }
  });
  return calculatedData;
};

export default evaluateData;
