import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'app/services/service.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

  @Input()
  cards: any;

  showLoading: boolean = false;

  constructor(private service: Service) { }

  ngOnInit() {}

  // infinit scroll
  onScroll() {
    this.showLoading = true;
      setTimeout(()=>{
        this.service.fetchNextCards(this.cards.length - 1)
        .subscribe((newCards) => {
          this.cards = _.concat(this.cards, newCards)
          this.showLoading = false;
        }, (error) => {
          this.showLoading = false;
        })
      },2000);
  }

   // isFavorite card
   isFavorite(favorite):void {
    this.cards.push[favorite]
  }
}
