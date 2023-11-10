export interface TourCharacteristic {
  distance: number;
  duration: number;
  transportType: TransportType;
}

export enum TransportType {
  Driving = 'Driving',
  Walking = 'Walking',
  Cycling = 'Cycling',
}
