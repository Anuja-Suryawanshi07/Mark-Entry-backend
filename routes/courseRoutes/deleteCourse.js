const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

const { COURSE_TABLE } = require("../../config");

// DELETE: delete an user
//http://localhost:7777/course/delete-course/3

router.delete("/delete-course/:courseId",(req,res) => {
  const { courseId } = req.params;
  const sql = `DELETE FROM ${ COURSE_TABLE }
                WHERE course_id = ?`;
  pool.query(sql, [courseId], (error, result) => {
    if (error) {
      return res.send(error);
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No course Found with ID: " + courseId,
      });
    }
    return res.send({
      status: "Success",
      message: " User DELETED Successfully with ID: " + courseId,
    });
  });
});

module.exports = router;