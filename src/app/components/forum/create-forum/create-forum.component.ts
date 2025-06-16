import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForumService } from '../../../services/forum.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-forum',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-forum.component.html',
  styleUrl: './create-forum.component.css'
})
export class CreateForumComponent {
  forumForm!: FormGroup;

  private dialogRef = inject(MatDialogRef<CreateForumComponent>); // ✅ usa inject() en Angular 14+

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    this.forumForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.forumForm.valid) {
      this.forumService.createForum(this.forumForm.value).subscribe({
        next: (response) => {
          this.forumForm.reset();
          this.dialogRef.close(true); // ✅ Cierra el diálogo
        },
        error: (error) => {
          console.error('Error creating forum:', error);
        }
      });
    }
  }

  get title() {
    return this.forumForm.get('title');
  }

  get description() {
    return this.forumForm.get('description');
  }
}
