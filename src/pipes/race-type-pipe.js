//unused

import {Pipe} from 'angular2/core';

@Pipe({
  name: 'RaceTypePipe'
})
export class RaceTypePipe {

  transform(value, args?) {
    // ES6 array destructuring
    let [raceTypes] = args;
    return value.filter(this.closestRaceData => {
      return this.closestRaceData.raceType !== raceTypes
  	});
  }
}