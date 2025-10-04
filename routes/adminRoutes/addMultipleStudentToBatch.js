const express = require("express");
const router = express.Router();


//Admin Add MULTIPLE Students to Batch API
//Endpoint: POST /admin/add-students-to-batch
// Request Body: { "student_ids": [15, 16, 17], "batch_id": 2 }

router.post("/add-students-to-batch", (req, res) => {
    const { student_ids, batch_id } = req.body;

    if (!student_ids || !Array.isArray(student_ids) || student_ids.length === 0 || !batch_id) {
        return res.status(400).json({
            status: "Error",
            message: "student_ids (array) and batch_id are required"
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

        // Update multiple students in one query
        const updateQuery = `
            UPDATE student 
            SET batch_id = ?, updated_at = CURDATE() 
            WHERE student_id IN (?)
        `;

        db.query(updateQuery, [batch_id, student_ids], (err, updateResult) => {
            if (err) {
                console.error("Update error:", err);
                return res.status(500).json({ status: "Error", message: "Database error" });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({
                    status: "Error",
                    message: "No students found to update"
                });
            }

            return res.status(200).json({
                status: "Success",
                message: `${updateResult.affectedRows} students assigned to batch successfully`
            });
        });
    });
});


module.exports = router;
