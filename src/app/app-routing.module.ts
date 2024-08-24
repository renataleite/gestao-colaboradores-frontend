import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';
import { CollaboratorEditComponent } from './components/collaborator-edit/collaborator-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaboradores', pathMatch: 'full' },
  { path: 'colaboradores', component: CollaboratorListComponent },
  { path: 'cadastrar-colaboradores', component: CollaboratorFormComponent },
  { path: 'editar-colaboradores/:id', component: CollaboratorEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
