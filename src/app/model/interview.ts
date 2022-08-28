import { Candidate } from './candidate';
import { AppUsers } from './app-users';
import { Selection } from './selection';
export interface Interview {

    id: number;
    candidate: Candidate;
    interviewer:AppUsers;
    selection: Selection;
    feedback: string;
    interview_date: Date;
    status?: string;
    creation_date: Date;

}
