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
                                                let currentTime = new Date(1429890900), // just for mock purpose
                                                    raceTime = new Date(item.post_time);

                                                item.post_time = raceTime.getHours()*1000*60 + raceTime.getMinutes()
                                                                    - currentTime.getHours()*1000*60 - currentTime.getMinutes();

                                                console.log(item.post_time);
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
                                "id_race": 1647215,
                                "event": {
                                  "title": "Redcliffe",
                                  "country": "IE"
                                },
                                "race_type": "T",
                                "post_time": 1439970900,
                                "num_runners": 9,
                                "distance": 1780,
                                "purse": {
                                  "amount": 250,
                                  "currency": "GBP"
                                },
                                "runners": [
                                  {
                                    "id_runner": 15717421,
                                    "name": "Triumphant Knight",
                                    "odds": 4.7,
                                    "silk": ""
                                  },
                                  {
                                    "id_runner": 15717423,
                                    "name": "My Aliyana",
                                    "odds": 3,
                                    "silk": ""
                                  },
                                  {
                                    "id_runner": 15717425,
                                    "name": "Badjellys Courage",
                                    "odds": 4,
                                    "silk": ""
                                  }
                                ]
                              }]
                        }
                }

}