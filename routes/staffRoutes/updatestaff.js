const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE } = require("../../config");

// PUT: update an staff by Id

//http://localhost:7777/staff/update-staff/:staffId

router.put("/update-staff/:staffId", (req, res) => {
  const { staffId } = req.params;
  const { staffid, userid, roleid, courseid } = req.body;

  const sql = `UPDATE ${ STAFF_TABLE }
                SET staff_id = ?, user_id = ?, role_id = ?, course_id = ?
                WHERE staff_id = ?`;

    pool.query(
    sql,
    [staffid, userid, roleid, courseid, staffId],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.send({
          status: "Success",
          message: "No Staff found with this ID: " + staffid,
        });
      }
      return res.send({
        status: "Success",
        message: "Staff details updated Successfully with ID: " + staffid,
      });
    }
  );
});

module.exports = router;            
