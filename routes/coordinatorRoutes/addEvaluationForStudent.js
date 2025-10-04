const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


router.post("/assign-tasks/:student_id", async (req, res) => {
    try {
        const student_id = req.params.student_id;
        const {
            module_id,
            staff_id,
            types,      // ["Theory", "lab", "IA-1", "IA-2"]
            start_date,
            end_date
        } = req.body;

        if (!module_id || !student_id || !staff_id || !Array.isArray(types) || types.length === 0 || !start_date || !end_date) {
            return res.status(400).json(errorResponse("All fields are required."));
        }

        const typeFlags = {
            theory: types.includes("Theory"),
            lab: types.includes("Lab"),
            ia1: types.includes("IA-1"),
            ia2: types.includes("IA-2")
        };

        const assignTasks = {
            module_id,
            student_id,
            staff_id,
            types: typeFlags,
            start_date,
            end_date
        };
        pool.execute(`INSERT INTO ${MARKS_TABLE} (student_id,staff_id,module_id,start_date,till_date ,status) values(?,?,?,?,?,?,?,?,?,?)`,[student_id,module_id,start_date,end_date,"In Progress"]  )

        return res.status(200).json(successResponse(assignTasks, "Task assigned (not saved)."));
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse("Internal server error."));
    }
});



module.exports = router;
