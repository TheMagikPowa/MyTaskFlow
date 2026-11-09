import { Component, signal } from '@angular/core';
import { StatsCard } from './stats-card/stats-card';
import { RecentProjects } from './recent-projects/recent-projects';
import { RecentTasks } from './recent-tasks/recent-tasks';
import { StatsModel } from '../../models/stats.model';
import { stats } from '../../services/stats.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [StatsCard, RecentProjects, RecentTasks, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly dummyStats=signal<StatsModel[]>(stats) ;
}
