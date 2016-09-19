import { Component, ApplicationRef } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

@Component({
  selector: 'next-races',
  templateUrl: './components/next-races/next-races.html'
})

export class NextRaces {
  constructor(http: Http, ref: ApplicationRef) {
  	this.http = http;
  	this.nextRacesData = {};
  	this.closestRaceData = this.getInitialRaceDataStructure();
  	//I would use that for js timestamp while checking with callback timestamp included in json, for this task I use static generated value
  	//this.currentTime = new Date().getTime();
  	this.currentTime = 1429890900;
  	this.ref = ref;
  	this.displayTypeD = true;
  	this.displayTypeG = true;
  	this.displayTypeJ = true;
  	this.displayTypeT = true;
  	this.displayTypeDClass = 'active';
  	this.displayTypeGClass = 'active';
  	this.displayTypeJClass = 'active';
  	this.displayTypeTClass = 'active';

  }

  ngOnInit() {
    this.getNextRacesData();
  }

  getNextRacesData() {
    this.http.get('./next_races.json')
      .map((res:Response) => res.json())
      .subscribe(
        res => { this.nextRacesData = res},
        err => console.error(err),
        () => {
        	if (this.nextRacesData.status === 'success')
        		this.nextRacesData.filter_types =  ["T", "D", "G", "J"];
        	   	this.closestRaceData = this.nextRacesData.data.races[0];
        		this.getLatestRace();
        }
      );

   }

   getInitialRaceDataStructure() {
   	return {
		"id_race": null,
		"event": {
		  "title": "",
		  "country": ""
		},
		"race_type": "",
		"post_time": null,
		"diff_time": null,
		"num_runners": null,
		"distance": null,
		"purse": {
		  "amount": null,
		  "currency": null
		},
		"runners": [
		  {
		    "id_runner": null,
		    "name": "",
		    "odds": 0,
		    "silk": ""
		  },
		  {
		    "id_runner": null,
		    "name": "",
		    "odds": 0,
		    "silk": ""
		  },
		  {
		    "id_runner": null,
		    "name": "",
		    "odds": 0,
		    "silk": ""
		  }
		],
		//additional property
		"filter_types": ["T", "D", "G", "J"]
  	}
   }

   getLatestRace() {
        for (var i = 0; i < this.nextRacesData.data.races.length; i++) {
          if ((this.currentTime < this.nextRacesData.data.races[i].post_time) && (this.nextRacesData.filter_types.contains(this.nextRacesData.data.races[i].race_type) === true)) {
            this.closestRaceData = this.nextRacesData.data.races[i];
            this.closestRaceData.diff_time = parseInt(Math.floor((this.closestRaceData.post_time - this.currentTime)/1000/60))
            i = this.nextRacesData.data.races.length;
            this.ref.tick();
          }

          if (i === this.nextRacesData.data.races.length -1) {
            this.getNextRacesData();
          }
        }
   	  	this.closestRaceData.diff_time = parseInt(Math.floor((this.closestRaceData.post_time - this.currentTime)/1000/60));
   }

   setFiltering(race_type) {
   	this.setButtons(race_type);

    if ( this.nextRacesData.filter_types.contains(race_type)) {
    	var i = this.nextRacesData.filter_types.indexOf(race_type);
		if(i != -1) {
			this.nextRacesData.filter_types.splice(i, 1);
      setTimeout(() =>  {
        console.log(this.nextRacesData.filter_types);
        this.getLatestRace();
      });
		}
    } else {
    	this.nextRacesData.filter_types.push(race_type);
      setTimeout(() => {
          console.log(this.nextRacesData.filter_types);
          this.getLatestRace();
      });
    }
   }

   setButtons(race_type) {
   		switch(race_type) {
   			case 'D':
   				this.displayTypeD = !this.displayTypeD;
   				this.displayTypeDClass = this.displayTypeD ? 'active' : '';
   				break;
   		  case 'T':
   				this.displayTypeT = !this.displayTypeT;
   				this.displayTypeTClass = this.displayTypeT ? 'active' : '';
   		     break;
   	    case 'G':
   				this.displayTypeG = !this.displayTypeG;
   				this.displayTypeGClass = this.displayTypeG ? 'active' : '';
   				break;
   	    case 'J':
   				this.displayTypeJ = !this.displayTypeJ;
   				this.displayTypeJClass = this.displayTypeJ ? 'active' : '';
   				break;
   		}
   }
}
