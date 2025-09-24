// Success response
const successResponse = (message, data = null) => {
  return {
    status: "success",
    message: message,
    data: data,
  };
};

// Error response
const errorResponse = (error, code = 500) => {
  return {
    status: "error",
    message: error,
    code: code,
  };
};

module.exports = { successResponse, errorResponse };
