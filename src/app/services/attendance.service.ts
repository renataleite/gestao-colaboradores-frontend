import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Attendance } from '../models/attendance.models';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'https://gestaocolaboradoresapi-a7ckf8duawcca2gv.eastus-01.azurewebsites.net/api/Attendances';

  constructor(private http: HttpClient) { }

  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getAttendance(id: number): Observable<Attendance> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Attendance>(url);
  }

  createAttendance(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }

  getReport(month: number, year: number, collaboratorId?: string): Observable<Attendance[]> {
    let url = `${this.apiUrl}/Attendances/report?month=${month}&year=${year}`;
    if (collaboratorId) {
      url += `&collaboratorId=${collaboratorId}`;
    }
    return this.http.get<Attendance[]>(url);
  }

  getAttendancesByMonth(year: string, month: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/filter?year=${year}&month=${month}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Se o erro for 404, retorna um array vazio
          console.warn(`No attendances found for year ${year} and month ${month}. Returning empty list.`);
          return of([]); // Retorna um Observable com um array vazio
        } else {
          // Re-throw se for outro tipo de erro
          throw error;
        }
      })
    );
  }

  downloadAttendancesExcel(year?: string, month?: string): Observable<Blob> {
    if (!year || !month) {
      return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
    }
    const url = `${this.apiUrl}/export?year=${year}&month=${month}`;
    return this.http.get(url, { responseType: 'blob' }); // Retorna o arquivo como Blob
  }
}
