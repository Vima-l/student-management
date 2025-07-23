package com.vimal.demoapplication.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path="api/v1/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents(){
        return studentService.getStudents();
    }
    @GetMapping(path = "{studentId}")
    public Student getStudent(@PathVariable("studentId") Long studentId) {
        return studentService.getStudentById(studentId);
    }


    @PostMapping
    public void registerStudent(@RequestBody Student student){

        studentService.addNewStudent(student);
    }
    @DeleteMapping(path = "{studentID}")
    public void deleteStudent(@PathVariable("studentID") Long studentID){
        studentService.deleteStudent(studentID);
    }

    @PutMapping(path="{studentId}")
    public void updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestParam(required=false) String name,
            @RequestParam(required=false) String email)
    {
        studentService.updateStudent(studentId, name, email);
    }
}
