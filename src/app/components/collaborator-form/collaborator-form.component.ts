import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollaboratorService } from '../../services/collaborator.service';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collaborator-form',
  templateUrl: './collaborator-form.component.html',
  styleUrls: ['./collaborator-form.component.css']
})
export class CollaboratorFormComponent implements OnInit {
  collaboratorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.collaboratorForm = this.fb.group({
      name: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.collaboratorForm.invalid) {
      this.collaboratorForm.markAllAsTouched();
      console.log('Form is invalid after markAllAsTouched. Errors:', this.collaboratorForm.errors);
      return;
    }
  
    const newCollaborator: Collaborator = this.collaboratorForm.value;
  
    this.collaboratorService.createCollaborator(newCollaborator).subscribe({
      next: (response) => {
        console.log('Colaborador cadastrado com sucesso!', response);
        this.snackBar.open('Colaborador cadastrado com sucesso!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        this.router.navigate(['/colaboradores']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar colaborador:', err);
        this.snackBar.open('Erro ao cadastrar colaborador. Tente novamente.', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }
  
}
