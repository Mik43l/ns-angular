import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  message = '';
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
  });

  constructor(private auth: AuthService) {}

  async sendMagicLink() {
    this.loading = true;
    try {
      await this.auth.createMagicURL(this.loginForm.value.email!);
      this.message =
        'Controlla la posta in arrivo e la cartella spam, poi clicca sul link di accesso!';
    } catch (err: any) {
      this.message = 'Errore: ' + err?.message;
    } finally {
      this.loading = false;
    }
  }

  get controls() {
    return this.loginForm.controls;
  }
}
