import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdVerificationService {
  // =============================================================================
  // NEW ID VALIDATION FUNCTIONS
  // =============================================================================
  validateID(idnum: any) {
    // Validate Format
    let regex = /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/g;

    if (regex.test(idnum) === true) {
    } else {
      return;
    }

    let d = -1;
    let a = 0;

    for (let i = 0; i < 6; i++) {
      a += parseInt(idnum[2 * i].toString());
    }

    let b = 0;
    for (let i = 0; i < 6; i++) {
      b = b * 10 + parseInt(idnum[2 * i + 1].toString());
    }
    b *= 2;
    let c = 0;

    do {
      c += b % 10;
      b = parseInt((b / 10).toString());
    }
    while (b > 0);

    c += a;

    d = 10 - (c % 10);
    if (d == 10) d = 0;

    if (d == idnum[12]) {
      return true;
    } else {
      return;
    }
    return false;
  }

  // Validate ID Number and store Gender and Date Of Birth
  getGenderAndDOB(id: any) {
    let Year = id.substring(0, 2);
    let Month = id.substring(2, 4);
    let Day = id.substring(4, 6);
    // cutoff (to separate between mellinium 1900 and 2000)
    let cutoff = (new Date()).getFullYear() - 2000
    let dob = Month + '/' + Day + '/' + (Year > cutoff ? '19' : '20') + Year;
    // Get Age
    let ageDate = new Date(Date.now() - new Date(dob).getTime()); // miliseconds from epoch
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    // get the gender
    let genderCode = id.substring(6, 10);
    let gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

    return { dob: new Date(dob), gender: gender };
  }
}