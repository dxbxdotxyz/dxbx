import { Component, OnInit, OnDestroy, } from '@angular/core';
import { SharengdataService } from './sharengdata.service';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  private stream1:any;
  private res_stream1:Observable<string>;
  title = 'dxbx-ui';
  
  constructor(private myshareddata : SharengdataService,   private _snackBar: MatSnackBar ) {
    this.res_stream1=this.myshareddata.snackBarMessage$;
  }

  ngOnInit(): void {
    this.stream1=this.res_stream1.subscribe((msg:string) => {
      if (msg.length>0) {
        this.handleMySnackBar(msg);
      }
    });
  }

  ngOnDestroy(): void {
    this.stream1.unsubscribe();
  }

  handleMySnackBar(msg:string,action:number=0){
    let snackBarRef = this._snackBar.open(msg, '', {
    duration: 1000, panelClass: ['blue-snackbar']});
  }
}
