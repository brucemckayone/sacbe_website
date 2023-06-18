// To parse this data:
//
//   import { Convert, BlogPostType } from "./file";
//
//   const blogPostType = Convert.toBlogPostType(json);

export interface BlogPostType {
    main_image:    string;
    publisher:     Publisher;
    categories:    string[];
    excerpt:       string;
    tags:          string[];
    content:       string;
    related_posts: RelatedPost[];
    featured:      boolean;
    title:         string;
    readingTime:   string;
    relate_posts:  any[];
    dateCreated:   DateCreated;
    status:        string;
    lastModified: DateCreated;
    slug:          string;
}

export interface DateCreated {
    _seconds:     number;
    _nanoseconds: number;
}

export interface Publisher {
    name: string;
}

export interface RelatedPost {
    _firestore: Firestore;
    _path:      Path;
    _converter: Converter;
}

export interface Converter {
}

export interface Firestore {
    projectId: string;
}

export interface Path {
    segments: string[];
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBlogPostType(json: string): BlogPostType {
        return JSON.parse(json);
    }

    public static blogPostTypeToJson(value: BlogPostType): string {
        return JSON.stringify(value);
    }
}
