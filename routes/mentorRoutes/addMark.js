const express = require("express");

const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// PUT add/update marks
router.put("/add-mark", (req, res) => {
  console.log("Request body:", req.body);
  const { mark_id, theory_marks, lab_marks, IA_1, IA_2, status } = req.body || {};

  if (!mark_id) {
    return res.status(400).send(errorResponse("mark_id is required in body"));
  }
  

  const sql = 
     `UPDATE marks
    SET theory_marks=?, lab_marks=?, IA_1=?, IA_2=?, status=?
    WHERE mark_id=?`;

  pool.query(sql, [theory_marks, lab_marks, IA_1, IA_2, status, mark_id], (error, results) => {
    if (error) return res.send(errorResponse(error));
    if (results.affectedRows === 0) return res.send(successResponse("No record found to update."));
    return res.send(successResponse("Marks updated successfully."));
  });
});

module.exports = router;
