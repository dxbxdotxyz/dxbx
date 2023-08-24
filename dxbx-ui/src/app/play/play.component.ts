import { Component,ViewChild , OnInit, Input, OnDestroy, numberAttribute } from '@angular/core';
import { QuickWSService } from '../quick-ws.service';
import {ThemeSwitchComponent} from '../theme-switch/theme-switch.component';
import { JoystickService, JoysticksEvent } from '../joystick.service';
import { LocalstorageService } from '../localstorage.service';
import { Observable } from 'rxjs';

import { AgChartsAngular } from 'ag-charts-angular';
import { AgCartesianChartOptions, time } from 'ag-charts-community';
import { AgChartOptions, AgChartTheme } from 'ag-charts-community';
import { SharengdataService } from '../sharengdata.service';


interface Provider {
  time: number,
  indexvalue: number
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  })

export class PlayComponent  implements OnInit {


/*********PLAY LOGIC************************ */
  public indexPosition:number=0;
  private pctMargin:number=.5;
  private maxTotalBalance:number=10;
  public coinDescription:string="USDC";
  public totalBalance:number=0;
  public availableBalance:number=0;
  public marginBalance:number=0;
  public contractBalance:number=0;
  private minMarginRequired:number=0;
  public priceIndex:number=0;
  public tradingSize:number=1;
  private spreadfees:number=0.0001;

/*********************************** */

    private minIndex:number=0;
    private maxIndex:number=0;
    private now=Date.now();// : number;
    private res_stream1:Observable<number>;
    private stream1:any;
    private stream2:any;
    private streamJoystick :any;
    public rnd_Index:any;
    public mychart: any;
    private myplotdata:Array<Provider> =[];
    public options: any;// AgChartOptions;
    private myTheme: AgChartTheme;
    
    private indexname:string="AIP41";

    @ViewChild(AgChartsAngular)
    public agChart!: AgChartsAngular;

    constructor(private mypersistent:LocalstorageService,private myWS:QuickWSService,private myshareddata : SharengdataService, private joystickService : JoystickService ) {
      
      this.res_stream1=this.myWS.priceindex$;

      this.myTheme = {
        baseTheme: 'ag-default-dark',
        palette: {
             fills: ['#ec4d3d', '#4facf2'],
             strokes: ['#ec4d3d', '#4facf2'],
        },
        overrides: {
          area: { series: { fillOpacity: 0.25 } },
          cartesian: {
            title: {
              fontSize: 24,
            },
            series: {
              column: {
                label: {
                  enabled: true,
                  color: 'black',
                },
              },
            },
            
          },
          
        },
      };



      this.options = {
        autoSize: true,
        data: this.getData(),
        theme: this.myTheme,
        series: [
          {
            type: 'area',
            xKey: 'time',
            yKey: 'indexvalue',
            stacked: true,
            yName: this.indexname,
          },
          
        ],
        axes: [
          {
            type: 'time',
            position: 'bottom',
            nice: true,
            tick: {
              interval: time.second.every(60, { snapTo: this.now }),
            },
          },
          {
            type: 'number',
            position: 'left',
            min: this.getmin(),
            max: this.getmax(),
          },
        ],
      };
    }

ngOnInit() {
    this.stream1=this.res_stream1.subscribe(value_received    => {
      this.updateTradingData(value_received-this.rnd_Index);
      this.rnd_Index=value_received;
      this.now=Date.now();
      this.myplotdata.push({time: this.now , indexvalue: value_received});
      this.updateData()
    });

  this.stream2=this.myshareddata.mainTheme$.subscribe(value_received => {
      if (value_received === 'dark') {
        this.applyTheme('ag-default-dark');
      } else {
        this.applyTheme('ag-default');
      }
  } );
  
  this.streamJoystick =this.joystickService.getObservable().subscribe(events => this.onGamepadEvent(events))
}

ngOnDestroy(): void {
  this.stream1.unsubscribe();
  this.stream2.unsubscribe();
  this.streamJoystick.unsubscribe();
}

  applyTheme = (theme: string) => {
    const options = { ...this.options };
    options.theme.baseTheme = theme;
    this.options = options;
  };

  
  updateData = () => {
    const options = { ...this.options };
    this.now = Date.now();
    options.axes![1]['min'] =  this.getmin();
    options.axes![1]['max'] =  this.getmax();
    options.data = this.getData();
    this.options = options;
  };

  getData() {
      this.minIndex=this.myplotdata.length>0?this.myplotdata[0]['indexvalue']:0;
      this.maxIndex=this.myplotdata.length>0?this.myplotdata[0]['indexvalue']:0;
      for (let i = 0; i < this.myplotdata.length; i++) {
        if (this.myplotdata[i]['indexvalue'] < this.minIndex) {
          this.minIndex = this.myplotdata[i]['indexvalue'];
        }
        if (this.myplotdata[i]['indexvalue'] > this.maxIndex) {
          this.maxIndex = this.myplotdata[i]['indexvalue'];
        }
      }
      this.myplotdata.length>255?this.myplotdata.shift():null;
    return this.myplotdata;
  }

