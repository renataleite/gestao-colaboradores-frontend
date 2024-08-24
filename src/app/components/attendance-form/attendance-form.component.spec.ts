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
    mockAttendanceService = jasmine.createSpyObj('AttendanceService', ['getAttendance', 'createAttendance', 'updateAttendance']);

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

    // Mock da resposta do getAttendance
    mockAttendanceService.getAttendance.and.returnValue(of({
      id: 1,
      collaboratorId: 1,
      checkInTime: new Date('2024-08-24T08:00:00'),
      checkOutTime: new Date('2024-08-24T17:00:00')
    }));

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

  it('deve carregar os dados de atendimento ao editar', () => {
    component.attendanceId = 1;
    component.ngOnInit();

    expect(component.attendanceForm.value.collaboratorId).toBe(1);
    expect(component.attendanceForm.value.checkInTime).toBe('2024-08-24T08:00');
    expect(component.attendanceForm.value.checkOutTime).toBe('2024-08-24T17:00');
  });

  it('deve chamar o serviço de criação ao enviar um novo formulário', () => {
    spyOn(component, 'onSubmit');
    component.attendanceForm.setValue({
      collaboratorId: 1,
      checkInTime: '2024-08-24T08:00',
      checkOutTime: '2024-08-24T17:00'
    });

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(mockAttendanceService.createAttendance).toHaveBeenCalled();
  });

  it('deve chamar o serviço de atualização ao enviar um formulário de edição', () => {
    spyOn(component, 'onSubmit');
    component.attendanceId = 1;
    component.attendanceForm.setValue({
      collaboratorId: 1,
      checkInTime: '2024-08-24T08:00',
      checkOutTime: '2024-08-24T17:00'
    });

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(mockAttendanceService.updateAttendance).toHaveBeenCalled();
  });
});
