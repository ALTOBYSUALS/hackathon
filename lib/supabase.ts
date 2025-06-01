import { createClient } from '@supabase/supabase-js'

// Valores por defecto para desarrollo/demo
const DEFAULT_SUPABASE_URL = 'https://placeholder.supabase.co'
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI3MjAsImV4cCI6MTk2MDc2ODcyMH0.placeholder-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL not found, using default demo URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY not found, using default demo key')
}

// Crear el cliente de Supabase con valores por defecto
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY
)

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

// Verificar si estamos en modo demo
const isDemoMode = () => {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || 
         process.env.NEXT_PUBLIC_SUPABASE_URL === DEFAULT_SUPABASE_URL
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