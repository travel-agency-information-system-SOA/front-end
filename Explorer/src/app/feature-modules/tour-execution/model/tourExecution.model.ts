// tour-execution.model.ts

export interface TourExecution {
    id: number;
    userId: number;
    tourId: number;
    status: string;
    tourPoints: TourPoint[];
    position: Position;
    tour: Tour;
  }
  
  export interface Position {
    id: number;
    lastActivity: string;
    latitude: number;
    longitude: number;
    tourExecutionDto: null; // You may want to define a corresponding interface if needed
    tourExecutionId: number;
  }
  
  export interface Tour {
    id: number;
    description: string;
    difficultyLevel: string;
    guideId: number;
    name: string;
    price: number;
    status: string;
    tags: string[];
    tourCharacteristics: TourCharacteristic[];
    tourPoints: TourPoint[];
  }
  
  export interface TourCharacteristic {
    distance: number;
    duration: number;
    transportType: string;
  }
  
  export interface TourPoint {
    id: number;
    tourId: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }
  
  export interface TourExecutionDetail {
    id: number;
    tourId: number;
    tourPoints: TourExecutionTourPoint[];
    userId: number;
  }
  
  export interface TourExecutionTourPoint {
    id: number;
    tourPointId: number;
    tourExecutionId: number;
    completionTime: string;
    completed: boolean;
  }
  