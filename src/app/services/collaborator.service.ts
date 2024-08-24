import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collaborator } from '../models/collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private apiUrl = 'https://localhost:7094/api/Collaborators';

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
}
