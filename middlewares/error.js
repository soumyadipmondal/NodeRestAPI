module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "Development") {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "INTERNAL SERVER ERROR",
      err: err,
      stackTrace: err.stack,
    });
  } else {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "INTERNAL SERVER ERROR",
    });
  }
};
