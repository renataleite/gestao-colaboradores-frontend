export interface Attendance {
  id?: number;
  collaboratorId: number;
  checkInTime: Date; 
  checkOutTime: Date;
}