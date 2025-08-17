const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE } = require("../../config");


// POST: add new course
//http://localhost:7777/admin/add-staff


router.post("/add-staff", (req, res) => {

  let { user_id, role_id, course_id } = req.body;

  user_id = Number.parseInt(user_id);
  if (Number.isNaN(user_id) || user_id < 0) {
    return res.status(400).send(errorResponse("Invalid user Id"))// 400 means client ne bad request send ki ex. user_id client ne number send krna chahiye , string or other type beje to allow nahi karenga
  }

  role_id = Number.parseInt(role_id);
  if (Number.isNaN(role_id) || role_id < 0) {
    return res.status(400).send(errorResponse("Invalid role Id"))
  }

  course_id = Number.parseInt(course_id);
  if (Number.isNaN(course_id) || course_id < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }


  const sql = `INSERT INTO ${STAFF_TABLE} (  user_id, role_id, course_id ) VALUES (?, ?, ?)`;

  pool.query(
    sql, [user_id, role_id, course_id], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      return res.status(201).send(
        successResponse( "Staff added Successfully with ID: " + result.insertId)
      );
    }
  );
});

module.exports = router;