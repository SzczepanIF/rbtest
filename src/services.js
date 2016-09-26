import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


export class NextRacesService {

	constructor(http: Http) {
		this.http = http;
		this.nextRacesData = {}
	}

	getNextRaces() {
	       this.http.get('./next_races.json')
                .map((res:Response) => res.json())
                .subscribe(
                res => { this.nextRacesData = res},
                err => console.error(err),
                () => {
                	if (this.nextRacesData.status === 'success')
                	        console.log(this.nextRacesData.status);
                		return this.nextRacesData.data.races[0];
                });
	}
}