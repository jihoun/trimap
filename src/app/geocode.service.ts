import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';

declare let google: any;

@Injectable()
export class GeocodeService extends GoogleMapsAPIWrapper {
  private geoCoder: any = null;

  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  public getLatLon(address: string, country: string): Observable<any> {
    if (address===undefined || address===null || address==='') {
      return Observable.create(observer => observer.complete());
    }
    if (this.geoCoder===null) {
      this.geoCoder = new google.maps.Geocoder();
    }
    return Observable.create(observer => {
      let request = null;
      if (country!==undefined && country !==null && country!=='') {
        request = {
          address: address,
          region: country
        };
      } else {
        request = { address: address};
      }
      this.geoCoder.geocode(request, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.info('yay');
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          // observer.next({});
          observer.complete();
        }
      });
    })
  }
}
