import { Component, OnInit, OnDestroy, } from '@angular/core';
import { SharengdataService } from './sharengdata.service';
import { Observable } from 'rxjs';
import { JoystickService, JoysticksEvent } from './joystick.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Router, RouterLinkActive } from '@angular/router';
import { AptosWalletService } from './aptos-wallet.service';
import { WalletName } from '@aptos-labs/wallet-adapter-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private stream1:any;
  private res_stream1: Observable<string>;
  
  title = 'dxbx-ui';
  public useGamepad: boolean = false;
  
  constructor(private myshareddata : SharengdataService,
      private _snackBar: MatSnackBar,
      private joystickService : JoystickService,
      private aptosWalletService : AptosWalletService,
      private router: Router ) {
    this.res_stream1=this.myshareddata.snackBarMessage$;
  }

  ngOnInit(): void {
    console.log('app component init');
    this.stream1=this.res_stream1.subscribe((msg:string) => {
      if (msg.length>0) {
        this.handleMySnackBar(msg);
      }
    });

    
    window.addEventListener("gamepadconnected", (e:any) => {
      this.joystickService.gamepadConnected(e.gamepad);
    });
    
    this.useGamepad = false;
    
    
    setTimeout(() => {
      if(!this.useGamepad)
      {
        console.log('slidder Toggle to true' );
        setTimeout(() => this.useGamepad = this.joystickService.EnableGamepad(), 100);  
      } else {
        this.joystickService.DisableGamepad()
        console.log('slidder Toggle enabled',this.useGamepad);
      }
      
    }, 100);  

    window.addEventListener("gamepadconnected", (e:any) => {
      this.joystickService.gamepadConnected(e.gamepad);
      this.joystickService.EnableGamepad();

    });

    
    this.joystickService.getObservable().subscribe(events => this.onGamepadEvent(events))

  }

  ngOnDestroy(): void {
    this.stream1.unsubscribe();
    
  }

  handleMySnackBar(msg:string,action:number=0){
    let snackBarRef = this._snackBar.open(msg, '', {
    duration: 1000, panelClass: ['blue-snackbar']});
  }

  onToggleSlide(ev: MatSlideToggleChange){

    console.log('slidder Toggle',this.useGamepad, ev.checked );
    this.useGamepad=ev.checked;  

    if(this.useGamepad){
      console.log('slidder Toggle to true' );
      setTimeout(() => this.useGamepad = this.joystickService.EnableGamepad(), 50);  
    }
    else {
    
    this.joystickService.DisableGamepad()
    console.log('slidder Toggle enabled',this.useGamepad);

    }
   }
   

   public connected:boolean=false;

   onToggleSlideConnect(ev: MatSlideToggleChange){

    console.log('slidder Toggle',this.connected, ev.checked );
    this.useGamepad=ev.checked;  

    if(this.connected){
      this.aptosWalletService.disconnectWallet();
      this.connected=false;
    } else {
      const myname="Petra" as WalletName;
      let ret=this.aptosWalletService.connectWallet(myname);
      console.log('connectWallet',ret);
      this.connected=true
    }
   }

   public selectedlink;
   private myroutes=['/flipper','/trade','/pools','/coins'];

   navigatetoNext(){
      //const myroutedata = this.activatedRoute.snapshot.data;
      let myindex=this.myroutes.indexOf(this.selectedlink);
      if (myindex===3)
        myindex=-1;
        this.selectedlink=this.myroutes[myindex+1];
      let mynext='/'+this.selectedlink;
      console.log('navigate to route present is:',this.selectedlink);

      this.router.navigate([mynext]);
   }
   navigatetoPrevious(){
    console.log("myURL",  this.router.url);
   // const myroutedata = this.activatedRoute.snapshot.data;
    let myindex=this.myroutes.indexOf(this.router.url);
    if (myindex===0)
      myindex=4;
      this.selectedlink=this.myroutes[myindex-1];
    let mynext='/'+this.selectedlink;
    console.log('navigate to route present is:',this.selectedlink);

    this.router.navigate([mynext]);
 }

   activelink(mylink:string){
    console.log("myURL",  this.router.url);

    //RouterLinkActive
    this.selectedlink='/'+mylink;
    console.log('myselectedlink',this.selectedlink);
   }


   
   onGamepadEvent(events : JoysticksEvent[]){
    console.log('onGamepadEvent app',events);
    events.forEach(event => {
      if(event.type == "pressed"){
        switch(event.name){
          case "RB":
            this.navigatetoNext();
          break;
          case "LB":
            this.navigatetoPrevious();
          break;
          case "Y":
           if(events.length == 1){
    //         this.PullS();
           }
           else if(this.joystickService.lastState.axis.RT >= 0.9){
    //         this.PullServerHedger();
           }
          break;
          case "X":
           if(events.length == 2 && this.joystickService.lastState.axis.RT >=0.9){
     //        this.HedgeOnSide()
           }
           else if(this.joystickService.lastState.axis.RT >=0.9 && this.joystickService.lastState.button.RB){
      //       this.Hedge()
           }
          break;
          case "A":
           if(this.joystickService.lastState.axis.RT >= 0.9 ) {
      //       this.AllLHFToTrue();
             this.joystickService.vibrate(175, 1, 1);
           }
          break;
        }
      }
    });
  }

  

}
