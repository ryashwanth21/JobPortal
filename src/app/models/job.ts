export interface Job {
    id?: number;  // frontend typically treats id as optional for creating new items
    job_title: string;
    company_name: string;
    location: string;
    job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salary_range?: string | null;  // optional or nullable for frontend flexibility
    job_description: string;
    application_deadline: string;
    created_at?: string;
  }
  