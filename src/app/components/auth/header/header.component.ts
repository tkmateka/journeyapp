import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  route: string = 'login';
  headerData: any = {
    login: {
      question: 'Don\'t have an account?',
      route: '/base/register',
      label: 'Sign-Up here'
    },
    register: {
      question: 'Have an account already?',
      route: '/base/login',
      label: 'Login here'
    }
  }

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.route = router.url.split('/')[router.url.split('/').length - 1];
    });
  }

  ngOnInit(): void {
  }

}
