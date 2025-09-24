const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// ✅ Get all modules (for dropdown in Add Marks form)
router.get("/modules", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT module_id, module_name FROM module"
    ); // change table if needed
    res.status(200).send(successResponse(rows));
  } catch (error) {
    console.error(error);
    res.status(500).send(errorResponse("Failed to fetch modules"));
  }
});

module.exports = router;