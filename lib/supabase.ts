import { createClient } from '@supabase/supabase-js'

// Valores por defecto para desarrollo/demo - URLs válidas pero ficticias
const DEFAULT_SUPABASE_URL = 'https://demo-project-id.supabase.co'
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8tcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQ1MTA5NjAwLCJleHAiOjE5NjA2ODU2MDB9.demo-anon-key'

// Función para validar si una URL es válida
const isValidSupabaseUrl = (url: string | undefined): url is string => {
  if (!url) return false
  try {
    const newUrl = new URL(url)
    return newUrl.protocol === 'https:' && newUrl.host.endsWith('.supabase.co')
  } catch (e) {
    return false
  }
}

const supabaseUrl = isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : DEFAULT_SUPABASE_URL

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY

// Verificar si estamos en modo demo
export const isDemoMode = () => {
  return supabaseUrl === DEFAULT_SUPABASE_URL || supabaseAnonKey === DEFAULT_SUPABASE_KEY
}

// Solo mostrar warnings en el browser, no durante build
if (typeof window !== 'undefined') {
  if (!isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)){
    console.warn('Invalid or missing NEXT_PUBLIC_SUPABASE_URL, using default demo URL')
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY){
    console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY, using default demo key')
  }
  if (isDemoMode() && (isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)){
    // This case implies that the provided URL/Key are the same as the default ones, which is fine for demo/local dev.
    console.log('Using default demo Supabase credentials.') 
  }
}

// Crear el cliente de Supabase con valores por defecto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para nuestros datos
export type Track = {
  id: string
  title: string
  artist: string
  cover_url: string
  audio_url: string
  plays: number
  likes: number
  user_id: string
  created_at: string
}

export type User = {
  id: string
  username: string
  avatar_url: string
  followers: number
  following: number
}

// Funciones para interactuar con los datos
export async function getTracks() {
  if (isDemoMode()) {
    console.log('Demo mode: returning empty array for tracks')
    return []
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('plays', { ascending: false })
    .limit(10)
  
  if (error) {
    console.error('Error fetching tracks:', error)
    return []
  }
  
  return data as Track[]
}

export async function getTrackById(id: string) {
  if (isDemoMode()) {
    console.log('Demo mode: returning null for track')
    return null
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching track:', error)
    return null
  }
  
  return data as Track
}

export async function uploadTrack(file: File, metadata: Omit<Track, 'id' | 'audio_url' | 'created_at'>) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating track upload')
    // Only create object URL if running in browser
    const audioUrl = typeof window !== 'undefined' ? URL.createObjectURL(file) : `demo-${Date.now()}.mp3`
    return {
      id: 'demo-' + Date.now(),
      audio_url: audioUrl,
      created_at: new Date().toISOString(),
      ...metadata
    } as Track
  }
  
  // Generar un nombre único para el archivo
  const fileName = `${Date.now()}-${file.name}`
  
  // Subir el archivo de audio
  const { data: fileData, error: fileError } = await supabase
    .storage
    .from('tracks')
    .upload(fileName, file)
  
  if (fileError) {
    console.error('Error uploading file:', fileError)
    return null
  }
  
  // Obtener la URL pública del archivo
  const { data: urlData } = supabase
    .storage
    .from('tracks')
    .getPublicUrl(fileName)
  
  const audioUrl = urlData.publicUrl
  
  // Guardar los metadatos en la base de datos
  const { data, error } = await supabase
    .from('tracks')
    .insert({
      ...metadata,
      audio_url: audioUrl,
      created_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error saving track metadata:', error)
    return null
  }
  
  return data as Track
}

export async function incrementPlays(trackId: string) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating play increment')
    return true
  }
  
  // First get the current play count
  const { data: track, error: fetchError } = await supabase
    .from('tracks')
    .select('plays')
    .eq('id', trackId)
    .single();
  
  if (fetchError) {
    console.error('Error fetching track play count:', fetchError);
    return false;
  }
  
  // Then increment the plays count
  const { data, error } = await supabase
    .from('tracks')
    .update({ plays: (track?.plays || 0) + 1 })
    .eq('id', trackId);
  
  if (error) {
    console.error('Error incrementing plays:', error);
    return false;
  }
  
  return true;
}

export async function toggleLike(trackId: string, userId: string) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating like toggle')
    return true
  }
  
  const { data, error } = await supabase.rpc('toggle_track_like', {
    track_id: trackId,
    user_id: userId
  })
  
  if (error) {
    console.error('Error toggling like:', error)
    return false
  }
  
  return data
}

// Autenticación
export async function signIn(email: string, password: string) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating sign in')
    return { 
      data: { 
        user: { id: 'demo-user', email }, 
        session: { access_token: 'demo-token' } 
      }, 
      error: null 
    }
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUp(email: string, password: string) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating sign up')
    return { 
      data: { 
        user: { id: 'demo-user', email }, 
        session: { access_token: 'demo-token' } 
      }, 
      error: null 
    }
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  if (isDemoMode()) {
    console.log('Demo mode: simulating sign out')
    return { error: null }
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Subir un archivo a Supabase Storage
export async function uploadFile(bucket: string, path: string, file: File) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating file upload')
    return { 
      data: { path: `demo-${Date.now()}-${file.name}` }, 
      error: null 
    }
  }
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });
  return { data, error };
}