  getmin() {
    return this.minIndex;
  }
  getmax() {
    return this.maxIndex;
  }  

  public addusdc(howmany:number){
    console.log('addusdc',howmany);


    if (this.totalBalance+howmany>this.maxTotalBalance){
      howmany=Math.max(this.maxTotalBalance-this.totalBalance,0);

      this.myshareddata.setMessageforSnackBar('added '+howmany+' USDC, maxTotalBalance='+this.maxTotalBalance); 
    }else{
        this.myshareddata.setMessageforSnackBar('added '+howmany+' USDC, maxTotalBalance='+this.maxTotalBalance); 
    }
    this.availableBalance+=howmany;
  }

  public getTotalBalance(){
    this.totalBalance=this.availableBalance+this.marginBalance;
    return this.totalBalance;
  }
  public getAvailableBalance(){
    return this.availableBalance;
  }
  public getMarginBalance(){
    return this.marginBalance;
  }
  
  public reverseSideClicked(){
    this.sendOrder(-2*this.contractBalance);
  }
  
    public closeAllClicked(){
      this.sendOrder(-this.contractBalance);
    }
        
    public buyClicked(){
    
    this.sendOrder(this.tradingSize);
    }
    
     public sellClicked(){
      console.log('sellClicked');
      this.sendOrder(-this.tradingSize);
     }
     private getminMarginRequired(){ //in coins
       this.minMarginRequired= this.pctMargin*Math.abs(this.contractBalance);  
      return this.minMarginRequired;
    }
    
    private transferMarginToAvailable(howmany:number  ){
      this.marginBalance=   this.marginBalance-howmany;
      this.availableBalance=   this.availableBalance+howmany;
    }

    private setTotalBalance(){
      this.totalBalance=this.availableBalance+this.marginBalance;
    }

    public updateTradingData(indexdelta:number){

      if (this.contractBalance!==0){
        let pnl=this.indexPosition*indexdelta;
        this.marginBalance=this.marginBalance+pnl;
        this.setTotalBalance();
        let necessaryMargin=this.getminMarginRequired()-this.marginBalance;
        this.handleMarginCall(necessaryMargin);
        this.setTotalBalance();
      }
     }

    private handleMarginCall( necessaryMargin:number){
    
      if (necessaryMargin<=0){
        //we credit avail by extra margin
        this.transferMarginToAvailable(-necessaryMargin);
        return true;
      }else{
        //we need to more margin 
    
        if (this.availableBalance<necessaryMargin){
          //we need to close position
          //console.log('**************************marginCall but there is not enough wants to close position to get',this.marginCall);
          this.liquidatePosition(necessaryMargin-this.availableBalance);
          return false
        } else{
          //we can add margin from availableBalance
         // console.log('marginCall we can add margin from availableBalance');
          this.transferMarginToAvailable(-necessaryMargin);            
          
          return true;
        }
      }
    }

    

    private liquidatePosition(howmany:number){
      console.log('liquidatePosition',howmany);
      if (this.contractBalance!==0){
        let size= -1*Math.min(Math.ceil(Math.abs(howmany)),Math.abs(this.contractBalance))*this.contractBalance/Math.abs(this.contractBalance) ;
        console.log('liquidatePosition size',size);
        this.contractBalance+=size;
        console.log('liquidatePosition contractBalance',this.contractBalance);
        if(size>0){
          this.indexPosition+=size/(this.rnd_Index*(1+this.spreadfees));
        }else{  
          this.indexPosition+=size/(this.rnd_Index*(1-this.spreadfees));
        }
        this.setTotalBalance();
        console.log('liquidatePosition indexPosition',this.indexPosition);
      }

    }

    private sendOrder(size:number){
        if (Math.abs(size)>0){
        let necessaryMargin= Math.abs(this.pctMargin*(this.contractBalance+size))-this.marginBalance ;
      
        if (this.availableBalance>necessaryMargin){
          this.transferMarginToAvailable(-necessaryMargin);    
          this.contractBalance+=size;
          console.log('send order 1',this.indexPosition );
          if(size>0){
        //    console.log('send order 1',size/(this.rnd_Index*(1)));
            this.indexPosition+=size/(this.rnd_Index*(1+this.spreadfees));
            console.log('send order 1',size/(this.rnd_Index*(1+this.spreadfees)) );
          }else{  
            this.indexPosition+=size/(this.rnd_Index*(1-this.spreadfees));
          }
          console.log('send order 2',this.indexPosition );
       //   this.setTotalBalance();
                   

        }
      }
//      this.updateTradingData(this.rnd_Index);
    }

    onGamepadEvent(events : JoysticksEvent[]){
      console.log('onGamepadEvent Play',events);
      events.forEach(event => {
        if(event.type == "pressed"){
          switch(event.name){
            case "RB":
 //             this.navigatetoNext();
            break;
            case "LB":
   //            this.navigatetoPrevious();
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