import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthServiceService } from '../../services/Auth/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isRegister = true; // Toggle between Register and Login
  showForm = false; // Control form visibility
  errorMessage: string = ''; // Default empty

  // registrationForm: FormGroup;
  // loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthServiceService
  ) {}

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get currentForm(): FormGroup {
    return this.isRegister ? this.registrationForm : this.loginForm;
  }

  
  handleRegister() {
    console.log('register ', this.registrationForm.value);
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log('signup success', response);
      },
    });
  }

  handleLogin() {
    this.errorMessage = ''; // Reset the error message
    
    console.log('login ', this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log('login success', response);
      },
      error: (err) => {
        console.error('Login failed', err);
        if (err.status === 403) {
          this.errorMessage =
            'Invalid credentials. Please check your email and password.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
        console.log('Error message set to:', this.errorMessage); // Debug message
      },
    });
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  showRegistrationForm() {
    this.showForm = true;
  }
}
