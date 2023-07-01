import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  sessionStorageSub = new Subject<string>();
  sessionStorageSubObs!: Observable<any>

  constructor() { 
    this.sessionStorageSubObs = this.sessionStorageSub.asObservable();
  }
}
