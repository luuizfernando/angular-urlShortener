export interface ShortenResult {
  short_url: string;
  original_url: string;
}

export interface LinkItem {
  short_url: string;
  original_url: string;
  clicks: number;
}

export interface DeleteResponse {
  message: string;
}