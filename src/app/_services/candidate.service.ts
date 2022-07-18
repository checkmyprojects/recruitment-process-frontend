import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService
{
  constructor(private http:HttpClient){}

  new(name: String, surname: String, email: String, skills: String, studies: String, location: String, experience: number): Observable<any>
  {
    return this.http.post("http://localhost:8080/api/candidate/new", {name, surname, email, skills, studies, location, experience});
  }
}