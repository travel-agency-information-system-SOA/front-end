export interface BlogPostComment {
    id?: number,
    blogId: number,
    userId: number,
    text: string,
    creationTime: Date, 
    lastUpdatedTime: Date
}