import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollaboratorFormComponent } from './components/collaborator-form/collaborator-form.component';
import { CollaboratorListComponent } from './components/collaborator-list/collaborator-list.component';
import { CollaboratorEditComponent } from './components/collaborator-edit/collaborator-edit.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { CollaboratorReportComponent } from './components/collaborator-report/collaborator-report.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    CollaboratorFormComponent,
    CollaboratorListComponent,
    CollaboratorEditComponent,
    AttendanceFormComponent,
    CollaboratorReportComponent,
    AttendanceListComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
