import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateUserPopupComponent } from '../update-user-popup/update-user-popup.component';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data:any;
  @Output() getUpdatedUsers = new EventEmitter<any>();

  dataSource:any;
  displayedColumns: string[] = ['photoURL', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phoneNumber', 'status'];
  tableHeaderCells: string[] = ['', 'First Name', 'Last Name', 'DateOfBirth', 'Gender', 'Email', 'Phone Number', 'Status'];

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = '';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue == 'all' ? '' : filterValue;
  }

  edit(user:any) {
    const dialogRef = this.dialog.open(UpdateUserPopupComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUpdatedUsers.emit('');
    });
  }

  delete(user:any) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUpdatedUsers.emit('');
    });
  }
}
