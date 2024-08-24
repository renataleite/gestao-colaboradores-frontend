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
  showDeleteModal: boolean = false;
  collaboratorToDelete: Collaborator | null = null;

  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.collaboratorService.getCollaborators().subscribe(
      (data: Collaborator[]) => this.collaborators = data,
      error => console.error('Erro ao carregar colaboradores', error)
    );
  }

  openDeleteModal(collaborator: Collaborator): void {
    this.collaboratorToDelete = collaborator;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.collaboratorToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    if (this.collaboratorToDelete) {
      this.collaboratorService.deleteCollaborator(this.collaboratorToDelete.id).subscribe(
        () => {
          console.log('Colaborador deletado com sucesso');
          this.collaborators = this.collaborators.filter(c => c.id !== this.collaboratorToDelete?.id);
          this.closeDeleteModal();
        },
        error => console.error('Erro ao deletar colaborador', error)
      );
    }
  }
}
