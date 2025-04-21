import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interface for Job
export interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';  // Literal union type for job_type
  salary_range: string | null;  // Can be null or a string
  job_description: string;
  application_deadline: string;
  created_at: string;
}

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  // Initialize job with empty values, job_type not set to any default value
  job: Job = {
    id: 0,
    job_title: '',
    company_name: '',
    location: '',
    job_type: 'Full-time', // You can remove this to make it empty or let the user select it
    salary_range: '', // Default as empty string
    job_description: '',
    application_deadline: '',
    created_at: '' // Initialize created_at
  };

  isEditMode = false;
  jobId: number | null = null;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.jobId = +idParam; // Safely cast to number
      if (this.jobId) {
        this.isEditMode = true;
        this.jobService.getJobById(this.jobId).subscribe((job: Job) => {
          if (job.application_deadline.includes('T')) {
            job.application_deadline = job.application_deadline.split('T')[0];
          }
  
          this.job = job;  // Populate job details for editing
        });
      }
    }
  }

  saveJob(): void {
    const deadline = this.job.application_deadline as any;
    if (deadline instanceof Date) {
      this.job.application_deadline = deadline.toISOString().split('T')[0];
    } else if (typeof deadline === 'string' && deadline.includes('T')) {
      this.job.application_deadline = deadline.split('T')[0];
    }
  
    if (!this.job.salary_range) {
      this.job.salary_range = null;
    }
  
    if (this.isEditMode && this.jobId) {
      this.jobService.updateJob(this.jobId, this.job).subscribe(() => {
        this.snackBar.open('✅ Job updated successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/jobs']);
      });
    } else {
      this.jobService.createJob(this.job).subscribe(() => {
        this.snackBar.open('✅ Job created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/jobs']);
      });
    }
  }
  
  
}
