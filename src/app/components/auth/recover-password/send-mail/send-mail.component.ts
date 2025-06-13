import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './send-mail.component.html',
  styleUrl: './send-mail.component.css'
})
export class SendMailComponent {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required
      ])
    });
  }

  enviarRecuperacion() {
    console.log(this.formGroup.get('email')?.value);
    this.authService.sendMailRecoversPass(this.formGroup.get('email')?.value).subscribe((res) => {
      if(res) {
        this.snackBar.open('Correo enviado correctamente', 'Cerrar', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('No se ha podido enviar el correo', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }

}
