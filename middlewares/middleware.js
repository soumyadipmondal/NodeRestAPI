module.exports = (req, res, next) => {
  req.trace = {
    id: 1,
  };

  next();
};
