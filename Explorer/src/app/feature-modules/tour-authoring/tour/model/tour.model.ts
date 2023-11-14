import { TourPoint } from '../../model/tourPoints.model';
import { TourCharacteristic } from './tourCharacteristic.model';

export interface Tour {
  id?: number;

  name: string;
  description: string;
  price: number;
  status: Status;
  difficultyLevel: DifficultyLevel;
  guideId: number;
  tags: string[];
  tourPoints: TourPoint[];
  tourCharacteristics: TourCharacteristic[];
}

export enum Status {
  Draft = 'Draft',
  InProgress = 'InProgress',
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Medium = 'Moderate',
  Hard = 'Difficult',
}
