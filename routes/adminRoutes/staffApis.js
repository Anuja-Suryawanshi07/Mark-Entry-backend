const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STAFF_TABLE, ROLE_TABLE, USER_TABLE, COURSE_TABLE } = require("../../config");

// GET all Staff

//http://localhost:7777/admin/all-staff

router.get("/all-staff", (req, res) => {
  const sql = `Select staff_id , concat(u.first_name, ' ', u.last_name) staff_name, u.email, r.role_name, c.course_name  from ${STAFF_TABLE} s
 join ${ROLE_TABLE} r on s.role_id = r.role_id  
 join ${USER_TABLE} u on s.user_id = u.user_id 
 join ${COURSE_TABLE} c on s.course_id = c.course_id;
`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Staff."));
    }
    return res.send(successResponse(results));
  });
});

// POST: add new course
//http://localhost:7777/admin/add-staff
/*
{
  "first_name": "John",
  "last_name": "Doe",
  "mobile_number": "9876543210",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "course_id": 2,
  "role_id": 1
}
  */
router.post("/add-staff", (req, res) => {

  let {  first_name, last_name, mobile_number, email, password, course_id, role_id} = req.body;

  

  role_id = Number.parseInt(role_id);
  if (Number.isNaN(role_id) || role_id < 0) {
    return res.status(400).send(errorResponse("Invalid role Id"))
  }

  course_id = Number.parseInt(course_id);
  if (Number.isNaN(course_id) || course_id < 0) {
    return res.status(400).send(errorResponse("Invalid course Id"))
  }

  //staff name, email, role, course, Action
    const sql = `INSERT INTO ${USER_TABLE} (  first_name, last_name, mobile_number, email, password,role_id) VALUES (?, ?, ?, ?, ?,?)`;

  const sql1 = `INSERT INTO ${STAFF_TABLE} (  user_id, role_id, course_id ) VALUES (?, ?, ?)`;


  pool.query(
    sql, [first_name, last_name, mobile_number, email, password,role_id], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      pool.query("select * from user where email=?",[email], (userSelectError, userSelectResult)=>{
        if(userSelectError){
          return res.status(500).send(errorResponse(userSelectError));
        }
        let insertedUser = userSelectResult[0];
        let user_id = insertedUser.user_id;
        pool.query(sql1, [user_id, role_id, course_id], (staffInsertError,staffInsertResult)=>{
          if(staffInsertError){
            return res.status(500).send(errorResponse(staffInsertError))
          }
          return res.status(201).send(successResponse("sucessful inserted staff Id"))
        })

      });
      
    }
  );
});

// PUT: update an user by Id // assign course to co-ordinator
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
  console.log("staff id", staff_id)
  if (Number.isNaN(staff_id) || staff_id < 0) {
    return res.status(400).send(errorResponse("Invalid staff Id"))
  }


  const sql = `UPDATE ${STAFF_TABLE}
                SET course_id = ?
                WHERE staff_id = ?`;

  pool.query(
    sql,
    [role_id, course_id, staff_id],
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

// DELETE: delete an user
//http://localhost:7777/admin/delete-staff/7
router.delete("/delete-staff/:staffId", (req, res) => {
  let { staffId } = req.params;

  staffId = Number.parseInt(staffId);
  if (Number.isNaN(staffId) || staffId < 0) {
    return res.status(400).send(errorResponse("Invalid staff Id"))
  }

  const sql = `DELETE FROM ${STAFF_TABLE}
                WHERE staff_id = ?`;
  pool.query(sql, [staffId], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }
    console.log("result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).send(errorResponse("No Staff Found with ID: " + staffId));
    }
    return res.status(200).send(successResponse(
      " Staff DELETED Successfully with ID: " + staffId));
  });
});

module.exports = router;

