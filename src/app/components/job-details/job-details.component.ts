import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: any;
  isFavorite = false;
  userId: number = 0;
  favoriteIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      this.snackBar.open('Please log in to use favorites.', 'Close', { duration: 2000 });
      this.router.navigate(['/login']);
      return;
    }

    this.userId = user.id;
    const jobId = +this.route.snapshot.paramMap.get('id')!;

    this.jobService.getJobById(jobId).subscribe((job) => {
      this.job = job;
      this.checkIfFavorite(job.id);
    });
  }

  checkIfFavorite(jobId: number): void {
    this.jobService.getFavoriteJobs(this.userId).subscribe((jobs) => {
      this.favoriteIds = jobs.map(job => job.id);
      this.isFavorite = this.favoriteIds.includes(jobId);
      console.log('⭐ Is favorite?', this.isFavorite);
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteIds = this.favoriteIds.filter(id => id !== this.job.id);
      this.isFavorite = false;
      this.snackBar.open('Removed from favorites.', 'Close', { duration: 2000 });
    } else {
      this.favoriteIds.push(this.job.id);
      this.isFavorite = true;
      this.snackBar.open('Added to favorites!', 'Close', { duration: 2000 });
    }

    console.log('📦 Updated favorite IDs:', this.favoriteIds);

    this.jobService.updateFavoriteJobs(this.userId, this.favoriteIds).subscribe({
      next: () => console.log('✅ DB updated'),
      error: (err) => console.error('❌ Failed to update favorites:', err)
    });
  }

  navigateToApply(): void {
    this.router.navigate([`/jobs/${this.job.id}/apply`]);
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

  shareJob(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      this.snackBar.open('🔗 Job link copied!', 'Close', { duration: 2000 });
    });
  }
}
