// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PoolService {

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap, forkJoin } from 'rxjs';
import { REQUESTS } from './apt-utils/coinlist';
import {
  coinInfoFromHippo,
  CoinInfoMap,
  enrichPool,
  HippoCoinInfo,
  Pool,
} from './pool';

const mylist= REQUESTS;

/*
const mylist=[
  {
    "name": "Aptos Coin",
    "symbol": "APT",
    "official_symbol": "APT",
    "coingecko_id": "aptos",
    "decimals": 8,
    "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/APT.webp",
    "project_url": "https://aptoslabs.com/",
    "token_type": {
      "type": "0x1::aptos_coin::AptosCoin",
      "account_address": "0x1",
      "module_name": "aptos_coin",
      "struct_name": "AptosCoin"
    },
    "extensions": {
      "data": [
        [
          "bridge",
          "native"
        ]
      ]
    },
    "unique_index": 1,
    "source": "native",
    "permissioned_listing": true,
    "hippo_symbol": "APT",
    "pancake_symbol": "APT"
  },
  {
    "name": "Meeiro",
    "symbol": "MEE",
    "official_symbol": "MEE",
    "coingecko_id": "",
    "decimals": 6,
    "logo_url": "https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/icons/MEE.svg",
    "project_url": "https://meeiro.xyz",
    "token_type": {
      "type": "0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9::mee_coin::MeeCoin",
      "account_address": "0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9",
      "module_name": "mee_coin",
      "struct_name": "MeeCoin"
    },
    "extensions": {
      "data": [
        [
          "bridge",
          "native"
        ]
      ]
    },
    "unique_index": 101,
    "source": "native",
    "permissioned_listing": true,
    "hippo_symbol": "MEE",
    "pancake_symbol": "MEE"
  },
  


];
*/


function getHippoUrl(network: string): string {
  switch (network) {
    case 'mainnet':
      return 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/typescript/src/defaultList.mainnet.json';
    case 'testnet':
      return 'https://raw.githubusercontent.com/hippospace/aptos-coin-list/main/typescript/src/defaultList.testnet.json';
   
  }
  
  console.log('unknown network getHippoUrl will retur NULL', network)
  return '';
}

export interface PoolServiceConfig {
  network: string;
  url: string;
  module_address: string;
}

export interface AptosAccountResource {
  type: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class PoolService {
  config: PoolServiceConfig = {
    network: 'devnet',
    url: 'https://fullnode.devnet.aptoslabs.com/',
    module_address:
      '0x8cbd7347ea84a549d3fb6a3a4579ce56b4057edc52d85f06e14a7864dab67662',
  };

  constructor(private http: HttpClient) {}

  updateConfig(new_config: PoolServiceConfig) {
    this.config = new_config;
  }

  getCoinList(network: string): Observable<HippoCoinInfo[]> {
    const url = getHippoUrl(network);
    if (url !== '') {
      return this.http.get<HippoCoinInfo[]>(url).pipe(tap(console.dir));

    } else {
   //   return of([]);
   return of(mylist);
   
    }
  
  }

  getPools(): Observable<Pool[]> {
    const account_path = `v1/accounts/${this.config.module_address}/resources`;
    const url = new URL(account_path, this.config.url).href;
    const pool_regex = new RegExp(
      `${this.config.module_address}::amm::Pool<.*>$`
    );

    let pools = this.http.get<AptosAccountResource[]>(url).pipe(
      tap((values) => console.dir(values)),
      map((resources) => resources.filter((x) => x.type.match(pool_regex)))
    );

    let hippoCoins = this.getCoinList(this.config.network).pipe(
      map((hcoins) => {
        let result: CoinInfoMap = {};
        for (const ah of hcoins) {
          result[ah.token_type.type] = coinInfoFromHippo(ah);
        }

        return result;
      })
    );

    return forkJoin({
      pools,
      hippoCoins,
    }).pipe(
      map(({ pools, hippoCoins }) =>
        pools.map((x) => enrichPool(x.data as Pool, x.type, hippoCoins))
      )
    );
  }

  getPool(coin1: string, coin2: string): Observable<Pool> {
    const account_path = `v1/accounts/${this.config.module_address}/resource/${this.config.module_address}::amm::Pool<${coin1},${coin2}>`;
    const url = new URL(account_path, this.config.url).href;
    let hippoCoins = this.getCoinList(this.config.network).pipe(
      map((hcoins) => {
        let result: CoinInfoMap = {};
        for (const ah of hcoins) {
          result[ah.token_type.type] = coinInfoFromHippo(ah);
        }

        return result;
      })
    );
    return forkJoin({
      hippoCoins: hippoCoins,
      pool: this.http.get<AptosAccountResource>(url),
    }).pipe(
      map(({ hippoCoins, pool }) =>
        enrichPool(pool.data as Pool, pool.type, hippoCoins)
      )
    );
  }
}




