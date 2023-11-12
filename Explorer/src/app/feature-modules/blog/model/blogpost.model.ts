import { BlogPostComment } from "./blog-post-comment.model"

export interface BlogPost {
    id: number,
    title: string,
    description: string,
    creationDate: Date,
    imageURLs:  string[] | null,
    comments: BlogPostComment[] | null,
    status: string
}