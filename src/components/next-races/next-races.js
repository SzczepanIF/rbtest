import { Component } from '@angular/core';
import { NextRacesService } from '../../services';
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

  constructor(nextRacesService: NextRacesService) {
  	this.nextRacesData = {};
    this.nextRacesService = nextRacesService;
    console.log(this.nextRacesService);
  	//I would use that for js timestamp while checking with callback timestamp included in json, for this task I use static generated value
  	//this.currentTime = new Date().getTime();
  	this.currentTime = 1429890900;
  	this.displayTypeD = true;
  	this.displayTypeG = true;
  	this.displayTypeJ = true;
  	this.displayTypeT = true;
  	this.displayTypeDClass = 'active';
  	this.displayTypeGClass = 'active';
  	this.displayTypeJClass = 'active';
  	this.displayTypeTClass = 'active';
    this.getNextRacesData();

  }

  ngOnInit() {
    this.getNextRacesData();
  }

  getNextRacesData() {
    this.nextRacesData = this.nextRacesService.getNextRaces();
    console.log(this.nextRacesData);
  }

  getLatestRace() {

  }

  setFiltering() {

  }

  setButtons() {

  }
}
