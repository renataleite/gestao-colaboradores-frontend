export interface Attendance {
  id?: number;
  collaboratorId: number;
  collaborator?: Collaborator;
  checkInTime: string; 
  checkOutTime: string;
}

export interface Collaborator {
  id: number;
  name: string;
  position: string;
  registrationNumber: string;
  salary: number;
}
