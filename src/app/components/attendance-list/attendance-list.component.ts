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

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.loadAllAttendances();
  }

  loadAllAttendances(): void {
    this.attendanceService.getAttendances().subscribe(attendances => {
      console.log('Attendances:', attendances);
      this.attendances = attendances;
      this.filteredAttendances = attendances;
    });
  }

  onMonthFilter(): void {
    if (this.filterMonth) {
      const [year, month] = this.filterMonth.split('-');
      this.attendanceService.getAttendancesByMonth(year, month).subscribe(filteredAttendances => {
        this.filteredAttendances = filteredAttendances;
      });
    } else {
      this.loadAllAttendances();
    }
  }

  downloadExcel(): void {
    if (this.filterMonth) {
      const [year, month] = this.filterMonth.split('-');
      this.attendanceService.downloadAttendancesExcel(year, month).subscribe((response: Blob) => {
        this.saveAsExcelFile(response, `AttendanceReport-${year}-${month}`);
      }, error => {
        console.error('Erro ao baixar o relatório Excel', error);
      });
    } else {
      this.attendanceService.downloadAttendancesExcel().subscribe((response: Blob) => {
        this.saveAsExcelFile(response, `AttendanceReport`);
      }, error => {
        console.error('Erro ao baixar o relatório Excel', error);
      });
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
