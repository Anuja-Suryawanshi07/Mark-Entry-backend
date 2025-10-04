const express = require("express");

const router = express.Router();

/*
 * PUT: Update students by batch, by course, or both
 * URL: /admin/update-students
 * Request Body: {
 *   "batch_id": 2,         // optional
 *   "course_id": 3,        // optional
 *   "update": {
 *       "batch_id": 5,     // new batch_id to assign
 *       "course_id": 10    // new course_id to assign
 *   }
 * }
 */
router.put("/update-students", (req, res) => {
  const { batch_id, course_id, update } = req.body;

  if (!update || Object.keys(update).length === 0) {
    return res.status(400).json({
      status: "Error",
      message: "Update object with at least one field is required"
    });
  }

  // Prepare SET clause
  const setFields = [];
  const setParams = [];

  if (update.batch_id) {
    setFields.push("batch_id = ?");
    setParams.push(update.batch_id);
  }

  if (update.course_id) {
    setFields.push("course_id = ?");
    setParams.push(update.course_id);
  }

  if (setFields.length === 0) {
    return res.status(400).json({ status: "Error", message: "No valid fields to update" });
  }

  let sql = `UPDATE student SET ${setFields.join(", ")} WHERE 1=1`;
  const params = [...setParams];

  // Apply filters
  if (batch_id) {
    sql += " AND batch_id = ?";
    params.push(batch_id);
  }

  if (course_id) {
    sql += " AND course_id = ?";
    params.push(course_id);
  }

  pool.query(sql, params, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ status: "Error", message: "Database error" });
    }

    return res.status(200).json({
      status: "Success",
      message: `${result.affectedRows} student(s) updated successfully`
    });
  });
});

module.exports = router;
