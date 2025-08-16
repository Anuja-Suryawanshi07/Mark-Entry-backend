const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");



// PUT: update an user by Id
//http://localhost:7777/admin/update-staff/7

router.put("/update-staff/:staffId", (req, res) => {
    const { staffId } = req.params;
    const { roleid, courseid } = req.body;

    courseid = Number.parseInt(courseid);
    if (courseid === NaN || courseid < 0) {
        return res.status(400).send(errorResponse("Invalid course Id"))
    }

    roleid = Number.parseInt(roleid);
    if (roleid === NaN || roleid < 0) {
        return res.status(400).send(errorResponse("Invalid role Id"))
    }

    staffId = Number.parseInt(staffId);
    if (staffId === NaN || staffId < 0) {
        return res.status(400).send(errorResponse("Invalid staff Id"))
    }


    const sql = `UPDATE ${STAFF_TABLE}
                SET role_id = ?, course_id = ?
                WHERE staff_id = ?`;

    pool.query(
        sql,
        [roleid, courseid],
        (error, result) => {
            if (error) {
                return res.status(500).send(errorResponse(error));
            }
            console.log("result: ", result);

            if (result.affectedRows === 0) {
                return res.status(404).send(errorResponse("No staff found with this ID: " + staffId));
            }
            return res.status(200).send(successResponse("Staff details updated Successfully with ID: " + staffId));
        }
    );
});

module.exports = router;