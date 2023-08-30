import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
  })



export class CoreService {
 
  private headerData = new BehaviorSubject({ title: 'Default Title' });
  currentHeaderData = this.headerData.asObservable();

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  setHeaderData(data: { title: string }) {
    this.headerData.next(data);
  }
}