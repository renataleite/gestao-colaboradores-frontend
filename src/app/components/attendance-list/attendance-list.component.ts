import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance.models';
import { AttendanceService } from 'src/app/services/attendance.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {
  attendances: Attendance[] = [];
  filteredAttendances: Attendance[] = [];
  filterYear: string = ''; 
  filterMonth: string = ''; 
  isLoading: boolean = false;
  isDownloadingExcel: boolean = false;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadAllAttendances();
  }

  loadAllAttendances(): void {
    this.isLoading = true;
    this.attendanceService.getAttendances().subscribe(
      attendances => {
        console.log('Attendances:', attendances);
        this.attendances = attendances;
        this.filteredAttendances = attendances;
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao carregar registros de ponto', error);
        this.isLoading = false;
      }
    );
  }

  onMonthFilter(): void {
    if (this.filterMonth) {
      const [year, month] = this.filterMonth.split('-');
      this.isLoading = true;
      this.attendanceService.getAttendancesByMonth(year, month).subscribe(
        filteredAttendances => {
          this.filteredAttendances = filteredAttendances;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao filtrar registros de ponto', error);
          this.isLoading = false;
        }
      );
    } else {
      this.loadAllAttendances();
    }
  }

  downloadExcel(): void {
    this.isDownloadingExcel = true;
    if (this.filterMonth) {
      const [year, month] = this.filterMonth.split('-');
      this.attendanceService.downloadAttendancesExcel(year, month).subscribe(
        (response: Blob) => {
          this.saveAsExcelFile(response, `AttendanceReport-${year}-${month}`);
          this.isDownloadingExcel = false;
        },
        error => {
          console.error('Erro ao baixar o relatório Excel', error);
          this.isDownloadingExcel = false;
        }
      );
    } else {
      this.attendanceService.downloadAttendancesExcel().subscribe(
        (response: Blob) => {
          this.saveAsExcelFile(response, `AttendanceReport`);
          this.isDownloadingExcel = false;
        },
        error => {
          console.error('Erro ao baixar o relatório Excel', error);
          this.isDownloadingExcel = false;
        }
      );
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = fileName + EXCEL_EXT;
    link.click();
  }
}
