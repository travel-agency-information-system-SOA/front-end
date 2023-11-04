export interface BlogPost {
    id: number,
    title: string,
    description: string,
    creationDate: Date,
    imageIDs:  number[] | null,
    status: string
}