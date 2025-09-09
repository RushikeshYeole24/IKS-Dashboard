import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}


export interface AbsenteeData {
  [key: string]: any; // We'll define this based on your actual SQL table structure
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';




  constructor(private http: HttpClient) {}




  // Keep the original mock data method for backward compatibility
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', role: 'Editor' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin' },
    { id: 5, name: 'Sarah Davis', email: 'sarah@example.com', role: 'User' },
    { id: 6, name: 'Tom Brown', email: 'tom@example.com', role: 'Manager' },
    { id: 7, name: 'Lisa Wilson', email: 'lisa@example.com', role: 'User' },
    { id: 8, name: 'David Lee', email: 'david@example.com', role: 'Editor' }
  ];




  getUsers(): User[] {
    return this.users;
  }




  // New method to fetch absentee data from your SQL database
  getAbsenteeData(): Observable<AbsenteeData[]> {
    return this.http.get<AbsenteeData[]>(`${this.apiUrl}/absentee_data`);
  }

  // Method to get absenteeism report data (aggregated by ID)
  getAbsenteeismReport(): Observable<{id: string, totalHours: number}[]> {
    return this.http.get<{id: string, totalHours: number}[]>(`${this.apiUrl}/absenteeism_report`);
  }




  getRoleDistribution(): { [key: string]: number } {
    const roleCount: { [key: string]: number } = {};
   
    this.users.forEach(user => {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });
   
    return roleCount;
  }
}





