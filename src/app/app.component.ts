
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  title = 'student-module';

  studentDetails: any = [];

  studentToUpdate = {
    id: null as any,
    name: "",
    rollNumber: "",
    department: "",
    email: "",
    contact: "",
    cgpa: "",
    skills: ""
  };

  constructor(private studentService: StudentService) {
    this.getStudentDetails();
  }

  // Register new student
  register(studentForm: NgForm) {
    this.studentService.registerStudent(studentForm.value).subscribe(
      (resp: any) => {
        console.log('Student Registered:', resp);
        studentForm.reset();
        this.getStudentDetails();
      },
      (err: any) => {
        console.error('Registration error:', err);
      }
    );
  }

  // Get all students
  getStudentDetails() {
    this.studentService.getStudents().subscribe(
      (resp) => {
        console.log('Student Data:', resp);
        this.studentDetails = resp;
      },
      (err) => {
        console.error('Fetching students failed:', err);
      }
    );
  }

  // Delete a student
  deleteStudent(student: any) {
    this.studentService.deleteStudent(student.id).subscribe(
      (resp) => {
        console.log('Student Deleted:', resp);
        this.getStudentDetails();
      },
      (err) => {
        console.error('Deletion failed:', err);
      }
    );
  }

  // Edit existing student
  edit(student: any) {
    this.studentToUpdate = { ...student };
  }

  // Update student details
  updateStudent() {
    this.studentService.updateStudent(this.studentToUpdate).subscribe(
      (resp) => {
        console.log('Student Updated:', resp);
        this.getStudentDetails();
      },
      (err) => {
        console.error('Update failed:', err);
      }
    );
  }
}

