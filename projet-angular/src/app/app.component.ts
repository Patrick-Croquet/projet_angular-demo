import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'projet-angular';
  isAuth = false;

  // fleurOne = 'Pivoine';
  // fleurTwo = 'Marguerite';
  // fleurThree = 'Jacinthe';

  // statusOne = 'arrosée';
  // statusTwo = 'non arrosée';

  fleurs = [
    {
      name: 'Pivoine',
      status: 'arrosée'
    },
    {
      name: 'Marguerite',
      status: 'arrosée'
    },
    {
      name: 'Jacinthe',
      status: 'non arrosée'
    }
  ];

  constructor() {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  onArroser() {
    console.log('On arrose tout !');
  }
}


