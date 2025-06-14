// src/types/index.ts
export interface PlaylistRequest {
  prompt: string;
  mood?: string;
  activity?: string;
  genre?: string;
  energy?: number; // 1-10
  duration?: number; // minutes
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  spotifyId?: string;
  reason?: string; // Why AI included this song
}

export interface GeneratedPlaylist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
  mood: string;
  totalDuration: number;
  createdAt: Date;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string; id: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}
