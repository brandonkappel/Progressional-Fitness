import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { last, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const url = environment.apiUrl + "/reports/"


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  calendarFilter = 'week'


  constructor(private http: HttpClient, private router: Router) { }

  getreports(id: string, dateStart, dateEnd) {
    const queryParams = `?dateStart=${dateStart}&dateEnd=${dateEnd}`;
    // console.error('userId', id)
    return this.http.get(url + id + queryParams);
  }


}
