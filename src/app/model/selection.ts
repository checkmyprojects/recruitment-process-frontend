import { AppUsers } from './app-users';
export interface Selection {

    id: number;
    created_by: AppUsers;
    start_date: string;
    end_date: string;
    name: string;
    description: string;
    requirements: string;
    location: string;
    sector: string;
    status: string;
    priority: string;
    project_id: number;
    remote: boolean;
    interviews: any[];
}
