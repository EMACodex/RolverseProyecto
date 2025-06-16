import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ForumService } from '../../../services/forum.service';
import { MessageService } from '../../../services/message.service';
import { ForumInterface, getForumResponse } from 'app/interfaces/forum.interface';
import { MessageInterface } from 'app/interfaces/message';
import { CommonModule, DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-forum-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, RouterLink],
  templateUrl: './forum-detail.component.html',
  styleUrl: './forum-detail.component.css'
})
export class ForumDetailComponent {
  forumId!: number;
  forum!: ForumInterface;
  messages: MessageInterface[] = [];
  user_id: number | null = null;

  messageForm!: FormGroup;
  selectedImage: File | null = null;
  previewImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.forumId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.forumId) {
      this.getForumDetails();
      this.getMessages();
      this.initForm();
    }

    const token = localStorage.getItem('token');
    if (token) {
      let userid = jwtDecode(token) as { id: number };
      this.user_id = userid.id;
    }
  }

  initForm(): void {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(1000)]],
      image: [null]
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      this.messageForm.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  createMessage(): void {
    console.log('Creating messagewad with form data:', this.messageForm.value);
    if (this.messageForm.invalid) return;

    const formData = new FormData();
    formData.append('forum_id', this.forumId.toString());
    formData.append('text', this.messageForm.value.text);
    formData.append('user_id', this.user_id?.toString() || '0');
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.messageService.createMessage(formData).subscribe({
      next: () => {
        this.messageForm.reset();
        this.selectedImage = null;
        this.previewImage = null;
        this.getMessages();
      },
      error: (err) => {
        console.error('Error al crear mensaje:', err);
      }
    });
  }

  getForumDetails(): void {
    this.forumService.getForumById(this.forumId).subscribe({
      next: (response: getForumResponse) => {
        this.forum = response.data!;
      },
      error: (error) => {
        console.error('Error fetching forum details:', error);
      }
    });
  }

  getMessages(): void {
    this.messageService.getAllMessages(this.forumId).subscribe({
      next: (response: any) => {
        this.messages = response.data;
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }
}
