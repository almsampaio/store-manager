module.exports = (err, _req, res, _next) => {
    const errorMessage = {
      err: {
        code: err.code,
        message: err.error.message,
      },
    };
  
    res.status(err.status).json(errorMessage);
  };