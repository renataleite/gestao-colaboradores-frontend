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
  isLoading: boolean = false;

  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.isLoading = true;
    this.collaboratorService.getCollaborators().subscribe(
      (data: Collaborator[]) => {
        this.collaborators = data;
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao carregar colaboradores', error);
        this.isLoading = false;
      }
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
      this.isLoading = true;
      this.collaboratorService.deleteCollaborator(this.collaboratorToDelete.id).subscribe(
        () => {
          console.log('Colaborador deletado com sucesso');
          this.collaborators = this.collaborators.filter(c => c.id !== this.collaboratorToDelete?.id);
          this.closeDeleteModal();
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao deletar colaborador', error);
          this.isLoading = false;
        }
      );
    }
  }
}
