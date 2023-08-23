// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-coins',
//   templateUrl: './coins.component.html',
//   styleUrls: ['./coins.component.scss']
// })
// export class CoinsComponent {

// }


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HippoCoinInfo } from '../pool';
import { PoolService } from '../pool.service';
//d

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit {
  coins?: Observable<HippoCoinInfo[]>;

  constructor(private poolService: PoolService) {}

  ngOnInit(): void {
    this.coins = this.poolService.getCoinList('devnet');
  }
}
