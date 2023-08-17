import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { TradeComponent } from './trade/trade.component';
import { PoolsComponent } from './pools/pools.component';
import { CoinsComponent } from './coins/coins.component';
import { PoolComponent } from './pool/pool.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quick',
    pathMatch: 'full',
    title: 'dxbx-ui',
  },
  { path: 'quick', component: PlayComponent, title: 'quick on dxbx' },
  { path: 'trade', component: TradeComponent, title: 'trade on dxbx' },
  { path: 'pools', component: PoolsComponent, title: 'pools on dxbx' },
  { path: 'coins', component: CoinsComponent, title: 'coins' },
  { path: 'pool', component: PoolComponent, title: 'pool' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
