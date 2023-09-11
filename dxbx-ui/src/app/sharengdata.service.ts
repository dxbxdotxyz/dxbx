import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharengdataService {
  
  private _mainTheme = new BehaviorSubject<string>('dark');
  mainTheme$: Observable<string>;

  private _snackBarMessage = new BehaviorSubject<string>('');
  snackBarMessage$: Observable<string>;



  constructor() {
    this.mainTheme$ = this._mainTheme.asObservable();
    this.snackBarMessage$ = this._snackBarMessage.asObservable();
  }

  public setMainTheme(theme: string): void {
    this._mainTheme.next(theme);
  }

  public setMessageforSnackBar(msg: string): void {
    this._snackBarMessage.next(msg);
  }


  public isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // toggleYourValue(): void {
  //   this._yourValue.next(!this._yourValue.getValue());
  // }

}
