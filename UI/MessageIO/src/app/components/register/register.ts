import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  usernameTaken = false;
  emailTaken = false;

  constructor(private authService: Auth, private router: Router, private http: HttpClient) { }

  userForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl<string | null>(null),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  onFormSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Form invalid');
      return;
    }
    
    const password = this.userForm.value.password;
    console.log('Password entered:', password); 

    const addUserRequest = {
      username: this.userForm.value.username ?? '',
      email: this.userForm.value.email ?? '',
      firstName: this.userForm.value.firstName ?? '',
      lastName: this.userForm.value.lastName ?? '',
      passwordHash: this.userForm.value.password ?? ''
    }


    this.authService.register(addUserRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.userForm.reset();
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.error('Registration failed: ', error);

        this.usernameTaken = false;
        this.emailTaken = false;

        const errorMsg = error.error;

        if (errorMsg.username) this.usernameTaken = true;
        if (errorMsg.email) this.emailTaken = true;
      }
    })
  }

  get passwordMismatch(): boolean {
    return this.userForm.value.password !== this.userForm.value.confirmPassword;

  }
}
