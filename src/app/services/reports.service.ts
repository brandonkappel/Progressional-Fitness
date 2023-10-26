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


  constructor(private http: HttpClient, private router: Router) { }

  getreports(id: string) {
    // console.error('userId', id)
    return this.http.get(url + id);
  }


}
