1. Staff Registration --> POST http://localhost:7777/admin/add-staff
{
  "first_name": "John1",
  "last_name": "Doe",
  "mobile_number": "9876547761",
  "email": "john1.doe5@example.com",
  "password": "securePassword125",
  "course_id": 2,
  "role_id": 2
}
role_id 2 is Coordinator
course_id 2 Course: DMC batch: 0323

2. staff Login --> POST http://localhost:7777/user/login
 {"email": "john1.doe5@example.com",
  "password": "securePassword125"}


3. get all staff --> GET http://localhost:7777/admin/all-staff
    get all staff with course --> GET http://localhost:7777/coordinator/all-staff-with-course?courseName=ditiss

4. Add batch --> POST http://localhost:7777/admin/add-batch
{
    "batchName": "apr-2025",
    "isActive": 0
}

5. Get All Batch --> GET http://localhost:7777/admin/all-batch

6. Add course to batch --> POST http://localhost:7777/admin/add-course
{
    "course_name": "DBDA",
    "batch_id": 7
}

7. Get all course by batch --> 
GET http://localhost:7777/admin/get-all-courses-by-batch?batch_name=0323

8. Add module to course --> POST http://localhost:7777/admin/add-module
{
    "module_name": "python",
    "course_id": 8
}

9. Show all module --> GET http://localhost:7777/admin/all-modules

10. get all module by course --> GET http://localhost:7777/admin/all/course/8

11. Add group to course --> POST http://localhost:7777/admin/add-student-group
{
    "group_name": "d1",
    "course_id": 8
}

12. Show all group --> GET http://localhost:7777/admin/get-all-groups

13. Get all group by course --> GET http://localhost:7777/admin/group-course/2

14. Add student to group --> PUT http://localhost:7777/admin/add-student-to-group
{
    "student_id": 9,
    "group_id": 8
}

15. Show all students by group --> GET http://localhost:7777/coordinator/all-students-with-group?groupName=w2

16. show all students without group --> GET http://localhost:7777/coordinator/students-without-group

17. assign task --> POST http://localhost:7777/coordinator/assign-tasks
{
    "module_id": 3,
    "group_id": 3,
    "staff_id": 7,
    "types": [
        "Theory",
        "Lab",
        "IA-1",
        "IA-2"
    ],
    "start_date": "2025-08-25",
    "end_date": "2025-09-05"
}

18. Show all pending tasks --> GET http://localhost:7777/mentor/show-all-pending-tasks/7

19. Add marks --> PUT http://localhost:7777/mentor/add-mark
{
    "mark_id": 13,
    "theory_marks": 100,
    "lab_marks": 100,
    "IA_1": 100,
    "IA_2": 100,
    "status": "Done"
}

20. show all completed task --> GET http://localhost:7777/mentor/show-all-completed-task/7

21. show all student marks --> GET http://localhost:7777/student/marks/3

22. Approve a task --> PUT http://localhost:7777/coordinator/approve-task/13

23. [This api is not working] Show all approved tasks --> GET http://localhost:7777/coordinator/approved-tasks 

