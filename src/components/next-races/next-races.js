import { Component, trigger, state, style, transition, animate  } from '@angular/core';
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
  pipes: [RaceTypePipe],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
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
    this.activeFilters = ["G", "J", "T", "D"];
    this.postTimeUpdateInterval;

    this.nextRacesData = this.nextRacesService.getMockedData();

  }

  ngOnInit() {
    this.getNextRacesData();
  }

  getNextRacesData() {
      this.nextRacesService.getNextRaces()
        .then((data) => {
         this.nextRacesData = data;

         clearInterval(this.postTimeUpdateInterval);
         this.postTimeUpdateInterval = setInterval(() => {
            console.log('dzialam');
            this.nextRacesData.races.forEach((item, index) => {
              item.post_time--;
              if (item.post_time === 0) {
                  this.nextRacesData.races.splice(index, 1);

                  if (this.nextRacesData.races.length === 0) {
                    //take a new request
                  }
              }
            });
         }, 60000);
       })
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
