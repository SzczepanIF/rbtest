import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


export class NextRacesService {

	constructor(http: Http) {
		this.http = http;
	}

	getNextRaces() {
               let nextRaces = {};

               return new Promise(function(resolve, reject) {
                          // async stuff, like fetching users from server, returning a response
                        this.http.get('./next_races.json')
                        .map((res:Response) => res.json())
                        .subscribe(
                                res => { nextRaces = res },
                                err => console.error('err'),
                                () => {
                                   if(nextRaces.status === "success") {
                                        nextRaces.data.races.forEach((item, index) => {
                                                let currentTime = new Date(1439970500), // just for mock purpose
                                                    raceTime = new Date(item.post_time);

                                                item.post_time = parseInt((raceTime - currentTime) /60);
                                        });
                                        resolve(nextRaces.data);
                                   } else reject('No data')
                                });
                }.bind(this));
	}

        getMockedData() {
                return {
                        "races": [
                              {
                                "id_race": 0,
                                "event": {
                                  "title": "",
                                  "country": ""
                                },
                                "race_type": "",
                                "post_time": 0,
                                "num_runners": 0,
                                "distance": 0,
                                "purse": {
                                  "amount": 0,
                                  "currency": ""
                                },
                                "runners": [
                                  {
                                    "id_runner": 0,
                                    "name": "",
                                    "odds": 0,
                                    "silk": ""
                                  },
                                  {
                                    "id_runner": 0,
                                    "name": "",
                                    "odds": 0,
                                    "silk": ""
                                  },
                                  {
                                    "id_runner": 0,
                                    "name": "",
                                    "odds": 0,
                                    "silk": ""
                                  }
                                ]
                              }]
                        }
                }

}