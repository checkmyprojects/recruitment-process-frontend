import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Candidate } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private apiServerUrl = environment.apiBaseUrl;



  constructor(private http: HttpClient ) { }

  public getCandidates(): Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiServerUrl}/api/candidate/list`);
  }

  // Get all candidates from backend as a Candidate Object
  public getAllCandidates(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`${this.apiServerUrl}/api/candidate/list`);
  }
}
