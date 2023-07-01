import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdVerificationService } from '../../../services/id-verification.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-update-user-popup',
  templateUrl: './update-user-popup.component.html',
  styleUrls: ['./update-user-popup.component.scss']
})
export class UpdateUserPopupComponent implements OnInit {
  userForm: FormGroup;
  file: any;
  roles: string[] = ['admin', 'employee'];

  constructor(
    private datePipe: DatePipe,
    private common: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateUserPopupComponent>,
    private idverification: IdVerificationService, private api: ApiService, private router: Router,
    private snackbar: MatSnackBar) {
      this.data = new Date(data.dateOfBirth);
      console.log(this.data)
    this.userForm = new FormGroup({
      firstName: new FormControl(data.firstName, [Validators.required]),
      lastName: new FormControl(data.lastName, [Validators.required]),
      idNumber: new FormControl(data.idNumber, [Validators.required, Validators.pattern('[0-9]{13}')]),
      dateOfBirth: new FormControl(data.dateOfBirth, [Validators.required]),
      gender: new FormControl(data.gender, [Validators.required]),
      phoneNumber: new FormControl(data.phoneNumber, [Validators.required, Validators.pattern('[0-9]{10}')]),
      email: new FormControl(data.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),]),
      photoURL: new FormControl(data.photoURL),
      dateJoined: new FormControl(data.dateJoined),
      status: new FormControl(data.status),
      about: new FormControl(data.about),
      role: new FormControl(data.role, [Validators.required]),
    });
    this.userForm.get('dateOfBirth')?.disable();
    this.userForm.get('gender')?.disable();
  }

  ngOnInit(): void {
  }

  // Validate ID Number
  validateID(id: any) {
    if (this.idverification.validateID(id)) {
      let genderAndDOB = this.idverification.getGenderAndDOB(id)
      this.userForm.get('dateOfBirth')?.setValue(genderAndDOB['dob']);
      this.userForm.get('gender')?.setValue(genderAndDOB['gender']);
    } else {
      this.userForm.controls['idNumber'].setErrors({ 'pattern': true });
    }
  }

  fileUpload(file: any) {
    this.file = file?.target?.files[0];

    const formData = new FormData();
    formData.append('name', this.file.name);
    formData.append('file', this.file);

    this.api.post('upload', formData).subscribe((res: any) => {
      this.userForm.patchValue({
        photoURL: `${environment.serverUrl}/image/${res['file']['filename']}`
      });
    }, err => console.log(err));
  }

  register() {
    if (this.userForm.invalid) return;

    this.userForm.get('dateOfBirth')?.setValue(this.datePipe.transform(this.userForm.get('dateOfBirth')?.getRawValue(),"dd-MMM-YYYY")); // Change date format
    this.userForm.get('dateJoined')?.setValue(this.datePipe.transform(this.userForm.get('dateJoined')?.getRawValue(),"dd-MMM-YYYY")); // Change date format

    this.api.post('update-user', this.userForm.getRawValue()).subscribe((res: any) => {
      sessionStorage.setItem('user', JSON.stringify(this.userForm.getRawValue()));
      this.common.sessionStorageSub.next('changed'); // Let all subscribers know that the SessionStorage has changed

      this.snackbar.open('Profile updated successfully', 'Ok', { duration: 3000 });
      this.dialogRef.close();
    });
  }
}
