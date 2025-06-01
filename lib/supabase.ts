import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Crear el cliente de Supabase
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
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

// Funciones para interactuar con los datos
export async function getTracks() {
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Subir un archivo a Supabase Storage
export async function uploadFile(bucket: string, path: string, file: File) {
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
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Tracks
export async function fetchTracks() {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function fetchTrackById(id: string) {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createTrack(trackData: any) {
  const { data, error } = await supabase
    .from('tracks')
    .insert(trackData)
    .select();
  return { data, error };
}

// Artistas
export async function fetchArtists() {
  const { data, error } = await supabase
    .from('artists')
    .select('*');
  return { data, error };
}

// Verificar si Supabase está conectado
export async function checkSupabaseConnection() {
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