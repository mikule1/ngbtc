import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { trigger, state, style, animate, transition, group } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // DEFAULT STATES
    trigger('enterLeave', [
      // :ENTER TRANSITION
      // Transition Styles
      transition('void => *', [
        // 'From' styles
        style({
          opacity: 0.2,
          transform: 'translateX(-100vw)'
        }),
        animate('1000ms ease-in',
          // 'To' styles
          // 1 - Comment this to remove the item's grow...
          style({
            opacity: 1,
            transform: 'scale(1.2)'
          })
        )
      ]),

      // :LEAVE TRANSITION
      // 2 - Uncomment this to apply the leave transition
      /* transition('* => void', [
        animate('1000ms ease-in-out',
          style({
            opacity: 0.2,
            transform: 'translateX(100%)'
          })
        )
      ])*/

      // GROUPED ANIMATIONS
      // Nos permite realizar animaciones en paralelo
      /* transition('* => void', [
        group([
          animate('1s ease',
            style({
              backgroundColor: '#ffc107'
            })
          ),
          animate('2s 1.5s ease',
            style({
              opacity: 0.2,
              transform: 'translateX(100%)'
            })
          ),
        ])
      ]) */
    ]),

    // CUSTOM STATES
    // FINAL: Aplica un style final al elemento, una vez que el elemento ya ha
    // realizado la transición al estado
    trigger('selected', [
      state('selected',
        style({
          backgroundColor: 'whitesmoke',
          transform: 'scale(1.2)',
        })
      ),
      // 3 - Comment this and Uncomment GROUPED ANIMATIONS to see them in action.
      transition('selected <=> *', [
        animate('300ms ease-in')
      ]),
      // GROUPED ANIMATIONS
      /* transition('selected => *', [       
        group([
          // Apply pink color to the item and
          animate('1s ease',
            style({
              backgroundColor: '#ff4081'
            })
          ),
          // after a second, fade it to the background 
          animate('2s 1.5s ease',
            style({
              opacity: 0.2,
              transform: 'scale(0.5)'
            })
          ),
        ])
      ])*/
    ])
    // ANIMATION CALLBACKS
  ]
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

   login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  logIt(event) {
    console.log('Animation done, $event: ', event);
  }
  
}
