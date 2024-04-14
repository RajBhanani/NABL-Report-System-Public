export const generateSampleCode = (sampleType, sampleId) => {
  // const yearDigits = new Date(2024, 1, 1).getFullYear() % 100;
  const yearDigits = new Date().getFullYear() % 100;
  const digits = sampleId.toString().length;
  const zeroString = digits < 6 ? "0".repeat(6 - digits) : "";
  const sampleCode =
    yearDigits + sampleType[0].toUpperCase() + zeroString + sampleId;
  return sampleCode;
};

export const generateULR = (certiNo, sampleId, frpt) => {
  const yearDigits = new Date().getFullYear() % 100;
  const digits = sampleId.toString().length;
  const zeroString = digits < 8 ? "0".repeat(8 - digits) : "";
  const lastLetter = frpt === "F/RPT/1.1" ? "P" : "F";
  const ULR =
    "TC" +
    String(certiNo) +
    yearDigits +
    "0" +
    zeroString +
    sampleId +
    lastLetter;
  return ULR;
};
