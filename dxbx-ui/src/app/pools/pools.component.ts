// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pools',
//   templateUrl: './pools.component.html',
//   styleUrls: ['./pools.component.scss']
// })
// export class PoolsComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pool } from '../pool';
import { PoolService } from '../pool.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.scss'],
})
export class PoolsComponent implements OnInit {
  pools: Observable<Pool[]> = of([]);
  constructor(private poolService: PoolService) {}

  ngOnInit(): void {
    this.pools = this.poolService.getPools();
  }
}
