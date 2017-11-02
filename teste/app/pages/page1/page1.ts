import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
	public feeds: Array<string>;
	private url: string = "http://www.mocky.io/v2/59fb74b52d0000971d1241e2";

	constructor(private navController: NavController, public http: Http) {
    	this.http.get(this.url).map(res => res.json())
    	.subscribe(data => {    		
    		this.feeds = data.data;
    	});
	}

	onLink(url: string) {
    	window.open(url);
	}

}
