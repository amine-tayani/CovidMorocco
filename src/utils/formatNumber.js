export const getShortNumEn = (numStr) => {
  if (numStr !== "--") {
    numStr += "";
    numStr.replace(/\,/gi, "");
    if (numStr / 1000000 >= 1) {
      numStr = (numStr / 1000000).toFixed(0) + "M";
    } else if (numStr / 1000 >= 1) {
      numStr = (numStr / 1000).toFixed(0) + "K";
    }
  }
  return numStr;
};
