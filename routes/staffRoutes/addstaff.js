const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE } = require("../../config");

// POST: add new Staff

//http://localhost:7777/staff/add-staff

router.post("/add-staff", (req,res) => {
    const { staffid, userid, roleid, courseid } = req.body;

    const sql = `INSERT INTO ${ STAFF_TABLE } ( staff_id, user_id, role_id, course_id ) VALUES ( ?, ?, ?, ? )`;

    pool.query(
    sql,
    [staffid, userid, roleid, courseid],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "Staff added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;


