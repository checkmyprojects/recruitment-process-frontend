import { Interview } from '../model/interview';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const InterviewAPI = "http://localhost:8080/api/interview/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json', responseType: 'text' }),
// };

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http:HttpClient) { }

  getInterviews(): Observable<Object[]>
  {
    return this.http.get(InterviewAPI + "list", {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}) as Observable<Object[]>;
  }

  public getAllInterviews(): Observable<Interview[]>{
    return this.http.get<Interview[]>(`${this.apiServerUrl}/api/interview/list`);
  }

  public registerNewInterview(date: string, candidateid:number, interviewerid:number, selectionid:number): Observable<any>{
    // Response from backend is not a json, so we specify that with {responseType: 'text'}
    return this.http.post(`${this.apiServerUrl}/api/interview/new?candidateid=${candidateid}&interviewerid=${interviewerid}&selectionid=${selectionid}`,date, {responseType: 'text'});
  }

  public feedbackInterview(feedback: string, interviewId: number): Observable<any>{
    // Response from backend is not a json, so we specify that with {responseType: 'text'}
    return this.http.put(`${this.apiServerUrl}/api/interview/feedback/${interviewId}`,feedback);
  }

  public editInterview(date: string, interviewId:number, candidateid:number, interviewerid:number, selectionid:number): Observable<any>{
    // Response from backend is not a json, so we specify that with {responseType: 'text'}
    return this.http.put(`${this.apiServerUrl}/api/interview/edit/${interviewId}/?candidateid=${candidateid}&interviewerid=${interviewerid}&selectionid=${selectionid}`,date);
  }
}
