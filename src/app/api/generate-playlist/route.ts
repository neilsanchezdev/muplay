// src/app/api/generate-playlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePlaylist } from '@/lib/gemini';
import { PlaylistRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: PlaylistRequest = await request.json();

    if (!body.prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const songs = await generatePlaylist(body);

    return NextResponse.json({
      success: true,
      playlist: {
        id: `playlist-${Date.now()}`,
        name: `AI Playlist - ${new Date().toLocaleDateString()}`,
        songs,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate playlist' }, { status: 500 });
  }
}
