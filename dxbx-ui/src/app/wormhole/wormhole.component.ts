import { Component } from '@angular/core';

@Component({
  selector: 'app-wormhole',
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss']
})
export class WormholeComponent {

   public mytheme = "dark";

  getTheme() {
    return this.mytheme;
  }

  constructor() {
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
