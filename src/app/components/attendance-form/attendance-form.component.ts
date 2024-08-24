import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/models/attendance.models';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private router: Router
  ) {
    this.attendanceForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const formValues = this.attendanceForm.value;
      
      const attendance: Attendance = {
        collaboratorId: formValues.collaboratorId,
        checkInTime: new Date(formValues.checkInTime),
        checkOutTime: new Date(formValues.checkOutTime),
      };

      this.attendanceService.createAttendance(attendance).subscribe(() => {
        alert('Registro de ponto criado com sucesso!');
        this.router.navigate(['/attendances']);
      });
    }
  }
}
