// src/lib/gemini.ts
import { GoogleGenAI } from '@google/genai';
import { PlaylistRequest, Song } from '@/types';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generatePlaylist(request: PlaylistRequest): Promise<Song[]> {
  const prompt = `
    Eres un experto curador musical. Genera una playlist de 15-20 canciones basada en:
    
    Descripción: ${request.prompt}
    ${request.mood ? `Mood: ${request.mood}` : ''}
    ${request.activity ? `Actividad: ${request.activity}` : ''}
    ${request.genre ? `Género preferido: ${request.genre}` : ''}
    ${request.energy ? `Nivel de energía (1-10): ${request.energy}` : ''}
    
    Instrucciones:
    - Crea una progresión coherente de energía y mood
    - Incluye artistas diversos pero que funcionen juntos
    - Considera transiciones suaves entre canciones
    - Para cada canción incluye una breve razón de por qué la elegiste
    
    Responde SOLO en formato JSON válido:
    [
      {
        "title": "Nombre de la canción",
        "artist": "Nombre del artista",
        "album": "Nombre del álbum",
        "reason": "Breve explicación de por qué encaja"
      }
    ]
  `;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.9,
        topK: 40,
      },
    });

    const text = result.text;

    // Parse JSON response
    const jsonMatch = text?.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const songs = JSON.parse(jsonMatch[0]);

    return songs.map((song: any, index: number) => ({
      id: `generated-${index}`,
      title: song.title,
      artist: song.artist,
      album: song.album,
      reason: song.reason,
    }));
  } catch (error) {
    console.error('Error generating playlist:', error);
    throw new Error('Failed to generate playlist');
  }
}
