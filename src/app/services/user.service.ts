import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  getRoleDistribution(): { [key: string]: number } {
    const roleCount: { [key: string]: number } = {};
    
    this.users.forEach(user => {
      roleCount[user.role] = (roleCount[user.role] || 0) + 1;
    });
    
    return roleCount;
  }
}