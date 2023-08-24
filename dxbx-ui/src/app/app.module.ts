import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TradeComponent } from './trade/trade.component';
import { PlayComponent } from './play/play.component';
import { PoolsComponent } from './pools/pools.component';
import { CoinsComponent } from './coins/coins.component';
import { PoolComponent } from './pool/pool.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { WormholeComponent } from './wormhole/wormhole.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatSnackBar} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    TradeComponent,
    PlayComponent,
    PoolsComponent,
    CoinsComponent,
    PoolComponent,
    ThemeSwitchComponent,
    WormholeComponent
  ],
  imports: [
    MatSnackBarModule,
    AgChartsAngularModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
