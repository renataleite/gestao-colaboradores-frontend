import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { Collaborator } from 'src/app/models/collaborator.model';

@Component({
  selector: 'app-collaborator-report',
  templateUrl: './collaborator-report.component.html',
  styleUrls: ['./collaborator-report.component.css']
})
export class CollaboratorReportComponent implements OnInit {

  collaborators: Collaborator[] = [];
  month: number = new Date().getMonth() + 1; // Mês atual
  year: number = new Date().getFullYear();

  constructor(private collaboratorService: CollaboratorService) { }

  ngOnInit(): void {
    this.getCollaboratorReport();
  }

  getCollaboratorReport(): void {
    this.collaboratorService.getCollaboratorReport(this.month, this.year).subscribe(
      (data: Collaborator[]) => {
        this.collaborators = data;
      },
      error => {
        console.error('Erro ao buscar o relatório:', error);
      }
    );
  }
  
  formatMonthYear(month: number, year: number): string {
    return `${('0' + month).slice(-2)}/${year}`;
  }
}
