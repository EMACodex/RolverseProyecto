import { Component } from '@angular/core';
import { personalUser } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MessageInterface } from '../../../interfaces/message';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent {
  user!: personalUser;
  lastMessages: MessageInterface[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

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
        console.log('image:', this.user.rank_image);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });

    this.obtenerUltimosMensajes();
  }

  obtenerUltimosMensajes() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    let userId = jwtDecode(token) as { id: number };

    this.messageService.getLastMessagesFromUser(userId.id).subscribe({
      next: (res: any) => {
        this.lastMessages = res.data.map((m: MessageInterface) => ({
          ...m,
          text: m.text.replace(/\\n/g, '\n'), // si vienen escapados
        }));

        console.log('Last messages:', this.lastMessages);
      },
      error: (error) => {
        console.error('Error fetching last messages:', error);
      },
    });
  }
}
