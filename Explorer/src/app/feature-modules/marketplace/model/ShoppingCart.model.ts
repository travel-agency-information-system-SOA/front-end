import { TourOrderItem } from "./TourOrderItem.model";

export interface ShoppingCart{
    touristId:number;
    orderItems:TourOrderItem[];
    total:number;
}