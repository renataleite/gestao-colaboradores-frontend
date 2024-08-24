import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.models';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'https://localhost:7094/api/Attendances';

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
}
