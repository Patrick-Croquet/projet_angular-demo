import { Component, OnInit } from '@angular/core';
import FleursData from '../assets/data.json';

interface Fleur {
  id: Number;
  name: String;
  status: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //title = 'projet-angular';

  fleurs: Fleur[] = FleursData;

  isAuth = false;

  // fleurOne = 'Pivoine';
  // fleurTwo = 'Marguerite';
  // fleurThree = 'Jacinthe';

  // statusOne = 'arrosée';
  // statusTwo = 'non arrosée';

  // fleurs = [
  //   {
  //     name: "rose",
  //     status: "arrosée"
  //   },
  //   {
  //     name: "marguerite",
  //     status: "arrosée"
  //   },
  //   {
  //     name: "jacinthe",
  //     status: "non arrosée"
  //   }
  // ];

  constructor() {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  ngOnInit(){
    console.log(FleursData);
  }

  onArroser() {
    console.log('On arrose tout !');
  }
}


