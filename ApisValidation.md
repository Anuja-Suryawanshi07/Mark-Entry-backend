1. Role = done
2. User = done
3. Batch = done
4. Course = done
5. Staff = done
6. Module = done
7. Student = done
8. student Group
9. Marks = done


User Routes
1. getallusers =>
   http://localhost:7777/user/all-users

2. Addusers =>
   http://localhost:7777/user/add-user
```json
      {
         "firstname": "ash2",
         "lastname": "chavan1",
         "mobilenumber": "0987654328",
         "email": "abc1238@gmail.com",
         "password": "abc1238"
      }
```

3. updateUser =>
   http://localhost:7777/user/update-users/7
```json
      {
         "firstname": "ash2",
         "lastname": "chavan1",
         "mobilenumber": "0987654326",
         "email": "abc12367@gmail.com",
         "password": "abc1236"
      }
```
4. Delete user =>
   http://localhost:7777/user/delete-users/19

======================================================================
Course Route
1. getallCourse =>course/all-courses 
   http://localhost:7777/course/all-courses

2. addCourse => course/add-course
   http://localhost:7777/course/add-course
```json
      {
         "course_id": 2,
         "course_name": "DAC",
         "batch_id": 2
      }
```
Validation:
course_name should be: string and not empty

In code
if (typeof course_name !==’string’ || course_name===””) return error response

Batch_id should be positive integer
In code
batch_id = Number.parseInt(batch_id);
if(Number.isNaN(batch_id) || batch_id<0) return error response



3. updateCourse => course/update-course/:courseId
   http://localhost:7777/course/update-course/
```json
      {
         "course_id": 2,
         "course_name": "DITISS",
         "batch_id": 2
      }
```
Validation:
course_id should be positive integer
Course_name should be string and not empty
Batch_id should be positive integer

4. deleteCourse => course/delete-course/:courseId 
   http://localhost:7777/course/delete-course/3
Validation:
courseId should be positive integer

=================================================================================

Module Routes
1. getallModule => module/all-module
    http://localhost:7777/module/all-modules

2. addModule => module/add-module
   http://localhost:7777/module/add-module

```json
      {
         "module_name": "DB",
         "course_id": 2
      }
```
Validation:
module_name should be string and not empty
Course_id should be integer and positive

3. updateModule => module/update-module/:moduleId
   http://localhost:7777/module/update-module/4

```json
      {
         "module_name": "DBs",
         "course_id": 1
      }
```
module_name should be string and not empty
Course_id should be integer and positive
module_id should be integer and positive

4. deleteModule => module/delete-module/:moduleId
    http://localhost:7777/module/delete-module/4
module_id should be integer and positive 

Batch Route
1. Getall =>
   http://localhost:7777/batch/all-batch

2. addBatch => 
   http://localhost:7777/batch/add-batch

```json
      {
         "batchName": "march-2024",
         "isActive": 0
      }
```
Validation:
batchName should be string and not empty
isActive should be integer and should be either 0 or 1
In code
isActive = Number.parseInt(isActive)
if(isActive!==1 || isActive!==0) return error response


3. updateBatch => 
   http://localhost:7777/batch/update-batch/3

```json
      {
         "batchName": "march-2024",
         "isActive": 1
      }
```
Validation:
batchName should be string and not empty
isActive should be integer and either 0 or 1
Bacth_id should be integer and positive


4. deleteBatch => 
   http://localhost:7777/batch/delete-batch/3
Validation:
Batch_id should be integer and positive

Role Route
1. getAllRoles => 
   http://localhost:7777/roles/all-roles

2. addRole => 
   http://localhost:7777/roles/add-role
```json
      {
         "roleName": "Co-Ordinator"
      }
```
Validation:
roleName should be string and not empty

3. updateRole => 
   http://localhost:7777/roles/update-role/3

```json
      {
      "roleName": "CoOrdinator"
      }
```
Validation:
roleName should be string and not empty
roleId should be positive integer

4. deleteRole =>
   http://localhost:7777/roles/delete-role/3
Validation:
roleId should be positive integer

=================================================================================

Staff Route
1. GetStaff = 
   http://localhost:7777/staff/all-staff

2. addStaff => 
   http://localhost:7777/staff/add-staff

```json
      {
         "userid": 7,
         "roleid": 2,
         "courseid": 2
      }
```
Validation:
userid, roleid, courseid should be positive integers

3. updateStaff=>
   http://localhost:7777/staff/update-staff/3

```json
      {
         "staffid": 2,
         "userid": 7,
         "roleid": 1,
         "courseid": 2
      }
```
Validation:
staffid, userid, roleid, courseid should be positive integers

4. deleteStaff
   http://localhost:7777/staff/delete-staff/4
Validation:
staffid should be positive integer

=================================================================================

Student Route
1. getallStudent =>
   http://localhost:7777/student/get-all-students

2. addStudent
   http://localhost:7777/student/add-student
```json
      {
         "roll_number": 3,
         "prn_number": 1003,
         "group_id": 2,
         "user_id": 2,
         "created_at": "2025-07-31T18:30:00.000Z",
         "updated_at": "2025-08-07T18:30:00.000Z"
      }
```
Validation:
roll_number, prn_number, group_id, user_id should be positive integers
created_at and updated_at should be valid ISO date strings

Sample code for ISO date validation:
```js
function isValidISODate(dateStr) {
  return !isNaN(Date.parse(dateStr));
}
```

3. Updatestudent 
   http://localhost:7777/student/update-student/2
```json
      {
         "roll_number": 3,
         "prn_number": 1003,
         "group_id": 2,
         "user_id": 2,
         "created_at": "2025-07-31T18:30:00.000Z",
         "updated_at": "2025-08-07T18:30:00.000Z"
      }
```
Validation:
student_id should be positive integer
roll_number, prn_number, group_id, user_id should be positive integers
created_at and updated_at should be valid ISO date strings

4. deleteStudent
   http://localhost:7777/student/delete-student/2
Validation:
student_id should be positive integer

=================== Not done =======================

Student group Route

====================================================

Marks Route
1. get all marks
   http://localhost:7777/marks/all-marks

2. Add-marks
   http://localhost:7777/marks/add-marks

```json
      {
         "studentId": 1,
         "moduleId": 1,
         "labTestMarks": 30,
         "mcqMarks": 18,
         "assignmentMarks": 20,
         "totalMarks": 70,
         "examDate": "2025-08-04"
      }
```
Validation:
studentId and moduleId should be positive integers
labTestMarks, mcqMarks, assignmentMarks, totalMarks should be integers and >= 0
examDate should be valid date string (YYYY-MM-DD)

Sample code for date string validation:
```js
function isValidDate(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(Date.parse(dateStr));
}
```

3. update-marks => 
   http://localhost:7777/marks/update-marks/1

```json
      {  
         "markId":1,
         "studentId": 1,
         "moduleId": 1,
         "labTestMarks": 25,
         "mcqMarks": 20,
         "assignmentMarks": 20,
         "totalMarks": 70,
         "examDate": "2025-08-04"
      }
```
Validation:
markId, studentId, moduleId should be positive integers
labTestMarks, mcqMarks, assignmentMarks, totalMarks should be integers and >= 0
examDate should be valid date string (YYYY-MM-DD)

4. Delete-marks =>
   http://localhost:7777/marks/delete-marks/4
Validation:
markId should be positive integer

