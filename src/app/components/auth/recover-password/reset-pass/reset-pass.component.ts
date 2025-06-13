import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-pass',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {

  formGroup: FormGroup;
  visible = false;
  visibleRep = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        passwordValidator
      ]),
      passwordRep: new FormControl('', [
        Validators.required
      ]),
    }, { validators: passwordMatchValidator });
  }
  resetPass() {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(this.formGroup.get('password')?.value);
    this.authService.resetPass(token!, this.formGroup.get('password')?.value).subscribe((res) => {
      if (res) {
        this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', {
          duration: 2000,
        });
        location.href = '/session/login';
      } else {
        this.snackBar.open('No se ha podido cambiar la contraseña', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }
}

export const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password) ? null : { passwordMismatch: true };
};

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const passwordRep = control.get('passwordRep')?.value;
  if (password && passwordRep && password !== passwordRep) {
    control.get('passwordRep')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else if (!passwordRep) {
    control.get('passwordRep')?.setErrors({ required: true });
    return { required: true };
  } else {
    control.get('passwordRep')?.setErrors(null);
    return null;
  }
};
