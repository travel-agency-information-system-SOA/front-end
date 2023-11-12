import { Time } from "@angular/common";

export interface Problem {
    id?: number;
    category: string;
    priority: string;
    description: string;
    time: Time;
    idTourist: number;
    idGuide: number;
    isSolved: boolean;
    deadline: Date;
}