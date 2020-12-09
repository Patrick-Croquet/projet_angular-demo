# projet_angular
 Projet Angular

Depuis une ligne de commandes, naviguez vers votre dossier cible et tapez la commande suivante :

ng new projet-angular --style=scss --skip-tests=true

vous pouvez ouvrir le dossier
cd projet-angular

Installer Bootstrap dans le projet
npm install bootstrap

Ouvrez le fichier angular.json
Dans "architect/build/options", modifiez l'array  styles  comme suit :
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.scss"
            ],

ng serve

Créer un component
ng generate component accueil

mis à jour le fichier  app.module.ts
Regardez maintenant le fichier  accueil.component.ts

Revenez dans  app.component.html  et modifiez-le comme suit :
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<app-accueil></app-accueil>

ng generate component fleur
Ensuite, ouvrez  app.component.html , et remplacez tout le contenu comme suit :
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h2>Mes fleurs</h2>
      <ul class="list-group">
        <app-fleur></app-fleur>
        <app-fleur></app-fleur>
        <app-fleur></app-fleur>
      </ul>
    </div>
  </div>
</div>

Modifiez  fleur.component.html  ainsi :
<li class="list-group-item">
    <h4>La {{ fleurName }}</h4>
</li>

Ouvrez maintenant  fleur.component.ts  : 
export class FleurComponent implements OnInit {

  fleurName: string = 'Pivoine'; //Ajoutez la ligne de code suivante

  constructor() { }

  ngOnInit(): void {
  }

Ajouter une méthode au fichier fleur.component.ts  :

getStatus() {
    return this.fleurStatus;
}

Modifiez maintenant le template pour prendre en compte ce changement :

<li class="list-group-item">
    <h4>La {{ fleurName }} a été {{ getStatus() }}</h4>
</li>

Dans  AppComponent, votre component de base (vous pouvez supprimer la variable title puisque vous ne l'utilisez plus) :
export class AppComponent {
  //title = 'projet-angular';
  isAuth = false;
}

Ajoutez maintenant un bouton au template global  app.component.html :
<button class="btn btn-success" disabled>Tout arroser</button>

Afin de lier disabled au TypeScript, il faut le mettre entre crochets [] et l'associer à la variable isAuth ainsi :

<button class="btn btn-success" [disabled]="!isAuth">Tout arroser</button>

Créez une méthode  constructor  dans  AppComponent , dans laquelle vous créerez une timeout qui associe la valeur  true à isAuth  après 4 secondes (pour simuler, par exemple, le temps d'un appel API) :

export class AppComponent {
  //title = 'projet-angular';
  isAuth = false;

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


Ajoutez la liaison suivante à votre bouton dans le template HTML :
<button class="btn btn-success" 
              [disabled]="!isAuth" 
              (click)="onArroser()">Tout arroser</button>


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FleurComponent } from './fleur/fleur.component';
import { FormsModule } from '@angular/forms'; //ligne à ajouter

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    FleurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule //ligne à ajouter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

Ajoutez un <input> dans votre template  fleur.component.html et liez-le à la variable  fleurName  en utilisant la directive  ngModel :

<li class="list-group-item">
    <h4>La {{ fleurName }} a été {{ getStatus() }}</h4>
    <input type="text" class="form-control" [(ngModel)]="fleurName">
</li>

Pour ce faire, il faut utiliser le décorateur  @Input()  en remplaçant la déclaration de la variable fleurName :

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fleur',
  templateUrl: './fleur.component.html',
  styleUrls: ['./fleur.component.scss']
})
export class FleurComponent implements OnInit {

  @Input() fleurName: string;
  //fleurName: string = 'Pivoine';

Ce décorateur, en effet, crée une propriété  appareilName  qu'on peut fixer depuis la balise  <app-fleur> :
  <ul class="list-group">
        <app-fleur fleurName="Pivoine"></app-fleur>
        <app-fleur fleurName="Marguerite"></app-fleur>>
        <app-fleur fleurName="Jacinthe"></app-fleur>>
  </ul>

Créez d'abord vos trois variables dans AppComponent :  
export class AppComponent {
  //title = 'projet-angular';
  isAuth = false;

  fleurOne = 'Pivoine';
  fleurTwo = 'Marguerite';
  fleurThree = 'Jacinthe';

Maintenant, utilisez les crochets  []  pour lier le contenu de ces variables à la propriété du component :
      <ul class="list-group">
        <app-fleur [fleurName]="fleurOne" [fleurStatus]="statusOne"></app-fleur>
        <app-fleur [fleurName]="fleurTwo" [fleurStatus]="statusOne"></app-fleur>
        <app-fleur [fleurName]="fleurThree" [fleurStatus]="statusOne"></app-fleur>
      </ul>

Les directives structurelles
*ngIf
Pour une démonstration simple, ajoutez une  <div>  rouge qui ne s'affichera que si la fleur n'est pas arrosée :

<li class="list-group-item">
    <div style="width:20px;height:20px;background-color:red;" 
       *ngIf="fleurStatus === 'non arrosée'"></div>
    <h4>La {{ fleurName }} a été {{ getStatus() }}</h4>
    <input type="text" class="form-control" [(ngModel)]="fleurName">
</li>

*ngFor
export class AppComponent {
  isAuth = false;

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

  <ul class="list-group">
        <app-fleur  *ngFor="let fleur of fleurs"
                       [fleurName]="fleur.name"
                       [fleurStatus]="fleur.status"></app-fleur>    
  </ul>

  Les directives par attribut
  ngStyle
 <h4 [ngStyle]="{color: getColor()}">La {{ fleurName }} a été {{ getStatus() }}</h4>

 Ici, vous faites appel à une fonction getColor() dans  fleur.component.ts  que vous allez maintenant créer :

   getColor() {
    if(this.fleurStatus === 'arrosée') {
      return 'green';
    } else if(this.fleurStatus === 'non arrosée') {
      return 'red';
    }


ngClass
<li [ngClass]="{'list-group-item': true,
                'list-group-item-success': fleurStatus === 'arrosée',
                'list-group-item-danger': fleurStatus === 'non arrosée'}">
    <div style="width:20px;height:20px;background-color:red;" 
       *ngIf="fleurStatus === 'non arrosée'"></div>
    <!--<h4>La {{ fleurName }} a été {{ getStatus() }}</h4>-->
    <h4 [ngStyle]="{color: getColor()}">La {{ fleurName }} a été {{ getStatus() }}</h4>
    <input type="text" class="form-control" [(ngModel)]="fleurName">
</li>