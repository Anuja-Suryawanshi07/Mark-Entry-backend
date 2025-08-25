mysql> use marksentryportal;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(15) UNIQUE NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

INSERT INTO user (first_name, last_name, mobile_number, email, password, role_id) VALUES
('Amit', 'Sharma', '9876543210', 'amit.sharma@example.com', 'password123', 1),   
('Priya', 'Patil', '9876543211', 'priya.patil@example.com', 'password123', 2),  
('Sneha', 'Kulkarni', '9876543212', 'sneha.kulkarni@example.com', 'password123', 3), 
('Ravi', 'Verma', '9876543213', 'ravi.verma@example.com', 'password123', 4),   
('Karan', 'Deshmukh', '9876543214', 'karan.deshmukh@example.com', 'password123', 5); 

CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

INSERT INTO role (role_id, role_name) VALUES
(1, 'Admin'),
(2, 'Coordinator'),
(3, 'Mentor'),
(4, 'Staff'),
(5, 'Student');


CREATE TABLE batch (
    batch_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_name VARCHAR(45) NOT NULL,
    is_active TINYINT NOT NULL
);

INSERT INTO batch (batch_name, is_active) VALUES
('0923', 1),
('0323', 1),
('0924', 1),
('0325', 0),
('0324', 1);

CREATE TABLE course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    batch_id INT NOT NULL,
    FOREIGN KEY (batch_id) REFERENCES batch(batch_id)
);

INSERT INTO course (course_name, batch_id) VALUES
('PG-DAC', 1),
('PG-DMC', 2),
('PG-DBDA', 3),
('PG-DITISS', 4),
('PG-DESD', 5);

CREATE TABLE student_group (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

INSERT INTO student_group (group_name, course_id) VALUES
('W1', 1),
('W2', 1),
('W1', 2),
('W3', 3),
('W1', 4);

CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    prn_number INT NOT NULL,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    FOREIGN KEY (group_id) REFERENCES student_group(group_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
/* Note: Update student table to get 'student name' in get all-students route API */
/*  
ALTER TABLE student
ADD COLUMN student_name VARCHAR(100) AFTER prn_number;

UPDATE student s
JOIN user u ON s.user_id = u.user_id
SET s.student_name = CONCAT(u.first_name, ' ', u.last_name)
WHERE u.role_id = 5;
*/

INSERT INTO student (roll_number, prn_number, group_id, user_id, created_at, updated_at) VALUES
(101, 500001, 1, 1, '2025-08-05', '2025-08-05'),
(102, 500002, 2, 2, '2025-08-05', '2025-08-05'),
(103, 500003, 3, 3, '2025-08-05', '2025-08-05'),
(104, 500004, 4, 4, '2025-08-05', '2025-08-05'),
(105, 500005, 5, 5, '2025-08-05', '2025-08-05');


CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

INSERT INTO staff (user_id, role_id, course_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 4, 2),
(4, 3, 3),
(5, 4, 4);

CREATE TABLE module (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(45) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

INSERT INTO module (module_name, course_id) VALUES
('Core Java', 1),
('DBMS', 2),
('DSA', 3),
('Advance Java', 4),
('Python', 5);

CREATE TABLE marks (
    mark_id INT NOT NULL AUTO_INCREMENT,
    student_id INT NOT NULL,
    staff_id INT NOT NULL,
    module_id INT NOT NULL,
    theory_marks INT NOT NULL,
    lab_marks INT NOT NULL,
    IA_1 INT NOT NULL,
    IA_2 INT NOT NULL,
    start_date DATE NOT NULL,
    till_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    PRIMARY KEY (mark_id),
    CONSTRAINT fk_marks_student FOREIGN KEY (student_id) REFERENCES student(student_id),
    CONSTRAINT fk_marks_staff FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
    CONSTRAINT fk_marks_module FOREIGN KEY (module_id) REFERENCES module(module_id)
);

INSERT INTO marks (mark_id, student_id, staff_id, module_id, theory_marks, lab_marks, IA_1, IA_2, start_date, till_date, status) VALUES
(1, 1, 1, 1, 40, 38, 16, 17, '2025-08-11', '2025-08-21', 'Pending'), -- Rahul graded by Amit
(2, 2, 2, 2, 42, 36, 18, 19, '2025-08-11', '2025-08-21', 'Pending'), -- Meera graded by Priya
(3, 3, 3, 3, 45, 40, 19, 18, '2025-08-11', '2025-08-21', 'Completed'), -- Anil graded by Sneha
(4, 4, 1, 1, 39, 37, 17, 16, '2025-08-11', '2025-08-21', 'Pending');  -- Sara graded by Amit
