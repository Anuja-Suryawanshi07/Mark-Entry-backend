
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    HOST: process.env.HOST,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    USER_TABLE: process.env.USER_TABLE,
    ROLE_TABLE: process.env.ROLE_TABLE,
    COURSE_TABLE: process.env.COURSE_TABLE,
    MODULE_TABLE: process.env.MODULE_TABLE,
    STUDENT_TABLE: process.env.STUDENT_TABLE,
    STUDENT_GROUP_TABLE: process.env.STUDENT_GROUP_TABLE,
    BATCH_TABLE: process.env.BATCH_TABLE,
    MARKS_TABLE: process.env.MARKS_TABLE,
    STAFF_TABLE: process.env.STAFF_TABLE,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    DB_PORT: process.env.DB_PORT
}
