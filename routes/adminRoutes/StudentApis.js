const express = require("express");
const pool = require("../../config/db");
const promisePool = require("../../config/db-promise");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE, BATCH_TABLE, COURSE_TABLE, USER_TABLE, STUDENT_GROUP_TABLE } = require("../../config");

// GET all students
// http://localhost:7777/admin/get-student-details

//getStudentDetails
router.get("/get-student-details", (req, res) => {
  const sql = `select s.student_id, concat(u.first_name, ' ', u.last_name) student_name, 
  s.prn_number, g.group_name, c.course_name, b.batch_name from ${STUDENT_TABLE} s
  join ${USER_TABLE} u on  u.user_id = s.user_id
  join \`${STUDENT_GROUP_TABLE}\` g on s.group_id=g.group_id 
  join ${COURSE_TABLE} c on g.course_id=c.course_id 
  join ${BATCH_TABLE} b on c.batch_id=b.batch_id;`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No students found."));
    }
    return res.send(successResponse(results));
  });
});

//http://localhost:7777/admin/add-staff
router.post("/add-student", (req, res) => {

  let { first_name, last_name, mobile_number, email, password, roll_number, prn_number, group_id } = req.body;

  // course_id = Number.parseInt(course_id);
  // if (Number.isNaN(course_id) || course_id < 0) {
  //   return res.status(400).send(errorResponse("Invalid course Id"))
  // }

  //staff name, email, role, course, Action
  const sql = `INSERT INTO ${USER_TABLE} (  first_name, last_name, mobile_number, email, password) VALUES (?, ?, ?, ?, ?)`;

  const sql1 = `INSERT INTO ${STUDENT_TABLE} ( user_id, prn_number, group_id ) VALUES (?, ?, ?)`;


  pool.query(
    sql, [first_name, last_name, mobile_number, email, password], (error, result) => {
      if (error) {
        return res.status(500).send(errorResponse(error));
      }
      pool.query("select * from user where email=?", [email], (userSelectError, userSelectResult) => {
        if (userSelectError) {
          return res.status(500).send(errorResponse(userSelectError));
        }
        let insertedUser = userSelectResult[0];
        let user_id = insertedUser.user_id;
        pool.query(sql1, [user_id, prn_number, group_id], (staffInsertError, staffInsertResult) => {
          if (staffInsertError) {
            return res.status(500).send(errorResponse(staffInsertError))
          }
          return res.status(201).send(successResponse("sucessful inserted student Id"))
        })

      });

    }
  );
});

//http://localhost:7777/admin/add-student-promise
// {
//   "first_name": "Alice",
//   "last_name": "Smith",
//   "mobile_number": "9876543137",
//   "email": "alice.smith7@example.com",
//   "password": "securePassword123",

//   "prn_number": "123456789",
//   "group_id": 2
// }

router.post("/add-student-promise", async (req, res) => {

  let {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    prn_number, // optional, can be empty initially
    group_id,   // optional, can be empty initially
  } = req.body || {};


  // course_id = Number.parseInt(course_id);
  // if (Number.isNaN(course_id) || course_id < 0) {
  //   return res.status(400).send(errorResponse("Invalid course Id"))
  // }
  if (!first_name || !last_name || !email || !mobile_number || !password) {
    return res.status(400).json({
      status: "Error",
      message: "First name, Last name, Email, Mobile number and Password are required",
    });
  }

  let connection = null;
  try {
    connection = await promisePool.getConnection();
    await connection.beginTransaction();

    const checkUserSql = `
    SELECT * FROM user WHERE email = ? OR mobile_number = ?
  `;
    let [checkUserResult] = await connection.query(checkUserSql, [email, mobile_number]);
    if (checkUserResult.length > 0) {
      return res.status(400).json(errorResponse(
        "Email or Mobile number already registered"
      ));
    }
    const insertUserSql = `
      INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
      VALUES (?, ?, ?, ?, ?, 5)
    `;
    let [insertUserResult] = await connection.query(
      insertUserSql,
      [first_name, last_name, email, mobile_number, password]);

    const user_id = insertUserResult.insertId; // Newly created user ID
    const student_name = `${first_name} ${last_name}`;

    const safePrn = prn_number && prn_number.toString().trim() !== "" ? prn_number : null;
    const safeGroup = group_id && group_id.toString().trim() !== "" ? group_id : null;

    const insertStudentSql = `
          INSERT INTO student (prn_number, student_name, group_id, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, CURDATE(), CURDATE())
        `;
    const [insertStudentResult] = await connection.query(
      insertStudentSql,
      [safePrn, student_name, safeGroup, user_id]);
    await connection.commit();
    return res.status(201).send(successResponse("sucessful inserted student Id"));
  }
  catch (error) {
    if (connection !== null) {
      await connection.rollback();
    }
    return res.status(500).send(errorResponse(error));
  }
});

//http://localhost:7777/admin/update-student/2
// {

//   "prn_number": "1234567890",
//   "group_id": 2,
//   "user_id": 2
// }
router.put("/update-student/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { prn_number, group_id, user_id } = req.body;

  if (!prn_number || !group_id || !user_id) {
    return res.send(errorResponse("All fields are required"));
  }

  // Step 1: Check if user exists
  const checkUserSql = `SELECT user_id FROM ${USER_TABLE} WHERE user_id = ?`;
  pool.query(checkUserSql, [user_id], (err, userResult) => {
    if (err) return res.send(errorResponse(err));

    if (userResult.length === 0) {
      return res.send(errorResponse(`User with ID ${user_id} does not exist`));
    }

    // Step 2: Update student record
    const updateSql = `
      UPDATE ${STUDENT_TABLE}
      SET  prn_number = ?, group_id = ?, user_id = ?, updated_at = CURDATE()
      WHERE student_id = ?
    `;

    pool.query(updateSql, [prn_number, group_id, user_id, studentId], (error, result) => {
      if (error) {
        return res.send(errorResponse(error));
      }

      if (result.affectedRows === 0) {
        return res.send(errorResponse(`No Student found with this ID: ${studentId}`));
      }

      return res.send(successResponse(`Student details updated successfully with ID: ${studentId}`));
    });
  });
});

//http://localhost:7777/admin/delete-student/8
router.delete("/delete-student/:studentId", (req, res) => {
  const { studentId } = req.params;

  const sql = `DELETE FROM ${STUDENT_TABLE} WHERE student_id = ?`;

  pool.query(sql, [studentId], (error, result) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        error,
      });
    }

    if (result.affectedRows === 0) {
      return res.send({
        status: "Success",
        message: "No Student Found with ID: " + studentId,
      });
    }

    return res.send({
      status: "Success",
      message: "Student DELETED Successfully with ID: " + studentId,
    });
  });
});



module.exports = router;
