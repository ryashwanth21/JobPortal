import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteJobs: Job[] = [];
  userId: number = 0;

  constructor(
    private jobService: JobService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      this.userId = user.id;
      this.loadFavoriteJobs();
    }
  }

  loadFavoriteJobs(): void {
    this.jobService.getFavoriteJobs(this.userId).subscribe({
      next: (jobs: Job[]) => {
        this.favoriteJobs = jobs;
      },
      error: (err) => {
        console.error('❌ Error loading favorites:', err);
      }
    });
  }

  removeFromFavorites(jobId: number): void {
    // Remove the job from current list
    this.favoriteJobs = this.favoriteJobs.filter(job => job.id !== jobId);

    // Prepare updated list of IDs to send to DB
    const updatedFavoriteIds = this.favoriteJobs
      .map(job => job.id)
      .filter((id): id is number => id !== undefined);

    console.log('🔁 Updated favorite IDs:', updatedFavoriteIds);

    // Send updated list to backend
    this.jobService.updateFavoriteJobs(this.userId, updatedFavoriteIds).subscribe({
      next: () => {
        this.snackBar.open('Removed from favorites ✅', 'Close', { duration: 2000 });
        this.loadFavoriteJobs();
      },
      error: (err) => {
        console.error('❌ Failed to update favorites:', err);
        this.snackBar.open('Failed to update favorites', 'Close', { duration: 2000 });
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/jobs', id]);
  }
}
