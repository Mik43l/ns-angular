import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  profileForm!: FormGroup;
  user: any = null;
  loading = false;
  success = false;
  error = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    // Recupero user (mock o API)
    const currentUser$ = from(this.auth.getCurrentUser());
    currentUser$.subscribe((loadedUser) => {
      this.user = loadedUser;

      this.profileForm = this.formBuilder.group({
        name: [loadedUser.name, Validators.required],
        email: [{ value: loadedUser.email, disabled: true }], // SOLO LETTURA
        // phone: [loadedUser.phone, Validators.required],
      });
    });
  }

  async updateProfile() {
    if (this.profileForm.invalid) return;
    this.loading = true;

    const updatedData = {
      name: this.profileForm.value.name,
      phone: this.profileForm.value.phone,
    };

    try {
      await this.auth.updateCurretnUser(this.profileForm.value.name);
      this.success = true;
      this.loading = false;
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
  }
}
