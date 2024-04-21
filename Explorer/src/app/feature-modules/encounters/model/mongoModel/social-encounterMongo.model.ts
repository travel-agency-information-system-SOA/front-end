export interface SocialEncounterMongo{
    encounterId: string,
    name: string,
    description: string,
    xpPoints: number,
    status: string,
    type: string,
    latitude: number,
    longitude: number,
    id: string,
    touristsRequiredForCompletion: number,
    distanceTreshold: number,
    touristIDs:  number[] | null,
    shouldBeApproved: boolean
}