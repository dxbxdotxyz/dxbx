import { Component } from '@angular/core';
import{LocalstorageService} from '../localstorage.service';



@Component({
  selector: 'app-wormhole',
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss']
})
export class WormholeComponent {

   public mytheme;// = {"mode":"dark"};

  getTheme() {
    return this.mytheme;
  }

  constructor(private mypersistent:LocalstorageService) {
    //this.mytheme= this.mypersistent.get('maintheme') 
    this.mytheme=  JSON.stringify({ mode: 'light' });

    this.mount();
  }


  public async mount() {
   
    const script = document.createElement("script");
    script.src = "https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.0.9/dist/main.js";
    script.async = true;
  
    const link = document.createElement("link");
    link.href = "https://www.unpkg.com/@wormhole-foundation/wormhole-connect@0.0.9/dist/main.css";
  
    document.body.appendChild(script);
    document.body.appendChild(link);
  }
}
