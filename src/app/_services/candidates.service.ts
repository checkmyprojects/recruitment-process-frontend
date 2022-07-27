import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private apiServerUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient ) { }

  public getCandidates(): Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiServerUrl}/api/candidate/list`);
  }
}
