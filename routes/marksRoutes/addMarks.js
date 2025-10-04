const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// POST: add marks

//http://localhost:7777/marks/add-marks

/*
  {
    "markId": 6,
    "studentId": 5,
    "staffId": 2,
    "moduleId": 1,
    "theoryMarks": 18,
    "labMarks": 22,
    "IA1": 20,
    "IA2": 60,
   "startdate":"2025-08-05", 
   "tilldate":""2025-08-05"", 
   "status": "pending"
}
 */

router.post("/add-marks", (req,res) => {
    const { markId, studentId, staffId, moduleId, theoryMarks, labMarks, IA1, IA2, startdate, tilldate, status } = req.body;

    const sql = `INSERT INTO ${ MARKS_TABLE } ( mark_id, student_id, staff_id, module_id,  theory_marks, lab_marks, IA_1, IA_2,start_date, till_date, status ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
 pool.query(
    sql,
    [markId, studentId, staffId, moduleId, theoryMarks, labMarks, IA1, IA2, startdate, tilldate, status],
    (error, result) => {
      if (error) {
        return res.send(error);
      }
      return res.status(201).send({
        status: " Success",
        message: "Marks added Successfully with ID: " + result.insertId,
      });
    }
  );
});

module.exports = router;

