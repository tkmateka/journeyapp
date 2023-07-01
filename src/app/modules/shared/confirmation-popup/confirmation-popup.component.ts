import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(
    private api: ApiService,
    private common: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
  ) { }

  ngOnInit(): void {
  }

  continue() {
    this.api.delete( `delete/${this.data.email}`).subscribe((res: any) => {
      this.dialogRef.close();
    }, err => console.log(err));
  }

}
