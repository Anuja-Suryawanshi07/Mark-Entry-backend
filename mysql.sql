mysql> use marksentryportal;
Database changed

mysql> CREATE TABLE `user` (
    ->   `user\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `first\_name` VARCHAR(45) NOT NULL,
    ->   `last\_name` VARCHAR(45) NOT NULL,
    ->   `mobile\_number` VARCHAR(15) NOT NULL,
    ->   `email` VARCHAR(45) NOT NULL,
    ->   `password` VARCHAR(45) NOT NULL
    -> );

mysql> ALTER TABLE `user`
    -> MODIFY COLUMN `mobile_number` VARCHAR(15) NOT NULL UNIQUE,
    -> MODIFY COLUMN `email` VARCHAR(60) NOT NULL UNIQUE,
    -> MODIFY COLUMN `password` VARCHAR(60) NOT NULL;
Query OK, 0 rows affected (0.17 sec)

mysql> INSERT INTO `user` (`first\_name`, `last\_name`, `mobile\_number`, `email`, `password`) VALUES
    -> ('Amit', 'Sharma', '9876543210', 'amit.sharma@example.com', 'Pass@123'),
    -> ('Priya', 'Verma', '9123456789', 'priya.verma@example.com', 'Priya!2024'),
    -> ('Ravi', 'Patil', '9988776655', 'ravi.patil@example.com', 'Ravi#456'),
    -> ('Sneha', 'Rao', '9012345678', 'sneha.rao@example.com', 'Sneha@789'),
    -> ('Karan', 'Mehta', '9765432109', 'karan.mehta@example.com', 'Karan123$');

mysql> select * from user;
+---------+------------+-----------+---------------+-------------------------+------------+
| user_id | first_name | last_name | mobile_number | email                   | password   |
+---------+------------+-----------+---------------+-------------------------+------------+
|       1 | Amit       | Sharma    | 9876543210    | amit.sharma@example.com | Pass@123   |
|       2 | Priya      | Verma     | 9123456789    | priya.verma@example.com | Priya!2024 |
|       3 | Ravi       | Patil     | 9988776655    | ravi.patil@example.com  | Ravi#456   |
|       4 | Sneha      | Rao       | 9012345678    | sneha.rao@example.com   | Sneha@789  |
|       5 | Karan      | Mehta     | 9765432109    | karan.mehta@example.com | Karan123$  |
+---------+------------+-----------+---------------+-------------------------+------------+

mysql> CREATE TABLE `role` (
    ->   `role\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `role\_name` VARCHAR(45) NOT NULL
    -> );
mysql> INSERT INTO `role` (`role\_name`) VALUES
    -> ('Mentor'),
    -> ('Lab-Mentor'),
    -> ('Admin'),
    -> ('Teacher'),
    -> ('Student');

mysql> select * from role;
+---------+------------+
| role_id | role_name  |
+---------+------------+
|       1 | Mentor     |
|       2 | Lab-Mentor |
|       3 | Admin      |
|       4 | Teacher    |
|       5 | Student    |
+---------+------------+

mysql> CREATE TABLE `batch` (
    ->   `batch\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `batch\_name` VARCHAR(45) NOT NULL,
    ->   `is\_active` TINYINT NOT NULL
    -> );
mysql> INSERT INTO `batch` (`batch\_name`, `is\_active`) VALUES
    -> ( 0923, 1),
    -> ( 0323, 1),
    -> ( 0924, 1),
    -> ( 0325, 0),
    -> ( 0324, 1);

mysql> select * from batch;
+----------+------------+-----------+
| batch_id | batch_name | is_active |
+----------+------------+-----------+
|        1 | 923        |         1 |
|        2 | 323        |         1 |
|        3 | 924        |         1 |
|        4 | 325        |         0 |
|        5 | 324        |         1 |
+----------+------------+-----------+

mysql> CREATE TABLE `course` (
    ->   `course\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `course\_name` VARCHAR(45) NOT NULL,
    ->   `batch\_id` INT NOT NULL,
    ->   FOREIGN KEY (`batch\_id`) REFERENCES `batch`(`batch\_id`)
    -> );

mysql> INSERT INTO `course` (`course\_name`, `batch\_id`) VALUES
    -> ('PG-DAC', 1),
    -> ('PG-DMC', 2),
    -> ('PG-DBDA', 3),
    -> ('PG-DITISS', 4),
    -> ('PG-DESD', 5);

mysql> select * from course;
+-----------+-------------+----------+
| course_id | course_name | batch_id |
+-----------+-------------+----------+
|         1 | PG-DAC      |        1 |
|         2 | PG-DMC      |        2 |
|         3 | PG-DBDA     |        3 |
|         4 | PG-DITISS   |        4 |
|         5 | PG-DESD     |        5 |
+-----------+-------------+----------+

