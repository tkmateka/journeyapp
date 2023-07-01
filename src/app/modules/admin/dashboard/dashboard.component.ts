import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users:any[] = [];
  usersDetails:any = {};
  usersDetailsKeys:string[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.api.get('users').subscribe((res:any) => {
      this.users = res;
      this.usersDetails = {
        all: this.users.length,
        active: this.users.filter(user => user.status === 'Active').length,
        inActive: this.users.filter(user => user.status !== 'Active').length,
      };
      this.usersDetailsKeys = Object.keys(this.usersDetails);
    });
  }
}
