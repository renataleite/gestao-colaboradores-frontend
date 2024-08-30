import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollaboratorService } from '../../services/collaborator.service';
import { Collaborator } from '../../models/collaborator.model';

@Component({
  selector: 'app-collaborator-edit',
  templateUrl: './collaborator-edit.component.html',
  styleUrls: ['./collaborator-edit.component.css']
})
export class CollaboratorEditComponent implements OnInit {
  collaboratorForm: FormGroup;
  collaboratorId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private snackBar: MatSnackBar
  ) {
    this.collaboratorForm = this.fb.group({
      name: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.collaboratorId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCollaborator();
  }

  loadCollaborator(): void {
    this.collaboratorService.getCollaboratorById(this.collaboratorId).subscribe(
      (collaborator: Collaborator) => {
        this.collaboratorForm.patchValue(collaborator);
      },
      error => console.error('Erro ao carregar colaborador', error)
    );
  }

  onSubmit(): void {
    if (this.collaboratorForm.valid) {
      const updatedCollaborator = this.collaboratorForm.value;
      this.collaboratorService.updateCollaborator(this.collaboratorId, updatedCollaborator).subscribe(
        () => {
          console.log('Colaborador atualizado com sucesso');
          this.snackBar.open('Colaborador atualizado com sucesso!', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.router.navigate(['/colaboradores']);
        },
        error => {
          console.error('Erro ao atualizar colaborador', error);
          this.snackBar.open('Erro ao atualizar colaborador. Tente novamente.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      );
    }
  }
}
