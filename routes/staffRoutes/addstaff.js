const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// POST: add new Staff

//http://localhost:7777/staff/add-staff
/*
  {
    "staffid": 6,
    "userid": 7,
    "roleid": 2,
    "courseid": 3
}
 */

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


