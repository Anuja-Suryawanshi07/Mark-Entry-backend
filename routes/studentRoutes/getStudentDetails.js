const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// GET all students
// http://localhost:7777/student/get-student-details

// get single student details
router.get("/get-student-details", (req, res) => {
  const studentId  = req.user.student_id;
  const sql = `select s.student_id, concat(u.first_name, ' ', u.last_name) student_name, 
  s.prn_number, g.group_name, c.course_name, b.batch_name 
  from ${STUDENT_TABLE} s
  left join ${USER_TABLE} u on  u.user_id = s.user_id
  left join \`${STUDENT_GROUP_TABLE}\` g on s.group_id=g.group_id 
  left join ${COURSE_TABLE} c on g.course_id=c.course_id 
  left join ${BATCH_TABLE} b on c.batch_id=b.batch_id
  where s.student_id = ?;`;

  console.log(sql)
  console.log(studentId)
  pool.query(sql, [studentId], (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No student found."));
    }
    return res.send(successResponse(results[0])); // only one student
  });
});


module.exports = router;
