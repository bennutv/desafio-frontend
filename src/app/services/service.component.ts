import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class Service {

	private url: any = "assets/data/bennu.json";

	private size: any = 8

	constructor(public http: Http) { }

	public fetchFirstCards() {
		return this.http.get(this.url)
			.map(res => res.json().data)
			.map(data => _.slice(data, 0, this.size))
			.do((result) => console.log("result", result))
	}

	public fetchNextCards(indice) {
		return this.http.get(this.url)
			.map(res => res.json().data)
			.map(data => _.slice(data, indice, indice + this.size))
			.do((result) => console.log("result", result))
	}

}
