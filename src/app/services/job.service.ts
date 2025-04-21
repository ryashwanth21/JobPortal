import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';  // Literal types for job_type
  salary_range: string | null;
  job_description: string;
  application_deadline: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs';  // Adjust if needed

  constructor(private http: HttpClient) {}

  // Get all jobs
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // Get a single job by ID
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  // Create a new job
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
  applyForJob(jobId: number, application: { applicant_name: string, email: string }) {
    return this.http.post(`http://localhost:3000/api/jobs/${jobId}/apply`, application);
  }
  
  // Update an existing job
  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job);
  }
  getFavoriteJobs(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`http://localhost:3000/api/users/${userId}/favorites`);
  }
  
  updateFavoriteJobs(userId: number, favoriteJobs: number[]): Observable<any> {
    return this.http.put('http://localhost:3000/api/users/favorites', { userId, favoriteJobs });
  }
  
  
  
  // Delete a job
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
