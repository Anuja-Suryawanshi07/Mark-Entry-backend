const express = require("express"); 
const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

/**
 * GET all pending tasks for a staff with hierarchical structure
 * Example:
 *  GET http://localhost:7777/mentor/show-all-pending-tasks/43?batchId=1&courseId=2&moduleId=5&groupId=10
 */
router.get("/show-all-pending-tasks/:staffId", (req, res) => {
  const { staffId } = req.params;
  const { batchId, courseId, moduleId, groupId } = req.query;

  // Base SQL
  let sql = `
    SELECT 
      m.mark_id,
      CONCAT(student_user.first_name, ' ', student_user.last_name) AS student_name,
      st.staff_name,
      b.batch_id, b.batch_name,
      c.course_id, c.course_name,
      mod_table.module_id, mod_table.module_name,
      g.group_id, g.group_name,
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
    LEFT JOIN course AS c ON s.course_id = c.course_id
    LEFT JOIN batch AS b ON s.batch_id = b.batch_id
    WHERE st.staff_id = ? AND m.status = "Pending"
  `;

  const params = [staffId];

  // Dynamic filters
  if (batchId) {
    sql += " AND b.batch_id = ?";
    params.push(batchId);
  }
  if (courseId) {
    sql += " AND c.course_id = ?";
    params.push(courseId);
  }
  if (moduleId) {
    sql += " AND mod_table.module_id = ?";
    params.push(moduleId);
  }
  if (groupId) {
    sql += " AND g.group_id = ?";
    params.push(groupId);
  }

  pool.query(sql, params, (error, results) => {
    if (error) {
      console.error("SQL Error:", error);
      return res.status(500).json(errorResponse("Database Error", error));
    }

    if (results.length === 0) {
      return res.status(404).json(errorResponse("No tasks found for this mentor"));
    }

    // Apply dynamic status
    const updatedResults = results.map(task => {
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

    // Transform into hierarchical structure
    const hierarchy = {};

    updatedResults.forEach(row => {
      // Batch level
      if (!hierarchy[row.batch_id]) {
        hierarchy[row.batch_id] = {
          batch_id: row.batch_id,
          batch_name: row.batch_name,
          courses: {}
        };
      }

      // Course level
      if (!hierarchy[row.batch_id].courses[row.course_id]) {
        hierarchy[row.batch_id].courses[row.course_id] = {
          course_id: row.course_id,
          course_name: row.course_name,
          modules: {}
        };
      }

      // Module level
      if (!hierarchy[row.batch_id].courses[row.course_id].modules[row.module_id]) {
        hierarchy[row.batch_id].courses[row.course_id].modules[row.module_id] = {
          module_id: row.module_id,
          module_name: row.module_name,
          groups: {}
        };
      }

      // Group level
      if (!hierarchy[row.batch_id].courses[row.course_id].modules[row.module_id].groups[row.group_id]) {
        hierarchy[row.batch_id].courses[row.course_id].modules[row.module_id].groups[row.group_id] = {
          group_id: row.group_id,
          group_name: row.group_name,
          tasks: []
        };
      }

      // Push task
      hierarchy[row.batch_id].courses[row.course_id].modules[row.module_id].groups[row.group_id].tasks.push({
        mark_id: row.mark_id,
        student_name: row.student_name,
        staff_name: row.staff_name,
        theory_marks: row.theory_marks,
        lab_marks: row.lab_marks,
        IA_1: row.IA_1,
        IA_2: row.IA_2,
        start_date: row.start_date,
        till_date: row.till_date,
        status: row.status
      });
    });

    return res
      .status(200)
      .json(successResponse(Object.values(hierarchy), "Tasks fetched successfully"));
  });
});

module.exports = router;
