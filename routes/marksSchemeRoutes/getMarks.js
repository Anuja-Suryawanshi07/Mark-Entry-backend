const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

//  Get all marks scheme
router.get("/all", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT ms.id, m.module_name, ms.theory_marks, ms.lab_marks, ms.IA_1, ms.IA_2
      FROM marks_scheme ms
      JOIN module m ON ms.module_id = m.module_id
    `);
    res.status(200).send(successResponse(rows));
  } catch (error) {
    console.error(error);
    res.status(500).send(errorResponse("Failed to fetch marks scheme"));
  }
});

module.exports = router;