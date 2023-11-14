export interface Tour {
  id?: number;

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
  Archived = 'Archived',
  Published = 'Published',
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Moderate',
  Hard = 'Difficult',
}
