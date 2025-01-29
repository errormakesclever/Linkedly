export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'inbox' | 'next' | 'waiting' | 'calendar' | 'projects' | 'today' | 'completed' | 'people';
  completed: boolean;
  createdAt: Date;
  projectId?: string;
  eventDateTime?: Date;
  waitingForPerson?: string;
  meetingParticipants?: string[];
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export type Category = 'today' | 'inbox' | 'next' | 'waiting' | 'calendar' | 'projects' | 'completed' | 'people';

export interface Person {
  id: string;
  name: string;
  email?: string;
  notes?: string;
  linkedinUrl?: string;
}