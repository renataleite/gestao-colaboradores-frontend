import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollaboratorService } from '../../services/collaborator.service';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/models/collaborator.model';

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
    private router: Router
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
    if (this.collaboratorForm.valid) {
      const newCollaborator: Collaborator = this.collaboratorForm.value;

      this.collaboratorService.createCollaborator(newCollaborator).subscribe({
        next: (response) => {
          console.log('Colaborador cadastrado com sucesso!', response);
          this.router.navigate(['/collaborator-list']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar colaborador:', err);
        }
      });
    }
  }
}
