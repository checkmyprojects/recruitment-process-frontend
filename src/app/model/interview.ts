import { Candidate } from './candidate';
import { AppUsers } from './app-users';
export interface Interview {

    id: number;
    candidate: Candidate;
    interviewer:AppUsers;
    selection: Selection;
    feedback: string;
    interview_date: Date;
    creation_date: Date;

}
