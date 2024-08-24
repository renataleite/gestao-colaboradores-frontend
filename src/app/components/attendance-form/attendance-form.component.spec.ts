import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AttendanceFormComponent } from './attendance-form.component';
import { AttendanceService } from 'src/app/services/attendance.service';
import { of } from 'rxjs';

describe('AttendanceFormComponent', () => {
  let component: AttendanceFormComponent;
  let fixture: ComponentFixture<AttendanceFormComponent>;
  let mockAttendanceService: jasmine.SpyObj<AttendanceService>;

  beforeEach(async () => {
    // Cria um mock do serviço
    mockAttendanceService = jasmine.createSpyObj('AttendanceService', ['createAttendance']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Importa o módulo de formulários reativos
        HttpClientTestingModule, // Importa o módulo de testes do HttpClient
        RouterTestingModule, // Importa o módulo de testes do Router
      ],
      declarations: [AttendanceFormComponent],
      providers: [
        { provide: AttendanceService, useValue: mockAttendanceService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com valores vazios', () => {
    expect(component.attendanceForm.value).toEqual({
      collaboratorId: '',
      checkInTime: '',
      checkOutTime: ''
    });
  });

  it('deve chamar o serviço de criação ao enviar o formulário', () => {
    component.attendanceForm.setValue({
      collaboratorId: 1,
      checkInTime: '2024-08-24T08:00',
      checkOutTime: '2024-08-24T17:00'
    });

    component.onSubmit();
    expect(mockAttendanceService.createAttendance).toHaveBeenCalled();
  });

  it('não deve chamar o serviço de criação se o formulário for inválido', () => {
    component.attendanceForm.setValue({
      collaboratorId: '',  // Valor inválido
      checkInTime: '2024-08-24T08:00',
      checkOutTime: '2024-08-24T17:00'
    });

    component.onSubmit();
    expect(mockAttendanceService.createAttendance).not.toHaveBeenCalled();
  });
});
