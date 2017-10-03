import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  objectKeys = Object.keys;
  cryptos: any;
  usd = true;
  eur = false;
  user: Observable<firebase.User>;

  constructor(private _data: DataService,
              public afAuth: AngularFireAuth) {
    this.user = afAuth.authState
  }

  ngOnInit() {
    this._data.getPrices()
      .subscribe(res => {
        this.cryptos = res;
        console.log(res);
      });
  }
  changeCur(curr: string){
    if( curr === 'usd'){
      this.usd = true;
      this.eur = false;
    } else {
      this.usd = false;
      this.eur = true;
    }
  }
  //login() {
  //  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  //}

   login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
