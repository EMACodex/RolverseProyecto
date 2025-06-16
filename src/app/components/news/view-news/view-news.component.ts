import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { InternalNews } from '../../../interfaces/new.interface';
import { environment } from '../../../../environment.prod';

@Component({
  selector: 'app-view-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.css'],
})
export class ViewNewsComponent implements OnInit {
  news: InternalNews | null = null;
  loading = true;
  error = '';
  newComment = '';
  comments: any[] = [];
  isAuthenticated = false;
  isAdmin = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID de noticia inválido.';
      this.loading = false;
      return;
    }

    try {
      this.news = await firstValueFrom(
        this.http.get<InternalNews>(`${environment.apiUrl}news/${id}`)
      );
      await this.loadComments();
      this.isAuthenticated = !!localStorage.getItem('token');
      // Decodifica el token para saber si es admin
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload && payload.role === 'admin'; // ajusta según cómo se guarde el rol
      }
    } catch (err: any) {
      if (err.status === 404) {
        this.error = 'No se encontró la noticia.';
      } else {
        this.error = 'Error al cargar la noticia.';
      }
    } finally {
      this.loading = false;
    }
  }

  async submitComment() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || !this.newComment.trim()) return;

    try {
      await firstValueFrom(
        this.http.post(
          `${environment.apiUrl}news/${id}/comments`,
          { comment: this.newComment.trim() },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
          }
        )
      );
      this.newComment = '';
      await this.loadComments();
    } catch (err) {
      console.error('Error al enviar comentario:', err);
    }
  }
  async loadComments() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    try {
      const result = await firstValueFrom(
        this.http.get<any[]>(`${environment.apiUrl}news/${id}/comments`)
      );
      this.comments = result;
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  }

  async deleteComment(commentId: number) {
    if (!confirm('¿Eliminar esta reseña?')) return;

    try {
      await firstValueFrom(
        this.http.delete(`${environment.apiUrl}news/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        })
      );
      await this.loadComments();
    } catch (err) {
      console.error('Error al eliminar comentario:', err);
    }
  }
}
