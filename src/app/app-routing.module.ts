import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/colaboradores', pathMatch: 'full' }, 
  { path: 'colaboradores', component: CollaboratorFormComponent },   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
