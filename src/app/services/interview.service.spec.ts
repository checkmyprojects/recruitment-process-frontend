import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InterviewService } from './interview.service';

describe('InterviewService', () => {
  let service: InterviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(InterviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllInterviews should be a GET request and return proper data', () => {

    const interview: any[] = [
      {
          "id": 1,
          "candidate": null,
          "interviewer": null,
          "selection": null,
          "feedback": "Notes",
          "interview_date": new Date(),
          "creation_date": new Date()
      }
    ]

    service.getAllInterviews().subscribe((res) => {
      expect(res).toEqual(interview);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/interview/list');
    expect(req.request.method).toEqual("GET");
    req.flush(interview);

    httpMock.verify();
  });

  it('registerNewInterview() should be a post request', () => {

    let newInterview: any = {
      "id": 1,
          "candidate": null,
          "interviewer": null,
          "selection": null,
          "feedback": "Notes",
          "interview_date": new Date(),
          "creation_date": new Date()
    }

    service.registerNewInterview(newInterview).subscribe((res) => {
      expect(res).toEqual(newInterview);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/interview/new');
    expect(req.request.method).toEqual('POST');
    req.flush(newInterview);

  });

  it('feedbackInterview should be a PUT request, call interviewID url, send proper feedback, and return data', () => {

    const interview: any = {
          "id": 1,
          "candidate": null,
          "interviewer": null,
          "selection": null,
          "feedback": "Notes",
          "interview_date": new Date(),
          "creation_date": new Date()
      }

    service.feedbackInterview(interview.feedback, interview.id).subscribe((res) => {
      expect(res).toEqual(interview);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/interview/feedback/${interview.id}`, interview.feedback);
    expect(req.request.method).toEqual("PUT");
    req.flush(interview);

    httpMock.verify();
  });

  it('editInterview() should be a PUT request, call interviewID url, send proper feedback, and return data', () => {

    const interview: any = {
      "id": 1,
      "candidate": null,
      "interviewer": null,
      "selection": null,
      "feedback": "Notes",
      "interview_date": "2022-12-12",
      "creation_date": "2022-12-12"
  }
    let interviewRequest: any = {
      candidateId: 1,
      interviewerId: 2,
      selectionId: 3,
      date: "2022-10-13",
      status: "",
      feedback: ""
    }

    service.editInterview(interview.id, interviewRequest).subscribe((res) => {
      expect(res).toEqual(interview);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/interview/edit/${interview.id}`,interviewRequest);
    expect(req.request.method).toEqual("PUT");
    req.flush(interview);

    httpMock.verify();
  });

  it('deleteInterviewById should be a DELETE request and call proper ID url', () => {

    const interview: any = {
          "id": 1,
          "candidate": null,
          "interviewer": null,
          "selection": null,
          "feedback": "Notes",
          "interview_date": "2022-12-12",
          "creation_date": "2022-12-12"
      }

    service.deleteInterviewById(interview.id).subscribe((res) => {
      expect(res).toEqual(interview);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/interview/delete/${interview.id}`);
    expect(req.request.method).toEqual("DELETE");
    req.flush(interview);

    httpMock.verify();
  });
});
