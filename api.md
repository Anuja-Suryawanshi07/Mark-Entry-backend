batch Routes api
http://localhost:7777/batch/all-batch ----> All batch
http://localhost:7777/batch/batch/:batchId ----> Get batch by Id
 http://localhost:7777/batch/batch?isActive=active ---> get batch by status(isActive)
http://localhost:7777/batch/add-batch ----> Add batch
http://localhost:7777/batch/update-batch/:batchId ----> Update batch
http://localhost:7777/batch/update-batch-status/:batchId ----> update batch status by Id.
http://localhost:7777/batch/delete-batch/:batchId ----> Delete batch

coordinator Routes api

http://localhost:7777/coordinator/approve-task/:markId ----> task Approved by markId
http://localhost:7777/coordinator/dashboard ---->Dashboard
http://localhost:7777/coordinator/approved-tasks ----> get all Approved tasks by coordinator
http://localhost:7777/coordinator/submitted-tasks ----> get all submitted tasks by Mentor(waiting for Approval of coordinator)
http://localhost:7777/coordinator/all-students-with-course?courseName=PG-DMC ----> get student by course name.

courseByBatchRoutes api
http://localhost:7777/course/get-course/:batchId ---->

course Routes api
http://localhost:7777/course/all-courses ----> All courses
http://localhost:7777/course/get-course/:courseId ----> get course by Id
http://localhost:7777/course/add-course ----> Add course
http://localhost:7777/course/update-course/:courseId ----> Update course
http://localhost:7777/course/delete-course/:courseId ----> Delete course

marks Routes api
http://localhost:7777/marks/all-marks ----> All marks
http://localhost:7777/marks/add-marks ----> Add marks
http://localhost:7777/marks/update-marks/:markId ----> Update marks
http://localhost:7777/marks/delete-marks/:markId ----> Delete marks

module Routes api
http://localhost:7777/module/all-modules ----> All modules
http://localhost:7777/module/add-module ----> Add module
http://localhost:7777/module/update-module/:moduleId ----> Update module
http://localhost:7777/module/delete-module/:moduleId ----> Delete module
http://localhost:7777/module/get-module/:moduleId ----> Get all modules by module_Id
http://localhost:7777/module/all/course/:courseId ----> get module by course_Id

Mentor Route api
http://localhost:7777/mentor/show-all-pending-tasks/:staffId ----> show all pending tasks
http://localhost:7777/mentor/add-mark ----> add task
http://localhost:7777/mentor/show-all-approved-task/:staffId ----> Get all Approved tasks
http://localhost:7777/mentor/dashboard ----> dashboard
http://localhost:7777/mentor/submit-task/:markId ----> task Assign

role Routes api
http://localhost:7777/roles/all-roles ----> All role
http://localhost:7777/roles/add-role ---->Add role
http://localhost:7777/roles/update-role/:roleId ----> Update role
http://localhost:7777/roles/delete-role/:roleId ----> Delete role

staff Routes api
http://localhost:7777/staff/all-staff ----> All staff
http://localhost:7777/staff/add-staff ----> Add staff
http://localhost:7777/staff/update-staff/:staffId ----> Update staff
http://localhost:7777/staff/delete-staff/:staffId ----> Delete staff
http://localhost:7777/staff/dashboard ----> staff dashboard
http://localhost:7777/staff/all-tasks ----> get all Tasks

student_group Routes api
http://localhost:7777/student_group/get-all-groups ----> All student groups
http://localhost:7777/student_group/add-student-group ----> Add student groups
http://localhost:7777/student_group/update-group/:groupId----> Update student group 
http://localhost:7777/student_group/delete-group/:groupId ----> Delete student group
http://localhost:7777/student_group/course/:courseId ---->get student group by course ID
http://localhost:7777/student_group/:groupId ----> get student group by ID

student Route api
http://localhost:7777/student/get-all-students ----> All students
http://localhost:7777/student/add-student ----> Add student
http://localhost:7777/student/update-student/:studentId ----> Update student
http://localhost:7777/student/delete-student/:studentId ----> delete student
 http://localhost:7777/student/marks/:studentId ----> get student marks by Id

user Route api
http://localhost:7777/user/all-users ----> All users
http://localhost:7777/user/add-user ----> Add user
http://localhost:7777/user/update-users/:userId ----> Update user
http://localhost:7777/user/delete-users/:userId ----> Delete user
http://localhost:7777/user/register ----> Register user
http://localhost:7777/user/login ----> user Login


admin api

 ----> get all batch
http://localhost:7777/admin/add-batch ----> add batch
1. http://localhost:7777/admin/all-batch ----> get all batch
2. http://localhost:7777/admin/add-batch ----> add batch
{            
    "batchName": "mar-2025",
    "isActive": 0
}
3. http://localhost:7777/admin/update-batch-status/7 ----> update batch(isActive field)

{
    "isActive": 1
}

4. http://localhost:7777/admin/all-courses ----> get all courses
5. http://localhost:7777/admin/add-course ----> add course
{
    "course_name": "DBDA",
    "batch_id": 6
}
6. http://localhost:7777/admin/update-course/4 ----> update course
{
    "course_name": "DITISS"
}
7. http://localhost:7777/admin/delete-course/10 ----> delete course

8. http://localhost:7777/admin/all-modules ----> get all module
9. http://localhost:7777/admin/all/course/:courseId ----> get all module by course id
10. http://localhost:7777/admin/add-module ----> add module
{
    "module_name": "Core Java",
    "course_id": 2
}

11. http://localhost:7777/admin/update-module/:moduleId ----> update module

{
    "module_name": "python",
    "course_id": 2
}

12. http://localhost:7777/admin/delete-module/:moduleId ----> delete module


13. http://localhost:7777/admin/get-all-groups ----> get all groups

14. http://localhost:7777/admin/add-student-group ----> add group
{
    "group_name": "W1",
    "course_id": 2
}

15. http://localhost:7777/admin/update-group/:groupId ----> update student group

{
    "group_name": "W3",
    "course_id": 2
}

16. http://localhost:7777/admin/delete-group/:groupId ----> add student to group

17. http://localhost:7777/admin/all-staff ---->all staff

18. http://localhost:7777/admin/add-staff -----> add Staff

{
  "first_name": "John",
  "last_name": "Doe",
  "mobile_number": "9876543216",
  "email": "john1.doe@example.com",
  "password": "securePassword123",
  "course_id": 2,
  "role_id": 1
}

19. http://localhost:7777/admin/update-staff/6 -----> update staff
  {
    "role_id":1,
    "course_id":2
}

20. http://localhost:7777/admin/delete-staff/1 -------> delete staff

21. http://localhost:7777/admin/get-student-details ----> get student

22. http://localhost:7777/admin/add-student-promise ---> add student 

   {
  "first_name": "Alice",
  "last_name": "Smith",
  "mobile_number": "9876543137",
  "email": "alice.smith7@example.com",
  "password": "securePassword123",
  
  "prn_number": "123456789",
  "group_id": 2
}

23. http://localhost:7777/admin/update-student/2 ----> update student
   {
  
  "prn_number": "1234567890",
  "group_id": 2,
  "user_id": 2
}
24. http://localhost:7777/admin/delete-student/8 -----> delete student

25. http://localhost:7777/admin/group-course/2 --> addGroupByCourse


