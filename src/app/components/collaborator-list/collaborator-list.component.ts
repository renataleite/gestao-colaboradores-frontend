import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../../services/collaborator.service';
import { Collaborator } from '../../models/collaborator.model';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  collaborators: Collaborator[] = [];

  constructor(private collaboratorService: CollaboratorService) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.collaboratorService.getCollaborators().subscribe(
      (data: Collaborator[]) => this.collaborators = data,
      error => console.error('Erro ao carregar colaboradores', error)
    );
  }
}
