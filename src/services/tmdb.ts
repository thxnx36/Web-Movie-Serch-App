import axios from 'axios';
import { MovieResponse, MovieDetail } from '@/types/movie';

const tmdbApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// เพิ่ม type สำหรับ category
export type MovieCategory = 'popular' | 'now_playing' | 'upcoming' | 'top_rated';
export type TVCategory = 'popular' | 'airing_today' | 'on_the_air' | 'top_rated';

interface MediaParams {
  page: number;
  language: string;
  query?: string;
}

export const getMovies = async (
  page = 1,
  category: MovieCategory = 'popular',
  language: string = 'en-US'
): Promise<MovieResponse> => {
  const params: MediaParams = {
    page,
    language,
  };

  const response = await tmdbApi.get(`/movie/${category}`, { params });
  return response.data;
};

export const getTVShows = async (
  page = 1,
  category: TVCategory = 'popular',
  language: string = 'en-US'
): Promise<MovieResponse> => {
  const params: MediaParams = {
    page,
    language,
  };

  const response = await tmdbApi.get(`/tv/${category}`, { params });
  return response.data;
};

export const searchMedia = async (
  query: string,
  page = 1,
  language: string = 'en-US',
  mediaType: 'movie' | 'tv' = 'movie'
): Promise<MovieResponse> => {
  const params: MediaParams = {
    query,
    page,
    language,
  };

  const response = await tmdbApi.get(`/search/${mediaType}`, { params });
  return response.data;
};

export const getMovieDetails = async (
  movieId: number, 
  language: string = 'en-US'
): Promise<MovieDetail> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    
    // Fetch videos with language parameter
    const videosUrl = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}/videos?language=${language}`;
    const videosResponse = await fetch(videosUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (videosResponse.ok) {
      const videosData = await videosResponse.json();
      data.videos = videosData;
    }

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export async function searchMovies(
  query: string, 
  page: number = 1, 
  language: string = 'en-US'
): Promise<MovieResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}&query=${encodeURIComponent(query)}&page=${page}&language=${language}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data: MovieResponse = await response.json();
  return data;
}
