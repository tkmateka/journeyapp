import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdVerificationService } from '../../../services/id-verification.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  file: any;
  roles: string[] = ['admin', 'employee'];

  constructor(
    private datePipe: DatePipe,
    private idverification: IdVerificationService, private api: ApiService, private router: Router,
    private snackbar: MatSnackBar) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      idNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{13}')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      photoURL: new FormControl(''),
      dateJoined: new FormControl(new Date().getTime()),
      status: new FormControl('Active'),
      about: new FormControl(''),
      role: new FormControl('', [Validators.required]),
    });
    this.registerForm.get('dateOfBirth')?.disable();
    this.registerForm.get('gender')?.disable();
  }

  ngOnInit(): void {
    
  }

  // Validate ID Number
  validateID(id: any) {
    if (this.idverification.validateID(id)) {
      let genderAndDOB = this.idverification.getGenderAndDOB(id)
      this.registerForm.get('dateOfBirth')?.setValue(genderAndDOB['dob']);
      this.registerForm.get('gender')?.setValue(genderAndDOB['gender']);
    } else {
      this.registerForm.controls['idNumber'].setErrors({ 'pattern': true });
    }
  }

  fileUpload(file: any) {
    this.file = file?.target?.files[0];

    const formData = new FormData();
    formData.append('name', this.file.name);
    formData.append('file', this.file);

    this.api.post('upload', formData).subscribe((res: any) => {
      this.registerForm.patchValue({
        photoURL: `${environment.serverUrl}/image/${res['file']['filename']}`
      });
    }, err => console.log(err));
  }

  register() {
    if (this.registerForm.invalid) return;

    this.registerForm.get('dateOfBirth')?.setValue(this.datePipe.transform(this.registerForm.get('dateOfBirth')?.getRawValue(),"dd-MMM-YYYY")); // Change date format
    this.registerForm.get('dateJoined')?.setValue(this.datePipe.transform(this.registerForm.get('dateJoined')?.getRawValue(),"dd-MMM-YYYY")); // Change date format
    
    this.api.post('register', this.registerForm.getRawValue()).subscribe((res: any) => {
      this.snackbar.open(res.message, 'Ok', { duration: 3000 });
      this.router.navigate(['base/login']);
    });
  }
}
