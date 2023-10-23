export interface Tour {
  name: string;
  description: string;
  price: number;
  status: Status;
  difficultyLevel: DifficultyLevel;
  guideId: number;
  tags: string[];
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
