// src/components/PlaylistGenerator.tsx
'use client';

import { useState } from 'react';
import { X, Loader2, Music } from 'lucide-react';
import { Button } from './ui/Button';
import { GeneratedPlaylist } from '@/types';

interface PlaylistGeneratorProps {
  initialPrompt?: string;
  onClose: () => void;
}

export function PlaylistGenerator({ initialPrompt = '', onClose }: PlaylistGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playlist, setPlaylist] = useState<GeneratedPlaylist | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error generating playlist');
      }

      setPlaylist(data.playlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center p-6 border-b border-white/10'>
          <h2 className='text-2xl font-bold gradient-text'>Generar Playlist</h2>
          <button onClick={onClose} className='p-2 hover:bg-white/10 rounded-lg transition-colors'>
            <X className='w-6 h-6' />
          </button>
        </div>

        <div className='p-6'>
          {!playlist ? (
            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-medium mb-2'>Describe tu playlist perfecta</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder='Ej: Música indie melancólica para una tarde lluviosa, canciones energéticas para entrenar, pop latino para cocinar con amigos...'
                  className='w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none'
                />
              </div>

              {error && (
                <div className='p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400'>{error}</div>
              )}

              <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className='w-full btn-primary'>
                {isGenerating ? (
                  <>
                    <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                    Generando playlist...
                  </>
                ) : (
                  'Generar Playlist'
                )}
              </Button>
            </div>
          ) : (
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='text-xl font-semibold mb-2'>{playlist.name}</h3>
                <p className='text-gray-400'>{playlist.songs.length} canciones</p>
              </div>

              <div className='space-y-3 max-h-96 overflow-y-auto'>
                {playlist.songs.map((song, index) => (
                  <div key={song.id} className='flex items-center gap-4 p-3 bg-white/5 rounded-lg'>
                    <span className='text-gray-500 font-mono text-sm w-6'>{index + 1}</span>
                    <Music className='w-5 h-5 text-purple-400 flex-shrink-0' />
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium truncate'>{song.title}</p>
                      <p className='text-sm text-gray-400 truncate'>{song.artist}</p>
                      {song.reason && <p className='text-xs text-gray-500 mt-1'>{song.reason}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex gap-3'>
                <Button onClick={() => setPlaylist(null)} variant='secondary' className='flex-1'>
                  Generar otra
                </Button>
                <Button className='flex-1 btn-primary'>Guardar en Spotify</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
