import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule], // ✅ Import here too
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private userService = inject(UserService);
  users: User[] = this.userService.getUsers();

  displayedColumns: string[] = ['id', 'name', 'email', 'role'];
}
