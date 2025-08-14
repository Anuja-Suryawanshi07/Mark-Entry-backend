const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE } = require("../../config");



// PUT: update an user by Id
//http://localhost:7777/course/update-course/7

router.put("/update-course/:courseId", (req, res) => {
  const { courseId } = req.params;
  const { course_name, batch_id } = req.body;

  const sql = `UPDATE ${ COURSE_TABLE }
                SET  course_name = ?, batch_id = ?
                WHERE course_id = ?`;

  pool.query(
    sql,
    [course_name, batch_id,courseId],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      console.log("result: ", result);

      if (result.affectedRows === 0) {
        return res.send({
          status: "Success",
          message: "No Course found with this ID: " + courseId,
        });
      }
      return res.send({
        status: "Success",
        message: "Course details updated Successfully with ID: " + courseId,
      });
    }
  );
});

module.exports = router;