import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServiceModule } from 'app/services/service.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadscrollComponent } from './components/loadscroll/loadscroll.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardsComponent,
    NavbarComponent,
    LoadscrollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ServiceModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
