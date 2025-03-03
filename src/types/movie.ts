export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    overview: string;
  }
  
  export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface MovieDetail extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    status: string;
    tagline: string;
    backdrop_path: string | null;
    videos: {
      results: Array<{
        id: string;
        key: string;
        name: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
      }>;
    };
  }