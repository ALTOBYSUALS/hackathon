import { createClient } from '@supabase/supabase-js'

// Estos valores deberían estar en variables de entorno en producción
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

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
  const { data, error } = await supabase.rpc('increment_track_plays', {
    track_id: trackId
  })
  
  if (error) {
    console.error('Error incrementing plays:', error)
    return false
  }
  
  return true
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