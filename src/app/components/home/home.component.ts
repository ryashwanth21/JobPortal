import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe((data: Job[]) => {
      this.jobs = data;
    });
  }
  navigateToJobs() {
    this.router.navigate(['/jobs']);
  }
  
  navigateToCreateJob() {
    this.router.navigate(['/jobs/new']);
  }

  navigateToEditJob(id: number) {
    this.router.navigate([`/jobs/edit/${id}`]);
  }

  navigateToJobDetails(id: number) {
    this.router.navigate([`/jobs/${id}`]);
  }

  navigateToJobApplicationForm(id: number) {
    this.router.navigate([`/jobs/${id}/apply`]);
  }
}
