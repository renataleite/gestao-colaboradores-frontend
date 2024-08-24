import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance } from 'src/app/models/attendance.models';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;
  attendanceId?: number;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.attendanceForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.attendanceId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.attendanceId) {
      this.attendanceService.getAttendance(this.attendanceId).subscribe(attendance => {
        const checkInTimeFormatted = this.convertToDateTimeLocal(new Date(attendance.checkInTime));
        const checkOutTimeFormatted = this.convertToDateTimeLocal(new Date(attendance.checkOutTime));

        this.attendanceForm.patchValue({
          collaboratorId: attendance.collaboratorId,
          checkInTime: checkInTimeFormatted,
          checkOutTime: checkOutTimeFormatted
        });
      });
    }
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const formValues = this.attendanceForm.value;
      
      const attendance: Attendance = {
        collaboratorId: formValues.collaboratorId,
        checkInTime: new Date(formValues.checkInTime),
        checkOutTime: new Date(formValues.checkOutTime),
      };

      if (this.attendanceId) {
        this.attendanceService.updateAttendance(this.attendanceId, attendance).subscribe(() => {
          alert('Registro de ponto atualizado com sucesso!');
          this.router.navigate(['/attendances']);
        });
      } else {
        this.attendanceService.createAttendance(attendance).subscribe(() => {
          alert('Registro de ponto criado com sucesso!');
          this.router.navigate(['/attendances']);
        });
      }
    }
  }

  private convertToDateTimeLocal(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}
