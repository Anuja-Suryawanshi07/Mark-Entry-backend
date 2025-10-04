const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// DELETE: delete an Marks
//http://localhost:7777/marks/delete-marks/6

router.delete("/delete-marks/:mark_Id",(req,res) => {
  const { mark_Id } = req.params;
  const sql = `DELETE FROM ${ MARKS_TABLE }
                WHERE mark_id = ?`;
    pool.query(sql, [mark_Id], (error, result) => {
    if (error) {
      return res.send(error);
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No Marks Found with ID: " + mark_Id,
      });
    }
    return res.send({
      status: "Success",
      message: " Marks DELETED Successfully with ID: " + mark_Id,
    });
  });
});

module.exports = router;            
