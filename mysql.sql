mysql> use marksentryportal;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
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
    role_name VARCHAR(45) NOT NULL
);

INSERT INTO role (role_name) VALUES
('Student'),
('Staff'),
('Admin'),
('Coordinator'),
('Mentor');

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

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
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
    role_name VARCHAR(45) NOT NULL
);

INSERT INTO role (role_name) VALUES
('Student'),
('Staff'),
('Admin'),
('Coordinator'),
('Mentor');

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
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(45) NOT NULL,
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
    group_name VARCHAR(45) NOT NULL,
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
    roll_number INT NOT NULL,
    prn_number INT NOT NULL,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    FOREIGN KEY (group_id) REFERENCES `group`(student_group_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

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

mysql> INSERT INTO `module` (`module\_name`, `course\_id`) VALUES
    -> ('Core Java', 1),       -- For PG-DAC
    -> ('DBMS', 2),            -- For PG-DMC
    -> ('DSA', 3),             -- For PG-DBDA
    -> ('Advance Java', 4),    -- For PG-DITISS
    -> ('Python', 5);          -- For PG-DESD

mysql> select * from module;
+-----------+--------------+-----------+
| module_id | module_name  | course_id |
+-----------+--------------+-----------+
|         1 | Core Java    |         1 |
|         2 | DBMS         |         2 |
|         3 | DSA          |         3 |
|         4 | Advance Java |         4 |
|         5 | Python       |         5 |
+-----------+--------------+-----------+

mysql> CREATE TABLE `marks` (
    ->   `mark\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `student\_id` INT NOT NULL,
    ->   `module\_id` INT NOT NULL,
    ->   `lab\_test\_marks` INT NOT NULL,
    ->   `mcq\_marks` INT NOT NULL,
    ->   `assignment\_marks` INT NOT NULL,
    ->   `total\_marks` INT NOT NULL,
    ->   `exam\_date` DATE NOT NULL,
    ->   FOREIGN KEY (`student\_id`) REFERENCES `student`(`student\_id`),
    ->   FOREIGN KEY (`module\_id`) REFERENCES `module`(`module\_id`)
    -> );
mysql> INSERT INTO `marks` (`student\_id`, `module\_id`, `lab\_test\_marks`, `mcq\_marks`, `assignment\_marks`, `total\_marks`, `exam\_date`) VALUES
    -> (1, 1, 18, 22, 20, 60, '2025-08-05'),  -- Core Java
    -> (2, 2, 20, 19, 21, 60, '2025-08-05'),  -- DBMS
    -> (3, 3, 17, 20, 18, 55, '2025-08-05'),  -- DSA
    -> (4, 4, 15, 18, 17, 50, '2025-08-05'),  -- Advance Java
    -> (5, 5, 22, 23, 25, 70, '2025-08-05');  -- Python

mysql> select * from marks;
+---------+------------+-----------+----------------+-----------+------------------+-------------+------------+
| mark_id | student_id | module_id | lab_test_marks | mcq_marks | assignment_marks | total_marks | exam_date  |
+---------+------------+-----------+----------------+-----------+------------------+-------------+------------+
|       1 |          1 |         1 |             18 |        22 |               20 |          60 | 2025-08-05 |
|       2 |          2 |         2 |             20 |        19 |               21 |          60 | 2025-08-05 |
|       3 |          3 |         3 |             17 |        20 |               18 |          55 | 2025-08-05 |
|       4 |          4 |         4 |             15 |        18 |               17 |          50 | 2025-08-05 |
|       5 |          5 |         5 |             22 |        23 |               25 |          70 | 2025-08-05 |
+---------+------------+-----------+----------------+-----------+------------------+-------------+------------+