const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { STAFF_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// PUT: update an user by Id
//http://localhost:7777/admin/update-staff/7

router.put("/update-staff/:staff_id", (req, res) => {
    let { staff_id } = req.params;
    let { role_id, course_id } = req.body;

    course_id = Number.parseInt(course_id);
    if (Number.isNaN(course_id) || course_id < 0) {
        return res.status(400).send(errorResponse("Invalid course Id"))
    }

    role_id = Number.parseInt(role_id);
    if (Number.isNaN(role_id) || role_id < 0) {
        return res.status(400).send(errorResponse("Invalid role Id"))
    }

    staff_id = Number.parseInt(staff_id);
    console.log("staff id",staff_id)
    if (Number.isNaN(staff_id) || staff_id < 0) {
        return res.status(400).send(errorResponse("Invalid staff Id"))
    }


    const sql = `UPDATE ${STAFF_TABLE}
                SET role_id = ?, course_id = ?
                WHERE staff_id = ?`;

    pool.query(
        sql,
        [role_id, course_id,staff_id],
        (error, result) => {
            if (error) {
                return res.status(500).send(errorResponse(error));
            }
            console.log("result: ", result);

            if (result.affectedRows === 0) {
                return res.status(404).send(errorResponse("No staff found with this ID: " + staff_id));
            }
            return res.status(200).send(successResponse("Staff details updated Successfully with ID: " + staff_id));
        }
    );
});

module.exports = router;