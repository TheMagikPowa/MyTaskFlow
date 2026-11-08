export interface TaskModel {
    id: number,
    title: string,
    project: string,
    priority: 'high' | 'medium' | 'low',
    status: 'in-progress' | 'pending' | 'completed',
    dueDate:string
}