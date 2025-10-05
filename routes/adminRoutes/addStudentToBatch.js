const express = require("express");
const router = express.Router();
const db = require("../../config/db"); 

/**
 * ✅ Admin Add Student to Batch API (Single Student)
 * Endpoint: POST /admin/add-student-to-batch
 * Request Body: { "student_id": 15, "batch_id": 2 }
 */
router.post("/add-student-to-batch", (req, res) => {
    const { student_id, batch_id } = req.body;

    // Basic validations
    if (!student_id || !batch_id) {
        return res.status(400).json({
            status: "Error",
            message: "student_id and batch_id are required"
        });
    }

    // Check if batch exists & is active
    const checkBatchQuery = "SELECT * FROM batch WHERE batch_id = ? AND is_active = 1";
    db.query(checkBatchQuery, [batch_id], (err, batchResult) => {
        if (err) {
            console.error("Batch lookup error:", err);
            return res.status(500).json({ status: "Error", message: "Database error" });
        }

        if (batchResult.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "Invalid or inactive batch"
            });
        }

        // Update student with batch_id
        const updateQuery = `
            UPDATE student 
            SET batch_id = ?, updated_at = CURDATE() 
            WHERE student_id = ?
        `;

        db.query(updateQuery, [batch_id, student_id], (err, updateResult) => {
            if (err) {
                console.error("Update error:", err);
                return res.status(500).json({ status: "Error", message: "Database error" });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({
                    status: "Error",
                    message: "Student not found"
                });
            }

            return res.status(200).json({
                status: "Success",
                message: "Student assigned to batch successfully"
            });
        });
    });
});

module.exports = router;
