import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  http = inject(HttpClient);
  router = inject(Router);
  
  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl('')
  });

  onLoginSubmit() {
    const payload = this.loginForm.value;

    this.http.post<any>('https://localhost:7218/api/user/login', payload).subscribe({
      next: (response) => {
        console.log("Login Success", response);

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.log("Login failed", err);
        alert("Invalid Credentials");
      }
    });
  }
}
