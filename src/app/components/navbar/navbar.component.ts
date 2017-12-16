import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{

  menu : Array<any>;
  constructor() {
    // menus
    this.menu = [
      {name : 'Início'},
      {name : 'Grávidas'},
      {name : 'Pediatria'},
      {name : 'Amamentação'},
      {name : 'Dermatologista'},
      {name : 'Oftalmologista'},
      {name : 'Vácinas'}
    ];
  }
}
