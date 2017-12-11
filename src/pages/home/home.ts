import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  public cards: Array<any>;
  private url: string = "assets/data/bennu.json";
  public menus: Array<any>;
  public avatar: Array<any>;

  constructor(public navController: NavController, public http: Http) {

    // menus
    this.menus = [
      {name : 'Início'},
      {name : 'Grávidas'},
      {name : 'Pediatria'},
      {name : 'Amamentação'},
      {name : 'Dermatologista'},
      {name : 'Oftalmologista'},
      {name : 'Vácinas'}
    ];

      //avatar
      this.avatar =[
        { 'name' : 'David Vanker' },
        { 'nationality' : 'Vancouve, Canadá' },
        { 'imagem' : 'avatar.jpg' }
      ]

    // map card list
    this.http.get(this.url).map(res => res.json())
    .subscribe(data => {
      this.cards = data.data;
    });

  }
  // isFavorite card
  isFavorite(favorite):void {
    this.cards.push[favorite]
  }
}
