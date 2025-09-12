const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { MARKS_TABLE } = require("../../config");

router.post("/assign-tasks/:student_id", async (req, res) => {
  try {
    const student_id = req.params.student_id;
    const {
      module_id,
      staff_id,
      types,      // ["Theory", "Lab", "IA-1", "IA-2"]
      start_date,
      end_date
    } = req.body;

    //  Validate input
    if (
      !module_id ||
      !student_id ||
      !staff_id ||
      !Array.isArray(types) ||
      types.length === 0 ||
      !start_date ||
      !end_date
    ) {
      return res
        .status(400)
        .json(errorResponse("All fields are required."));
    }

    //  Type flags for info/debug
    const typeFlags = {
      theory: types.includes("Theory"),
      lab: types.includes("Lab"),
      ia1: types.includes("IA-1"),
      ia2: types.includes("IA-2")
    };

    // Default marks while assigning task
    const theory_marks = 0;
    const lab_marks = 0;
    const ia1 = 0;
    const ia2 = 0;
    const status = "Pending";

    //  Insert query
    const sql = `
      INSERT INTO ${MARKS_TABLE} 
        (student_id, staff_id, module_id, theory_marks, lab_marks, IA_1, IA_2, start_date, till_date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      student_id,
      staff_id,
      module_id,
      theory_marks,
      lab_marks,
      ia1,
      ia2,
      start_date,
      end_date,
      status
    ];

    //  Debug logs
    console.log("Running SQL:", sql);
    console.log("Values:", values);
        for (let index in result) {
          let student = result[index];
          let student_id = student.student_id;
          paramsArr = [
            ...paramsArr,
            student_id,
            staff_id,
            module_id,
            start_date,
            end_date,
            "Pending",
          ];
          assignMarksQuery += (index != 0 ? "," : "") + "(?,?,?,?,?,?)";
        }

    //  Execute query
    await pool.promise().execute(sql, values);

    //  Success response
    return res.status(200).json(
      successResponse(
        {
          student_id,
          staff_id,
          module_id,
          typeFlags,
          start_date,
          end_date,
          status
        },
        "Task assigned and saved successfully."
      )
    );
  } catch (error) {
    console.error(" Error in /assign-tasks:", error);
    return res
      .status(500)
      .json(errorResponse("Internal server error."));
  }
});

module.exports = router;
