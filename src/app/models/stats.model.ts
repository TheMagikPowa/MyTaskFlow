
export interface StatsModel {
    title: string,
    value: number,
    icon: string,
    description: string

}

export const stats: StatsModel[] = [
  {
    title: 'Progetti attivi',
    value: 8,
    icon: '📁',
    description: 'Progetti attualmente in corso'
  },
  {
    title: 'Attività totali',
    value: 42,
    icon: '📋',
    description: 'Attività presenti nei progetti'
  },
  {
    title: 'Attività completate',
    value: 28,
    icon: '✅',
    description: 'Attività portate a termine'
  },
  {
    title: 'In scadenza',
    value: 5,
    icon: '⏰',
    description: 'Attività da completare a breve'
  }
];

