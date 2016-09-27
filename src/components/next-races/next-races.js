import { Component } from '@angular/core';
import { NextRacesService } from '../../services';
import { RaceTypePipe } from '../../pipes/race-type-pipe';

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
  templateUrl: 'components/next-races/next-races.html',
  pipes: [RaceTypePipe]
})

export class NextRaces {

  constructor(nextRacesService: NextRacesService) {
  	this.nextRacesData = {};
    this.nextRacesService = nextRacesService;
  	this.displayTypeD = true;
  	this.displayTypeG = true;
  	this.displayTypeJ = true;
  	this.displayTypeT = true;
  	this.displayTypeDClass = 'active';
  	this.displayTypeGClass = 'active';
  	this.displayTypeJClass = 'active';
  	this.displayTypeTClass = 'active';
    this.activeFilters = ["G", "J", "T", "D"]

    this.nextRacesData = this.nextRacesService.getMockedData();

  }

  ngOnInit() {
    this.getNextRacesData();
  }

  getNextRacesData() {
      this.nextRacesService.getNextRaces()
        .then((data) => { this.nextRacesData = data; })

  }

  setFiltering(race_type) {
    this.setButtons(race_type);

    if ( this.activeFilters.contains(race_type)) {
      var i = this.activeFilters.indexOf(race_type);
      if(i != -1) {
        this.activeFilters.splice(i, 1);
      }
    } else {
      this.activeFilters.push(race_type);
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
