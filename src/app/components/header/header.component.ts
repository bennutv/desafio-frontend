import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('queryText')
  searchInputEmitter = new EventEmitter();

  searchInput: string = "";

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.searchInputEmitter.emit(this.searchInput.toLowerCase());
  }

  showHide: any = {
    search: false,
    active: false
  }

  toggleButton(button: string): void {
      this.showHide[button] = !this.showHide[button];
  }
}
