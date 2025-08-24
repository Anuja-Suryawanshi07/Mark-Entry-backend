const express = require("express");
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all pending tasks for a staff
// GET http://localhost:7777/mentor/show-all-pending-tasks/:staffId
  /* Example: http://localhost:7777/mentor/show-all-pending-tasks/2
  response: {
              "status": "success",
              "data": [
                      {
                        "mark_id": 2,
                        "student_name": "Meera Desai",
                        "group_name": "W1",
                        "module_name": "DBMS",
                        "theory_marks": 42,
                        "lab_marks": 36,
                        "IA_1": 18,
                        "IA_2": 19,
                        "start_date": "2025-08-10T18:30:00.000Z",
                        "till_date": "2025-08-20T18:30:00.000Z",
                        "status": "Submitted"
                      }
                    ]
            }

 */

router.get("/show-all-pending-tasks/:staffId", (req, res) => {
  const { staffId } = req.params;

  const sql = `
    SELECT 
      m.mark_id,
      CONCAT(student_user.first_name, ' ', student_user.last_name) AS student_name,
      g.group_name,
      mod_table.module_name,
      m.theory_marks,
      m.lab_marks,
      m.IA_1,
      m.IA_2,
      m.start_date,
      m.till_date,
      m.status
    FROM marks AS m
    LEFT JOIN student AS s ON m.student_id = s.student_id
    LEFT JOIN user AS student_user ON s.user_id = student_user.user_id
    LEFT JOIN staff AS st ON m.staff_id = st.staff_id
    LEFT JOIN student_group AS g ON s.group_id = g.group_id
    LEFT JOIN module AS mod_table ON m.module_id = mod_table.module_id
    WHERE st.staff_id = ?;
  `;

  pool.query(sql, [staffId], (error, results) => {
    if (error) {
      return res.status(500).json(errorResponse("Database Error", error));
    }

    if (res.length === 0) {
      return res.status(404).json(errorResponse("No tasks found for this mentor"));
    }

    // ✅ apply dynamic status logic
    const updatedResult = results.map(task => {
      if (
        task.theory_marks == null ||
        task.lab_marks == null ||
        task.IA_1 == null ||
        task.IA_2 == null
      ) {
        task.status = "Pending";
      } else if (task.status !== "Completed") {
        task.status = "Submitted";
      }
      return task;
    });

    return res
      .status(200)
      .json(successResponse(updatedResult, "Tasks fetched successfully"));
  });
});

module.exports = router;

