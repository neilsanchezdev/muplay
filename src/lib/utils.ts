// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generatePlaylistName(mood: string, activity?: string): string {
  const adjectives = ['Perfect', 'Ultimate', 'Epic', 'Chill', 'Energetic', 'Smooth'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  if (activity) {
    return `${randomAdjective} ${activity} Mix`;
  }
  return `${randomAdjective} ${mood} Playlist`;
}
