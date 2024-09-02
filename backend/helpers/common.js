export const getFullPath = (req) => {
  return `${req.protocol}://${req.get("host")}`;
};
