import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuickWSService {

  private priceindex: Subject<number> = new Subject<number>();
  priceindex$ = this.priceindex.asObservable();
  private now=Date.now();// : number;
  private MYCNWS: any;
  private interval: any;
  public messages: any[] = [];

  constructor() { 
    this.initCNWebsocket();
  }

  initCNWebsocket(){
  
    const url ="wss://dxbx.xyz/ws/";
    this.MYCNWS= new WebSocket(url);
    const ws=this.MYCNWS;
    ws.onopen = () => {
      console.log('connection dxbx on open');
      this.onOpen();
    };
    ws.onmessage = (msg:any)  => {
      this.onMessage(msg);
    };
    ws.onerror = (error:any) => {
      console.log('WebSocket dxbx error: ${error}');
    };
    ws.onclose = (code:any, reason:any) => {
      console.log('WebSocket dxbx close: ${error}');
      this.onClose(code,reason);
      const that=this;
      setTimeout(function(){that.initCNWebsocket(); }, 3000);
    };
  }

  private onOpen() {
    console.log(`Connected to dxbx_AIP41`);
  }

    private onMessage(mymessage:any) {
      const message = JSON.parse(mymessage.data);
     if (message.type === 'kafka') {
        this.priceindex.next(message.content);
        const mytime=Date.now();
        this.messages.push({ time: mytime, indexvalue:   message.content});   //{time: this.now , indexvalue: value_received});
        this.messages = this.messages.slice(-30);
      }
    }
   
    private onClose(code: number, reason: string) {
      console.log(`Websocket connection is closed.code=${code},reason=${reason}`);
      this.MYCNWS = undefined;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  
    close() {
      if (this.MYCNWS) {
        console.log(`Closing websocket connection...`);
        this.MYCNWS.close();
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
        this.MYCNWS = undefined;
      }
    }
  
    private send(messageObject: any) {
      if (!this.MYCNWS) throw Error('socket is not open');
      this.MYCNWS.send(JSON.stringify(messageObject));
    }
}