mysql> CREATE TABLE `student\_group` (
    ->   `group\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `group\_name` VARCHAR(45) NOT NULL,
    ->   `course\_id` INT NOT NULL,
    ->   FOREIGN KEY (`course\_id`) REFERENCES `course`(`course\_id`)
    -> );

mysql> INSERT INTO `student\_group` (`group\_name`, `course\_id`) VALUES
    -> ('W1', 1),  -- W1 for PG-DAC
    -> ('W2', 1),  -- W2 for PG-DAC
    -> ('W1', 2),  -- W1 for PG-DMC
    -> ('W3', 3),  -- W3 for PG-DBDA
    -> ('W1', 4);  -- W1 for PG-DITISS

mysql> select * from student_group;
+----------+------------+-----------+
| group_id | group_name | course_id |
+----------+------------+-----------+
|        1 | W1         |         1 |
|        2 | W2         |         1 |
|        3 | W1         |         2 |
|        4 | W3         |         3 |
|        5 | W1         |         4 |
|        6 | W1         |         1 |
|        7 | W2         |         1 |
|        8 | W1         |         2 |
|        9 | W3         |         3 |
|       10 | W2         |         4 |
+----------+------------+-----------+


mysql> CREATE TABLE `student` (
    ->   `student\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `roll\_number` INT NOT NULL,
    ->   `prn\_number` INT NOT NULL,
    ->   `group\_id` INT NOT NULL,
    ->   `user\_id` INT NOT NULL,
    ->   `created\_at` DATE NOT NULL,
    ->   `updated\_at` DATE NOT NULL,
    ->   FOREIGN KEY (`group\_id`) REFERENCES `group`(`group\_id`),
    ->   FOREIGN KEY (`user\_id`) REFERENCES `user`(`user\_id`)
    -> );

mysql> INSERT INTO `student` (`roll\_number`, `prn\_number`, `group\_id`, `user\_id`, `created\_at`, `updated\_at`) VALUES
    -> (101, 500001, 1, 1, '2025-08-05', '2025-08-05'),
    -> (102, 500002, 2, 2, '2025-08-05', '2025-08-05'),
    -> (103, 500003, 3, 3, '2025-08-05', '2025-08-05'),
    -> (104, 500004, 4, 4, '2025-08-05', '2025-08-05'),
    -> (105, 500005, 5, 5, '2025-08-05', '2025-08-05');

mysql> select * from student;
+------------+-------------+------------+----------+---------+------------+------------+
| student_id | roll_number | prn_number | group_id | user_id | created_at | updated_at |
+------------+-------------+------------+----------+---------+------------+------------+
|          1 |         101 |     500001 |        1 |       1 | 2025-08-05 | 2025-08-05 |
|          2 |         102 |     500002 |        2 |       2 | 2025-08-05 | 2025-08-05 |
|          3 |         103 |     500003 |        3 |       3 | 2025-08-05 | 2025-08-05 |
|          4 |         104 |     500004 |        4 |       4 | 2025-08-05 | 2025-08-05 |
|          5 |         105 |     500005 |        5 |       5 | 2025-08-05 | 2025-08-05 |
+------------+-------------+------------+----------+---------+------------+------------+

mysql> CREATE TABLE `staff` (
    ->   `staff\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `user\_id` INT NOT NULL,
    ->   `role\_id` INT NOT NULL,
    ->   `course\_id` INT NOT NULL,
    ->   FOREIGN KEY (`user\_id`) REFERENCES `user`(`user\_id`),
    ->   FOREIGN KEY (`role\_id`) REFERENCES `role`(`role\_id`),
    ->   FOREIGN KEY (`course\_id`) REFERENCES `course`(`course\_id`)
    -> );

mysql> INSERT INTO `staff` (`user\_id`, `role\_id`, `course\_id`) VALUES
    -> (1, 1, 1),  -- Amit as Mentor for PG-DAC
    -> (2, 2, 1),  -- Priya as Lab-Mentor for PG-DAC
    -> (3, 4, 2),  -- Ravi as Teacher for PG-DMC
    -> (4, 3, 3),  -- Sneha as Admin for PG-DBDA
    -> (5, 4, 4);  -- Karan as Teacher for PG-DITISS

mysql> select * from staff;
+----------+---------+---------+-----------+
| staff_id | user_id | role_id | course_id |
+----------+---------+---------+-----------+
|        1 |       1 |       1 |         1 |
|        2 |       2 |       2 |         1 |
|        3 |       3 |       4 |         2 |
|        4 |       4 |       3 |         3 |
|        5 |       5 |       4 |         4 |
+----------+---------+---------+-----------+


mysql> CREATE TABLE `module` (
    ->   `module\_id` INT AUTO_INCREMENT PRIMARY KEY,
    ->   `module\_name` VARCHAR(45) NOT NULL,
    ->   `course\_id` INT NOT NULL,
    ->   FOREIGN KEY (`course\_id`) REFERENCES `course`(`course\_id`)
    -> );

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