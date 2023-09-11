import { Injectable,OnInit, OnDestroy } from '@angular/core';
import {WalletCore,NetworkName,NetworkInfo, WalletName,Wallet,AccountInfo} from '@aptos-labs/wallet-adapter-core';
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";

const wallets:Wallet[] =   [ new PetraWallet(), new PontemWallet() ];

const networkInfoDev: NetworkInfo  = {
  name: NetworkName.Devnet,
  chainId: "0x77",
  url: 'https://fullnode.devnet.aptoslabs.com/',
};

const networkInfoTest: NetworkInfo  = {
  name: NetworkName.Testnet,
  chainId: "0x2",
  url: 'https://fullnode.testnet.aptoslabs.com/',
};

@Injectable({
  providedIn: 'root'
})
export class AptosWalletService implements OnInit, OnDestroy   {
  public wallet:WalletCore;

  ngOnInit() {
    console.log("AptosWalletService ngOnInit");
  }

  ngOnDestroy() {
    console.log("AptosWalletService ngOnDestroy");
  }

  constructor() {
    console.log("AptosWalletService constructor");
  }

public  connectWallet(walletname:WalletName) {
  console.log("connectWallet wallets",wallets);

  this.wallet = new WalletCore(wallets);
  
  //const mywalletname:WalletName = "Petra" as WalletName;//<"Petra">;
  const mywalletname:WalletName =walletname;// "Petra" as WalletName;//<"Petra">;

  this.wallet.on('networkChange', (network: NetworkInfo | null) => {console.log('network change')  ;});
  this.wallet.on('disconnect', () => {console.log('registered disconnect received')  ;});
  this.wallet.on('accountChange', (account: AccountInfo | null) => {console.log('registered accountChange received')  ;});
  this.wallet.on('readyStateChange', (wallet: Wallet) => {console.log('registered readyStateChange received')  ;});
  this.wallet.on('connect', (account: AccountInfo | null) => {console.log('registered connect received')  ;});

  this.wallet.setNetwork(networkInfoDev);
  console.log("Angular wallet  ",this.wallet );
  console.log("Angular wallet account ",this.wallet.account );
  this.wallet.connect(mywalletname)
    .then((res) => {
      console.log("connected to petra",res);
      console.log("Angular wallet isconnected ",this.wallet.isConnected() );
    })
    .catch((err) => {console.log("error connecting to petra",err)});
  }
      
public disconnectWallet() {
    console.log("disconnectWallet");
    this.wallet.disconnect().then((res:any) => {console.log("success disconnect",res);}).catch((err) => {console.log("error disconnect");});
  }
    
public testWallet_one(){
  console.log("testWallet_one");
  console.log("wallet",this.wallet);
  console.log("wallet.account",this.wallet.account);
  }

  public testWallet_two(){
    this.wallet.setNetwork(networkInfoTest);
    console.log("2testWallet_two",this.wallet.account);
  }
}