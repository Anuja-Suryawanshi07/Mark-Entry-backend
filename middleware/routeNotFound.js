const { errorResponse } = require("../utils/apiResponse");

const routeNotFound = (req, res, next) => {
  return res
    .status(404)
    .send(
      errorResponse(
        `The Request you are trying to access: ${req.method} - ${req.url} does not exists !!!`
      )
    );
};

module.exports = routeNotFound;
