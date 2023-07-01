import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserPopupComponent } from '../update-user-popup/update-user-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');
  personalDetails: any[] = [
    { label: 'ID Number', value: this.user.idNumber },
    { label: 'Date of birth', value: this.user.dateOfBirth },
    { label: 'Gender', value: this.user.gender },
    { label: 'Phone number', value: this.user.phoneNumber },
    { label: 'Date Joined', value: this.user.dateJoined },
    { label: 'Role', value: this.user.role },
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateUserPopupComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    });
  }
}
