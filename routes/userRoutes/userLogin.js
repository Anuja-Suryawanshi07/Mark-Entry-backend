const express = require("express");

const router = express.Router();

//POST: User login
//http://localhost:7777/user/login

/* { 
    "email": "john.doe@example.com",
    "password": "SecurePass123"
    }
*/

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  //validate fields
  if (!email || !password) {
    return res.status(400).json({
      status: "Error",
      message: "Email and password are required",
    });
  }

  //check user credentials

  const sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
  pool.query(sql, [email, password], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "Error", message: error.message });
    }
    if (results.length === 0) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid email or Password",
      });
    }
    const user = results[0];

    // Decide landing page based on role_id

    const roleId = Number(user.role_id);

    let landingPage = "";
    if (roleId === 5) {
      landingPage = "/student/dashboard"; //student landing page
    } else if (roleId === 1 || roleId === 2 || roleId === 3 || roleId === 4) {
      landingPage = "/staff/dashboard"; // staff landing page
    } else {
      landingPage = "/unknown-role";
    }

    return res.status(200).json({
      status: "Success",
      message: `Welcome, ${user.first_name} ${user.last_name}`,
      data: {
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role_id,
      },
      landingPage: landingPage, // frontend can redirect to this
    });
  });
}); 

module.exports = router; 
