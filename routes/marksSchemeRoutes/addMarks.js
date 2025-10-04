const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");

//  Add marks scheme
router.post("/add", async (req, res) => {
  try {
    const { module_id, theory_marks, lab_marks, IA_1, IA_2 } = req.body;

    if (!module_id || theory_marks == null || lab_marks == null) {
      return res.status(400).send(errorResponse("Missing required fields"));
    }

    await pool.query(
      "INSERT INTO marks_scheme (module_id, theory_marks, lab_marks, IA_1, IA_2) VALUES (?, ?, ?, ?, ?)",
      [module_id, theory_marks, lab_marks, IA_1, IA_2]
    );

    res.status(201).send(successResponse("Marks scheme added successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).send(errorResponse("Failed to add marks scheme"));
  }
});

module.exports = router;
