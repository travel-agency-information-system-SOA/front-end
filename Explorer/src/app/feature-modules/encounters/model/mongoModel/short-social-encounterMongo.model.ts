export interface ShortSocialEncounterMongo {
    id: string,
    encounterId: string,
    touristsRequiredForCompletion: number,
    distanceTreshold: number,
    touristIDs:  number[] | null,
}