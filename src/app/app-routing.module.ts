import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-collaborator', pathMatch: 'full' },
  { path: 'collaborators', component: CollaboratorListComponent },
  { path: 'add-collaborator', component: CollaboratorFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
