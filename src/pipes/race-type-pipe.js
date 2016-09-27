import {Pipe} from '@angular/core';

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}


@Pipe({
  name: 'RaceTypePipe',
  pure: false
})

export class RaceTypePipe {

  transform(value, args) {

    let raceTypes = args;

    return value.filter(race => {
      return raceTypes.contains(race.race_type)
  	});
  }
}