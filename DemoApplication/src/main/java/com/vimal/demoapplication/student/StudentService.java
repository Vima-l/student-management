package com.vimal.demoapplication.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        Optional<Student> StudentOptional = studentRepository.findStudentByEmail(student.getEmail());
        if(StudentOptional.isPresent()){
            throw new IllegalStateException("Email Already Exists");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentID) {
        boolean exist = studentRepository.existsById(studentID);
        if(!exist){
            throw new IllegalStateException("Student Not Exists");
        }
        studentRepository.deleteById(studentID);
    }

    @Transactional
    public void updateStudent(Long studentId, String name, String email) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(()->new IllegalStateException("Student Not Exists"));

        if(name!=null && name.length()>0 && !Objects.equals(student.getName(),name)){
            student.setName(name);
        }

        if(email!=null && email.length()>0 && !Objects.equals(student.getEmail(),email)){
            Optional<Student> StudentOptional = studentRepository.findStudentByEmail(email);
            if(StudentOptional.isPresent()){
                throw new IllegalStateException("Email Already Exists");
            }
            student.setEmail(email);
        }
    }

    public Student getStudentById(Long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException("Student not found with id " + studentId));
    }

}
