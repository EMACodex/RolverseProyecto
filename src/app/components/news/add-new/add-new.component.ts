import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RUTA_API } from '../../../../environment';
import { jwtDecode } from 'jwt-decode';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  newsForm!: FormGroup;
  currentUser: { id: number, name: string } | null = null;
  currentDate = new Date();
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwtDecode(token) as { id: number, name: string };
    }

    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required], // <-- autor manual
      content: ['', Validators.required],
      image: [null]
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
    if (this.newsForm.invalid || !this.currentUser) return;

    const formData = new FormData();
    formData.append('title', this.newsForm.value.title);
    formData.append('content', this.newsForm.value.content);
    formData.append('author_id', this.currentUser.id.toString());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      await this.http.post(`${RUTA_API}news`, formData, { headers }).toPromise();
      alert('Noticia publicada correctamente');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error al guardar noticia:', error);
      alert('Ocurrió un error al publicar la noticia');
    }
  }

}
