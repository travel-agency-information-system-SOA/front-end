export interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  status: Status;
  difficultyLevel: DifficultyLevel;
}

export enum Status {
  Draft = 'Draft',
  InProgress = 'InProgress',
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
