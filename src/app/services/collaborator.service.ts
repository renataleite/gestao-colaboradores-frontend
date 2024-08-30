import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../models/collaborator.model';
import { environment } from 'enviroment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private apiUrl = `${environment.apiUrl}/Collaborators`;

  constructor(private http: HttpClient) {}

  createCollaborator(collaborator: Collaborator): Observable<Collaborator> {
    return this.http.post<Collaborator>(this.apiUrl, collaborator);
  }

  getCollaborators(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(this.apiUrl);
  }

  getCollaboratorById(id: number): Observable<Collaborator> {
    return this.http.get<Collaborator>(`${this.apiUrl}/${id}`);
  }

  updateCollaborator(id: number, collaborator: Collaborator): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, collaborator);
  }

  deleteCollaborator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCollaboratorReport(month: number, year: number): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(`${this.apiUrl}/report?month=${month}&year=${year}`);
  }
}
