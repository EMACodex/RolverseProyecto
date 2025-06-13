import { Component } from '@angular/core';
import { tokenData } from '../../../interfaces/auth.interface';
import { AuthService } from '../../../services/auth.service';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateForumComponent } from '../create-forum/create-forum.component';

@Component({
  selector: 'app-forum-page',
  imports: [MaterialModule],
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.css'
})
export class ForumPageComponent {
userInfo!: tokenData;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.getTokenData().subscribe({
      next: (data: tokenData) => {
        this.userInfo = data;
      },
      error: (error) => {
        console.error('Error fetching user info:', error.message);
      }
    });
  }

  openCreateForumDialog() {
    const dialogRef = this.dialog.open(CreateForumComponent, {
      width: '500px',
      backdropClass: 'transparent-backdrop'
    });
  }
}
