import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;
  chartResult:any;


  constructor(private _http: HttpClient) { }

  getPrices() {
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT,ETC,ZEC&tsyms=USD,EUR')
      .map(result => this.result = result);
  }

  getCharts() {
    return this._http.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=999999999&aggregate=3&e=CCCAGG')
      .map(chartResult => this.chartResult = chartResult);
  }

}
