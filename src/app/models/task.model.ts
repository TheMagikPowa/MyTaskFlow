export interface TaskModel {
    id: string,
    title: string,
    project: string,
    priority: 'high' | 'medium' | 'low',
    status: 'in-progress' | 'pending' | 'completed',
    dueDate:string
}

export type NewTaskModel= Omit<TaskModel, 'id'>