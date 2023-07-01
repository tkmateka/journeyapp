import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) return;
    
    this.api.post('login', this.loginForm.getRawValue()).subscribe((res:any) => {
        console.log(res)
      let user = res.user;
      
      if(user) {
        sessionStorage.setItem('user', JSON.stringify(user));

        if(user.role === 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['employee']);
        }

        this.snackbar.open('Logged in successfully', 'Ok', {duration:3000});
      }
    }, err => {
      this.snackbar.open(err.error, 'Ok', {duration:3000})
    })
  }
}