// Obtener una URL pública de un archivo en Storage
export function getPublicURL(bucket: string, path: string) {
  if (isDemoMode()) {
    console.log('Demo mode: returning demo URL')
    return `https://demo-storage.example.com/${bucket}/${path}`
  }
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Tracks
export async function fetchTracks() {
  if (isDemoMode()) {
    console.log('Demo mode: returning empty tracks array')
    return { data: [], error: null }
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function fetchTrackById(id: string) {
  if (isDemoMode()) {
    console.log('Demo mode: returning null track')
    return { data: null, error: null }
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createTrack(trackData: any) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating track creation')
    return { 
      data: [{ id: 'demo-' + Date.now(), ...trackData }], 
      error: null 
    }
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .insert(trackData)
    .select();
  return { data, error };
}

// Artistas
export async function fetchArtists() {
  if (isDemoMode()) {
    console.log('Demo mode: returning empty artists array')
    return { data: [], error: null }
  }
  
  const { data, error } = await supabase
    .from('artists')
    .select('*');
  return { data, error };
}

// Verificar si Supabase está conectado
export async function checkSupabaseConnection() {
  if (isDemoMode()) {
    console.log('Demo mode: simulating connection check')
    return { connected: true, data: { count: 0 } }
  }
  
  try {
    const { data, error } = await supabase.from('tracks').select('count', { count: 'exact' });
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return { connected: false, error };
    }
    
    return { connected: true, data };
  } catch (err) {
    console.error('Error checking Supabase connection:', err);
    return { connected: false, error: err };
  }
}

// Función para subir una canción completa (audio + artwork + metadata)
export async function uploadSong(
  audioFile: File,
  artworkFile: File | null,
  metadata: {
    title: string
    artistName: string
    genre?: string
    recordLabel?: string
    language?: string
  },
  userId: string
) {
  if (isDemoMode()) {
    console.log('Demo mode: simulating song upload')
    return {
      id: 'demo-song-' + Date.now(),
      title: metadata.title,
      artist: metadata.artistName,
      cover_url: artworkFile ? URL.createObjectURL(artworkFile) : '/default-cover.png',
      audio_url: URL.createObjectURL(audioFile),
      plays: 0,
      likes: 0,
      user_id: userId,
      created_at: new Date().toISOString()
    }
  }

  try {
    // 1. Subir el archivo de audio
    const audioFileName = `${userId}/${Date.now()}-${audioFile.name}`
    const { data: audioData, error: audioError } = await supabase.storage
      .from('songs')
      .upload(audioFileName, audioFile)
    
    if (audioError) throw audioError
    
    // Obtener URL pública del audio
    const { data: audioUrlData } = supabase.storage
      .from('songs')
      .getPublicUrl(audioFileName)
    
    // 2. Subir el artwork si existe
    let coverUrl = '/default-cover.png'
    if (artworkFile) {
      const artworkFileName = `${userId}/${Date.now()}-${artworkFile.name}`
      const { data: artworkData, error: artworkError } = await supabase.storage
        .from('covers')
        .upload(artworkFileName, artworkFile)
      
      if (!artworkError) {
        const { data: artworkUrlData } = supabase.storage
          .from('covers')
          .getPublicUrl(artworkFileName)
        coverUrl = artworkUrlData.publicUrl
      }
    }
    
    // 3. Guardar metadata en la base de datos
    const { data, error } = await supabase
      .from('tracks')
      .insert({
        title: metadata.title,
        artist: metadata.artistName,
        genre: metadata.genre || 'Other',
        record_label: metadata.recordLabel || 'Independent',
        language: metadata.language || 'English',
        cover_url: coverUrl,
        audio_url: audioUrlData.publicUrl,
        user_id: userId,
        plays: 0,
        likes: 0,
        created_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error uploading song:', error)
    throw error
  }
}

// Función para obtener las canciones más recientes para Discover
export async function getRecentTracks(limit: number = 10) {
  if (isDemoMode()) {
    console.log('Demo mode: returning demo tracks')
    return [
      {
        id: '1',
        title: 'Midnight Dreams',
        artist: 'Demo Artist',
        cover_url: '/electronic-album-cover.png',
        audio_url: '/demo-track.mp3',
        plays: 1234,
        likes: 89,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Urban Vibes',
        artist: 'Test User',
        cover_url: '/hip-hop-album-cover.png',
        audio_url: '/demo-track-2.mp3',
        plays: 567,
        likes: 45,
        created_at: new Date().toISOString()
      }
    ]
  }
  
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching recent tracks:', error)
    return []
  }
  
  return data || []
} 