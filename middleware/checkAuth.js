const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { errorResponse } = require("../utils/apiResponse");

const checkAuth = (request, response, next) => {
    if (request.url === "/staff/register" || request.url === "/staff/login" ||request.url === "/student/register" || request.url === "/student/login") {
        return next();
    }

    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.send(errorResponse("Token is Missing!"));   
    }

    try {
        const token = authToken.split(" ")[1];
        console.log("token: ", token);

        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log("decodedToken: ",decodedToken);
       // console.error("JWT Error:", err.message);

        request.user = decodedToken;
        console.log("user: ", request.user);
    

        return next();
    }catch(error) {
        return response.send(errorResponse("Invalid or Expired Token!"));
    }
};

const checkAdminRole = (request, response, next) => {
    //check if role is admin
    //if yes then allow the request

    if (request.user.role === "Admin") {
        return next();
    }
    //if no then send an error message
    return response.send(errorResponse("UnAuthorized Access! Admins only"));
};

const checkCoordinatorRole = (request, response, next) => {
    // check if role is coordinator 
    // if yes then allow the request

    if (request.user.role === "Coordinator") {
        return next();
    }
    //if no then send an error message 
    return response.send(errorResponse("UnAuthorized Access! Coordinator only"));
};

const checkMentorRole = (request, response, next) => {
    // check if role is Mentor 
    // if yes then allow the request
    console.log(request.user);
    if (request.user.role === "Mentor") {
        return next();
    }
    //if no then send an error message 
    return response.send(errorResponse("UnAuthorized Access! Mentor only"));
};

const checkStaffRole = (request, response, next) => {
    // check if role is Staff 
    // if yes then allow the request

    if (request.user.role === "Staff") {
        return next();
    }

    //if no then send an error message 
    return response.send(errorResponse("UnAuthorized Access! Staff only"));
};

const checkStudentRole = (request, response, next) => {
    // check if role is Student 
    // if yes then allow the request

    if (request.user.role === "Student") {
        return next();
    }

    //if no then send an error message 
    return response.send(errorResponse("UnAuthorized Access! Student only"));
};

module.exports = {
    checkAuth,
    checkCoordinatorRole,
    checkAdminRole,
    checkMentorRole,
    checkStaffRole,
    checkStudentRole,
};
