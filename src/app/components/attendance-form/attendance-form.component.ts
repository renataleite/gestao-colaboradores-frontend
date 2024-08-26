import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  minDate: string;
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private attendanceService: AttendanceService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(this.addDays(today, 30)); // Limite de 30 dias a partir de hoje
    this.attendanceForm = this.fb.group({
      collaboratorId: ['', Validators.required],
      attendanceDate: [this.minDate, Validators.required],
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
    // Construindo a string de data manualmente para manter o horário local
    const checkInTime = `${formValues.attendanceDate}T${formValues.checkInTime}`;
    const checkOutTime = `${formValues.attendanceDate}T${formValues.checkOutTime}`;
  
    this.attendanceService.createAttendance({
      collaboratorId: formValues.collaboratorId,
      checkInTime: checkInTime,
      checkOutTime: checkOutTime
    }).subscribe(() => {
      alert('Registro de ponto criado com sucesso!');
      this.router.navigate(['/lista-de-pontos']);
    },
    (error) => {
      console.error('Erro ao criar o registro de ponto:', error);
      alert('Falha ao criar o registro de ponto. Por favor, tente novamente.');
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
    // Obtendo o valor da data selecionada no formato de string (ano-mês-dia)
    const selectedDateString = event.target.value;
  
    // Criando um novo objeto Date com a data selecionada como uma data local
    const selectedDate = new Date(selectedDateString + 'T00:00:00');
  
    console.log(selectedDate);
  
    // Verificando se a data selecionada é sábado ou domingo
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      // Se for domingo (0) ou sábado (6), define um erro
      this.attendanceForm.get('attendanceDate')?.setErrors({ 'invalidDate': true });
    } else {
      // Se for de segunda (1) a sexta (5), remove o erro
      this.attendanceForm.get('attendanceDate')?.setErrors(null);
    }
  }
  
  onBack(): void {
    this.router.navigate(['/lista-de-pontos']); // Navega para a página de lista de registros de pontos
  }
  
  isValidTime(time: string): boolean {
    // Função que determina se o horário está dentro do intervalo permitido
    return time >= '08:00' && time <= '18:00';
  }
}
