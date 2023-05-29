import { DocumentReference } from "firebase/firestore";

export interface AlgoliaBlogSearchType {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  renderingContent: RenderingContent;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  serverTimeMS: number;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  title: string;
  tags: string[];
  readingTime: string;
  publisher: HitPublisher;
  categories: string[];
  excerpt: string;
  main_image: string;
  content: string;
  related_posts: DocumentReference[];
  featured: boolean;
  path: DocumentReference;
  lastmodified: HitLastmodified;
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  title: Content;
  tags: Content[];
  readingTime: Content;
  publisher: HighlightResultPublisher;
  categories: Content[];
  excerpt: Content;
  main_image: Content;
  content: Content;
  related_posts: Content[];
  path: Content;
  lastmodified: HighlightResultLastmodified;
}

export interface Content {
  value: string;
  matchLevel: MatchLevel;
  fullyHighlighted?: boolean;
  matchedWords: MatchedWord[];
}

export type MatchLevel = "full" | "none";

export type MatchedWord = "cacao";

export interface HighlightResultLastmodified {
  _operation: Content;
  value: Content;
}

export interface HighlightResultPublisher {
  name: Content;
  external_id?: Content;
}

export interface HitLastmodified {
  _operation: string;
  value: number;
}

export interface HitPublisher {
  name: string;
  external_id?: string;
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  request: Request;
  total: number;
}

export interface AfterFetch {
  format: Format;
  total: number;
}

export interface Format {
  highlighting: number;
  total: number;
}

export interface Request {
  roundTrip: number;
}

export interface RenderingContent {}
