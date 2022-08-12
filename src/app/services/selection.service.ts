import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Selection} from 'src/app/model/selection';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSelections(): Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiServerUrl}/api/selection/list`);
}

  public getAllSelections(): Observable<Selection[]>{
  return this.http.get<Selection[]>(`${this.apiServerUrl}/api/selection/list`);
}

  registerNewSelection(newSelection: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/selection/new`, newSelection);
  }
}
