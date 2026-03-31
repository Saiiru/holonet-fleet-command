export type TaskStatus = 'pending' | 'completed' | 'waiting' | 'active';

export interface TaskItem {
  id: number;
  uuid?: string;
  description: string;
  project?: string | null;
  status: TaskStatus;
  priority?: string | null;
  due?: string | null;
  tags?: string[];
}
