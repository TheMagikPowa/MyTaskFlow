export interface ProjectModel {
    id: number,
    name: string,
    description:string,
    status: 'in-progress'| 'completed',
    completion: number | null | undefined;
    totalTasks: number,
    completedTasks: number
}