import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCard {
  title= input.required<string>();
  icon= input.required<string>();
  value= input.required<number>();
  description= input.required<string>();
}
