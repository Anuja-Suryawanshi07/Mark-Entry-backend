// routes/mentorRoutes/getBatches.js
const express = require("express");

const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all batches for a mentor (staffId)
router.get("/batches/:staffId", (req, res) => {
  const { staffId } = req.params;

  const sql = `
    SELECT DISTINCT b.batch_id, b.batch_name
    FROM batch b
    INNER JOIN student s ON s.batch_id = b.batch_id
    INNER JOIN marks m ON m.student_id = s.student_id
    WHERE m.staff_id = ?
  `;

  pool.query(sql, [staffId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json(errorResponse("Database Error", err));
    }

    return res
      .status(200)
      .json(successResponse(results, "Batches fetched successfully"));
  });
});

module.exports = router;
