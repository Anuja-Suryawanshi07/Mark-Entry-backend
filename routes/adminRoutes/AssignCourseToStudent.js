// routes/admin.js
const express = require("express");
const router = express.Router();


/**
 * ✅ Admin: Assign Student to a Course
 * Endpoint: PUT /admin/assign-student-course
 * Request Body: { "student_id": 15, "course_id": 2 }
 */
router.put("/assign-student-course", (req, res) => {
    const { student_id, course_id } = req.body;

    if (!student_id || !course_id) {
        return res.status(400).json({
            status: "Error",
            message: "student_id and course_id are required"
        });
    }

    // 1️⃣ Check if course exists
    const checkCourseQuery = "SELECT * FROM course WHERE course_id = ?";
    db.query(checkCourseQuery, [course_id], (err, courseResult) => {
        if (err) {
            console.error("Course lookup error:", err);
            return res.status(500).json({ status: "Error", message: "Database error" });
        }

        if (courseResult.length === 0) {
            return res.status(404).json({ status: "Error", message: "Course not found" });
        }

        const batch_id = courseResult[0].batch_id;

        // 2️⃣ Ensure student belongs to same batch
        const checkStudentQuery = "SELECT * FROM student WHERE student_id = ? AND batch_id = ?";
        db.query(checkStudentQuery, [student_id, batch_id], (err, studentResult) => {
            if (err) {
                console.error("Student lookup error:", err);
                return res.status(500).json({ status: "Error", message: "Database error" });
            }

            if (studentResult.length === 0) {
                return res.status(400).json({
                    status: "Error",
                    message: "Student not found in same batch as course"
                });
            }

            // 3️⃣ Assign course to student
            const updateQuery = "UPDATE student SET course_id = ? WHERE student_id = ?";
            db.query(updateQuery, [course_id, student_id], (err, result) => {
                if (err) {
                    console.error("Update error:", err);
                    return res.status(500).json({ status: "Error", message: "Database error" });
                }

                return res.status(200).json({
                    status: "Success",
                    message: "Course assigned to student successfully"
                });
            });
        });
    });
});

module.exports = router;
