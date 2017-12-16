import { Component, OnInit } from '@angular/core';
import { Service } from 'app/services/service.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  cards: Array<any>;
  cardsFiltered: Array<any>;

  constructor(private service: Service) {

  }

  ngOnInit(): void {
    this.service.fetchFirstCards().subscribe((resp) => {
      this.cards = this.cardsFiltered = resp;
    })
  }

  filterCards(queryText: string): void {
    if (queryText.length > 0) {
      this.cardsFiltered = _.filter(this.cards, function (card) { return card.descricao.toLowerCase().search(queryText) > -1 || card.titulo.toLowerCase().search(queryText) > -1 });
    } else {
      this.cardsFiltered = this.cards
    }
  }




}
