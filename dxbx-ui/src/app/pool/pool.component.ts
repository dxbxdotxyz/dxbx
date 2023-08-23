// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pool',
//   templateUrl: './pool.component.html',
//   styleUrls: ['./pool.component.scss']
// })
// export class PoolComponent {

// }


import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pool } from '../pool';
import { PoolService } from '../pool.service';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {
  @Input() pool?: Pool;

  constructor(
    private route: ActivatedRoute,
    private poolService: PoolService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPool();
  }

  getPool(): void {
    console.dir(this.route.snapshot.queryParamMap);

    const coins = this.route.snapshot.queryParamMap.get('coins');
    if (coins === null) {
      return;
    }
    console.log('coins',coins);
    const matched = coins.match(/^([^-]+)-([^-]+)$/);
    if (matched === null) {
      return;
    }

    this.poolService
      .getPool(matched[1], matched[2])
      .subscribe((pool) => (this.pool = pool));
  }

  goBack(): void {
    this.location.back();
  }
}
