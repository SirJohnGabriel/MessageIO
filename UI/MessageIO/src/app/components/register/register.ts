import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  http = inject(HttpClient);
  router = inject(Router);

  userForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl<string | null>(null),
    password: new FormControl('', { nonNullable: true }),
    confirmPassword: new FormControl('', { nonNullable: true }),
  })

  onFormSubmit() {
    if (this.userForm.invalid) {
      console.log('Form invalid');
      return;
    }
    
    const password = this.userForm.value.password;
    console.log('Password entered:', password); 

    const addUserRequest = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      passwordHash: this.userForm.value.password
    }


    this.http.post('https://localhost:7218/api/user/register', addUserRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.userForm.reset();
        this.router.navigate(['/login'])
      }
    })
  }

  get passwordMismatch(): boolean {
    return this.userForm.value.password !== this.userForm.value.confirmPassword;

  }
}
