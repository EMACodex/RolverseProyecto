import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RUTA_API } from '../../../../environment';
import { jwtDecode } from 'jwt-decode';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements OnInit {
  newsForm!: FormGroup;
  currentUser: { id: number; name: string } | null = null;
  currentDate = new Date();
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  errorMessage: string | null = null;

  fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwtDecode(token) as { id: number; name: string };
    }

    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onSubmit(): Promise<void> {
    // 1) Extraemos los valores limpios
    const title = this.newsForm.value.title?.trim();
    const content = this.newsForm.value.content?.trim();

    // 2) Si falta alguno, no publicamos
    if (!title || !content) {
      this.errorMessage =
        'Debe rellenar Título y Descripción antes de publicar.';
      return;
    }

    if (this.newsForm.invalid || !this.currentUser) return;

    // 1) Construccion del FormData
    const formData = new FormData();
    formData.append('title', this.newsForm.value.title);
    formData.append('content', this.newsForm.value.content);
    formData.append('author_id', this.currentUser.id.toString());
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    // 2) Recupera el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
      return;
    }

    // 3) Crea el header con Bearer <token>
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // 4) Incluye los headers en la llamada
    try {
      await this.http
        .post(`${RUTA_API}news`, formData, { headers })
        .toPromise();

      alert('Noticia publicada correctamente');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al guardar noticia:', error);
      alert('Ocurrió un error al publicar la noticia');
    }
  }

  closeError(): void {
    this.errorMessage = null;
  }
}
