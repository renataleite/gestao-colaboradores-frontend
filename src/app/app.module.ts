import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorEditComponent } from './components/collaborator-edit/collaborator-edit.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CollaboratorFormComponent,
    CollaboratorListComponent,
    CollaboratorEditComponent,
    AttendanceFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
