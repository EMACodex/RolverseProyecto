import { Component } from '@angular/core';
import { personalUser } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-personal',
  imports: [],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {

  user!: personalUser;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    let userId = jwtDecode(token) as { id: number };

    console.log('Decoded user ID:', userId);

    this.userService.getUserById(userId.id).subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

}
