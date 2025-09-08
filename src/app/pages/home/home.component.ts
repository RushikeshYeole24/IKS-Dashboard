import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { UserService, User, AbsenteeData } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = this.userService.getUsers();
  absenteeData: AbsenteeData[] = [];
  displayedColumns: string[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadAbsenteeData();
  }

  loadAbsenteeData() {
    this.userService.getAbsenteeData().subscribe({
      next: (data) => {
        this.absenteeData = data;
        this.isLoading = false;
        
        // Dynamically set columns based on the first row of data
        if (data.length > 0) {
          this.displayedColumns = Object.keys(data[0]);
        }
      },
      error: (err) => {
        console.error('Error fetching absentee data:', err);
        this.error = 'Failed to load data from server';
        this.isLoading = false;
      }
    });
  }
}
