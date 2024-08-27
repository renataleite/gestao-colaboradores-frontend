import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { CollaboratorEditComponent } from './components/collaborator-edit/collaborator-edit.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'colaboradores', pathMatch: 'full' },
  { path: 'colaboradores', component: CollaboratorListComponent },
  { path: 'cadastrar-colaboradores', component: CollaboratorFormComponent },
  { path: 'editar-colaboradores/:id', component: CollaboratorEditComponent },
  { path: 'registrar-ponto', component: AttendanceFormComponent },
  { path: 'lista-de-pontos', component: AttendanceListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
