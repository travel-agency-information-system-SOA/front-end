export interface TourPoint {
    id?: number,
    idTour: number,
    name: string,
    description: string,
    imageUrl: string,
    latitude?: number,
    longitude?: number
}