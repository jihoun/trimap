import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Race} from './race.model';

@Injectable()
export class EventsService {
  constructor (private http: Http) {
  }

  public getEvents(): Observable<Race[]> {
    return this.http.get('http://api.triedgeteam.com/api/v0/event/all')
        .map(EventsService.extractData)
        .catch(EventsService.handleError);
  }

  private static extractData(res: Response) {
    let body = res.json();
    let result: Array<Event> = [];
    for (let key in body) {
      result.push(body[key]);
    }

    return result;
  }

  private static handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
