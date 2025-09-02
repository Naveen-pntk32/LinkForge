export interface ClickStat {
  timestamp: string; // ISO string
  geo: {
    city: string;
    country: string;
  };
}

export interface ShortLink {
  id: string; // This is the shortcode
  originalUrl: string;
  shortUrl: string;
  createdAt: string; // ISO string
  expiresAt: string | null; // ISO string or null
  clicks: ClickStat[];
}
