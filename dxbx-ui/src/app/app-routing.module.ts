import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { TradeComponent } from './trade/trade.component';
import { PoolsComponent } from './pools/pools.component';
import { CoinsComponent } from './coins/coins.component';
import { PoolComponent } from './pool/pool.component';
import { WormholeComponent } from './wormhole/wormhole.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flipper',
    pathMatch: 'full',
    title: 'dxbx-ui',
  },
  { path: 'flipper', component: PlayComponent, title: 'flip on dxbx' },
  { path: 'trade', component: TradeComponent, title: 'trade on dxbx' },
  { path: 'pools', component: PoolsComponent, title: 'pools on dxbx' },
  { path: 'coins', component: CoinsComponent, title: 'coins' },
  { path: 'pool', component: PoolComponent, title: 'pool' },
  { path: 'wormhole', component: WormholeComponent, title: 'wormhole' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
