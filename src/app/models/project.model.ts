export interface ProjectModel {
    id: string,
    name: string,
    description:string,
    status: 'in-progress'| 'completed',
    completion: number | null | undefined;
    totalTasks: number,
    completedTasks: number
}

export type NewProjectModel= Omit<ProjectModel, 'id'>;