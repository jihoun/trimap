import {Component, OnInit} from '@angular/core';

import {Race} from './race.model';
import {EventsService} from './events.service';
import {GeocodeService} from "./geocode.service";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html',
  providers: [EventsService, GeocodeService]
})
export class AppComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  races: Array<Race>;
  fancyRaces: Array<Race> = [];

  errorMessage: String = '';

  constructor (private eventsService: EventsService, private geocode: GeocodeService) {}

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(
        events => { this.races = events; this.fetchLocations()},
        error => this.errorMessage = <any>error
    );
  }

  fetchLocations(): void {
    for (let race of this.races) {
      this.geocode.getLatLon(race.address, race.country)
          .subscribe(
              latLng => {race.lat = latLng.lat(); race.lon = latLng.lng(); this.fancyRaces.push(race);}
          );
    }
  }
}
