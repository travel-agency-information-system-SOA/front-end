export interface TourReview{
    id: number;
    grade: number;
    comment: string;
    attendanceDate: Date;
    reviewDate : Date;
    images : string[];
    touristId:number;
    tourId: number;

}