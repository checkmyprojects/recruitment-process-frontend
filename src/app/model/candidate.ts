export interface Candidate {
    id: number;
    name: string;
    surname: string;
    email: string;
    skills: string;
    studies: string;
    location: string;
    experience: number;
    hired: boolean;
    state: string;
    interviews: any[];
}
