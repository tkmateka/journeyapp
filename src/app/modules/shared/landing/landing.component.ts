import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  sideNavItems: any[] = [
    { label: 'Dashboard', route: 'dashboard' },
    { label: 'My Profile', route: 'profile' }
  ];
  selectedNavItem: number = 0;
  opened: boolean = true;
  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');

  constructor(private router: Router, private common: CommonService) {
    if (this.user.role === 'employee') this.sideNavItems.shift(); // Remove the first item in the sideNavItems

    this.router.events.subscribe((val) => {
      let route = router.url.split('/')[router.url.split('/').length - 1];
      // Update selected side-nav-item
      this.sideNavItems.forEach((item: any, indx: number) => {
        if (item.route === route) {
          this.selectedNavItem = indx;
        }
      });
    });
  }

  ngOnInit(): void {
    // Listen to SessionStorage Changes
    this.common.sessionStorageSub.subscribe((data:string) => {
      // invokes when the localstorage is changed.
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['base/login']);
  }
}
