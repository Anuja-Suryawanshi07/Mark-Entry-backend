batch Routes api
http://localhost:7777/batch/all-batch ----> All batch
http://localhost:7777/batch/add-batch ----> Add batch
http://localhost:7777/batch/update-batch/7 ----> Update batch
http://localhost:7777/batch/delete-batch/7 ----> Delete batch

course Routes api
http://localhost:7777/course/all-courses ----> All courses
http://localhost:7777/course/add-course ----> Add course
http://localhost:7777/course/update-course/7 ----> Update course
http://localhost:7777/course/delete-course/7 ----> Delete course

marks Routes api
http://localhost:7777/marks/all-marks ----> All marks
http://localhost:7777/marks/add-marks ----> Add marks
http://localhost:7777/marks/update-marks/6 ----> Update marks
http://localhost:7777/marks/delete-marks/6 ----> Delete marks

module Routes api
http://localhost:7777/module/all-modules ----> All modules
http://localhost:7777/module/add-module ----> Add module
http://localhost:7777/module/update-module/5 ----> Update module
http://localhost:7777/module/delete-module/2 ----> Delete module

role Routes api
http://localhost:7777/roles/all-roles ----> All role
http://localhost:7777/roles/add-role ---->Add role
http://localhost:7777/roles/update-role/6 ----> Update role
http://localhost:7777/roles/delete-role/6 ----> Delete role

staff Routes api
http://localhost:7777/staff/all-staff ----> All staff
http://localhost:7777/staff/add-staff ----> Add staff
http://localhost:7777/staff/update-staff/6 ----> Update staff
http://localhost:7777/staff/delete-staff/6 ----> Delete staff
http://localhost:7777/staff/dashboard ----> staff dashboard

student_group Routes api
http://localhost:7777/student-groups/get-all-groups ----> All student groups
http://localhost:7777/student-groups/add-student-group ----> Add student groups
http://localhost:7777/student-groups/update-group/11 ----> Update student group 
http://localhost:7777/student-groups/delete-group/11 ----> Delete student group

student Route api
http://localhost:7777/student/get-all-students ----> All students
http://localhost:7777/student/add-student ----> Add student
http://localhost:7777/student/update-student/5 ----> Update student
http://localhost:7777/student/delete-student/6 ----> delete student

user Route api
http://localhost:7777/user/all-users ----> All users
http://localhost:7777/user/add-user ----> Add user
http://localhost:7777/user/update-users/6 ----> Update user
http://localhost:7777/user/delete-users/7 ----> Delete user
http://localhost:7777/user/register ----> Register user
http://localhost:7777/user/login ----> user Login


admin api
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


