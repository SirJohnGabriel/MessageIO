import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterLink, FontAwesomeModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  http = inject(HttpClient);
  showPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  loginFailed = false;

  constructor(private authService: Auth, private router: Router) { }

  loginForm = new FormGroup({
    identifier: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  ngOnInit() {
    const savedIdentifier = localStorage.getItem('rememberedIdentifier');
    if (savedIdentifier) {
      this.loginForm.patchValue({
        identifier: savedIdentifier,
        rememberMe: true
      });
    }
  }

  onLoginSubmit() {
    const { identifier, password, rememberMe } = this.loginForm.value;

    if (rememberMe) {
      localStorage.setItem('rememberedIdentifier', identifier ?? '');
    } else {
      localStorage.removeItem('rememberedIdentifier');
    }

    this.authService.login(identifier!, password!).subscribe({
      next: (response) => {
        console.log('Login Success', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/conversations']);
      },
      error: (err) => {
        console.log('Login failed', err);
        // alert('Invalid Credentials');
        this.loginFailed = true;
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}