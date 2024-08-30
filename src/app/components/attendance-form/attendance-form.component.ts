import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Collaborator } from 'src/app/models/collaborator.model';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})
export class AttendanceFormComponent implements OnInit {
  attendanceForm: FormGroup;
  collaborators: Collaborator[] = [];

  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private attendanceService: AttendanceService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.attendanceForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      attendanceDate: ['', Validators.required],
      checkInTime: ['08:00', Validators.required],
      checkOutTime: ['18:00', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.collaboratorService.getCollaborators().subscribe(collaborators => {
      this.collaborators = collaborators;
    });
  }

  onSubmit(): void {
    const formValues = this.attendanceForm.value;
    const checkInTime = `${formValues.attendanceDate}T${formValues.checkInTime}`;
    const checkOutTime = `${formValues.attendanceDate}T${formValues.checkOutTime}`;

    this.attendanceService.createAttendance({
      collaboratorId: formValues.collaboratorId,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime
    }).subscribe(() => {
      this.snackBar.open('Registro de ponto criado com sucesso!', '', {
        duration: 3000,
        verticalPosition: 'top', 
        horizontalPosition: 'right',
      });
      
      this.router.navigate(['/lista-de-pontos']);
    },
    (error) => {
      console.error('Erro ao criar o registro de ponto:', error);
      this.snackBar.open('Falha ao criar o registro de ponto. Por favor, tente novamente.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  onDateChange(event: any): void {
    const selectedDateString = event.target.value;
    const selectedDate = new Date(selectedDateString + 'T00:00:00');
  
    console.log(selectedDate);
  
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      this.attendanceForm.get('attendanceDate')?.setErrors({ 'invalidDate': true });
    } else {
      this.attendanceForm.get('attendanceDate')?.setErrors(null);
    }
  }
  
  onBack(): void {
    this.router.navigate(['/lista-de-pontos']);
  }
}
