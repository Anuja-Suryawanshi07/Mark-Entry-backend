const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE, MARKS_TABLE } = require("../../config/index");

router.post("/assign-tasks", async (req, res) => {
  try {
    const {
      module_id,
      group_id,
      staff_id,
      types, // ["Theory", "lab", "IA-1", "IA-2"]
      start_date,
      end_date,
    } = req.body;

    if (
      !module_id ||
      !group_id ||
      !staff_id ||
      !Array.isArray(types) ||
      types.length === 0 ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).json(errorResponse("All fields are required."));
    }

    const typeFlags = {
      theory: types.includes("Theory"),
      lab: types.includes("Lab"),
      ia1: types.includes("IA-1"),
      ia2: types.includes("IA-2"),
    };

    const assignTasks = {
      module_id,
      group_id,
      staff_id,
      types: typeFlags,
      start_date,
      end_date,
    };

    pool.query(
      `SELECT student_id from ${STUDENT_TABLE} where group_id=?`,
      [group_id],
      (error, result) => {
        let paramsArr = [];
        let assignMarksQuery = `INSERT INTO ${MARKS_TABLE} (student_id, staff_id, module_id, start_date, till_date, status) values`;

        for (let student of result) {
          let student_id = student.student_id;
          paramsArr = [
            ...paramsArr,
            student_id,
            module_id,
            start_date,
            end_date,
            "In Progress",
          ];
          assignMarksQuery += (student != 0 ? "," : "") + "(?,?,?,?,?,?)";
        }

        pool.execute(
          assignMarksQuery,
          paramsArr,
          (assignMarksError, assignMarksResult) => {
            if (assignMarksError) {
              return res
                .status(500)
                .json(errorResponse("Database Error", assignMarksError));
            }

            if (assignMarksResult.affectedRows === 0) {
              return res.status(404).json(errorResponse("Task not found"));
            }
            return res
              .status(201)
              .json(successResponse(assignTasks, "Task assigned"));
          }
        );
      }
    );
    // return res.status(200).json(successResponse(assignTasks, "Task assigned (not saved)."));
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse("Internal server error."));
  }
});

module.exports = router;
