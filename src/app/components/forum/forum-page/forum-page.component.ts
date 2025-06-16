import { Component } from '@angular/core';
import { tokenData } from '../../../interfaces/auth.interface';
import { AuthService } from '../../../services/auth.service';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { CreateForumComponent } from '../create-forum/create-forum.component';
import { ForumInterface, getForumResponse, getForumsResponse } from '../../../interfaces/forum.interface';
import { ForumService } from '../../../services/forum.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forum-page',
  imports: [MaterialModule],
  templateUrl: './forum-page.component.html',
  styleUrl: './forum-page.component.css'
})
export class ForumPageComponent {

  userInfo!: tokenData;
  allForums: ForumInterface[] = [];

  constructor(
    private authService: AuthService,
    private forumService: ForumService,
    private dialog: MatDialog,
    private router: Router
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

    this.loadForums();
  }

  loadForums() {
    this.forumService.getAllForums().subscribe({
      next: (forums: getForumsResponse) => {
        this.allForums = forums.data || [];
      },
      error: (error) => {
        console.error('Error fetching forums:', error.message);
      }
    });
  }

  openCreateForumDialog() {
    const dialogRef = this.dialog.open(CreateForumComponent, {
      width: '500px',
      backdropClass: 'transparent-backdrop'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.forumService.getAllForums().subscribe({
          next: (forums: getForumsResponse) => {
            this.allForums = forums.data || [];
          },
          error: (error) => {
            console.error('Error fetching updated forums:', error.message);
          }
        });
      }
    });
  }

  onDeleteForum(forumId: number): void {
    Swal.fire({
      title: '¿Eliminar este foro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a80000',
      cancelButtonColor: '#4b4b4b',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.forumService.deleteForum(forumId).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Eliminado!',
              text: response.message || 'El foro ha sido eliminado.',
              icon: 'success',
              confirmButtonColor: '#6b0f0f'
            });
            this.loadForums(); // o actualiza tu lista manualmente
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el foro.',
              icon: 'error',
              confirmButtonColor: '#6b0f0f'
            });
            console.error('Error al eliminar el foro:', error);
          }
        });
      }
    });
  }

  onForumClick(forum_id:number): void {
    this.router.navigate(['/forum', forum_id]);
  }

}
