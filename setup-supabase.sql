-- Script para configurar las tablas necesarias en Supabase
-- Ejecutar este script en el SQL Editor de Supabase

-- Crear tabla de tracks (canciones)
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT,
    record_label TEXT,
    language TEXT,
    cover_url TEXT,
    audio_url TEXT NOT NULL,
    user_id TEXT NOT NULL,
    plays INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de usuarios (opcional, ya que usamos Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de likes (para manejar likes de usuarios a tracks)
CREATE TABLE IF NOT EXISTS public.track_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(track_id, user_id)
);

-- Crear buckets de storage para archivos
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('songs', 'songs', true),
    ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de seguridad para tracks (permitir lectura pública)
CREATE POLICY "Allow public read access" ON public.tracks
    FOR SELECT USING (true);

-- Permitir insert para usuarios autenticados
CREATE POLICY "Allow authenticated insert" ON public.tracks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir update solo al dueño del track
CREATE POLICY "Allow owner update" ON public.tracks
    FOR UPDATE USING (auth.uid()::text = user_id);

-- Permitir delete solo al dueño del track
CREATE POLICY "Allow owner delete" ON public.tracks
    FOR DELETE USING (auth.uid()::text = user_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Políticas para track_likes
CREATE POLICY "Allow public read access" ON public.track_likes
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON public.track_likes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow owner delete" ON public.track_likes
    FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.track_likes ENABLE ROW LEVEL SECURITY;

-- Políticas para storage
CREATE POLICY "Allow public read access" ON storage.objects
    FOR SELECT USING (bucket_id IN ('songs', 'covers'));

CREATE POLICY "Allow authenticated upload" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id IN ('songs', 'covers') AND 
        auth.role() = 'authenticated'
    );

CREATE POLICY "Allow owner delete" ON storage.objects
    FOR DELETE USING (
        bucket_id IN ('songs', 'covers') AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Función para toggle likes
CREATE OR REPLACE FUNCTION public.toggle_track_like(track_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    existing_like UUID;
BEGIN
    -- Verificar si ya existe el like
    SELECT id INTO existing_like 
    FROM public.track_likes 
    WHERE track_likes.track_id = toggle_track_like.track_id 
    AND track_likes.user_id = toggle_track_like.user_id;
    
    IF existing_like IS NULL THEN
        -- Crear like
        INSERT INTO public.track_likes (track_id, user_id) 
        VALUES (toggle_track_like.track_id, toggle_track_like.user_id);
        
        -- Incrementar contador de likes
        UPDATE public.tracks 
        SET likes = likes + 1 
        WHERE id = toggle_track_like.track_id;
        
        RETURN TRUE;
    ELSE
        -- Remover like
        DELETE FROM public.track_likes WHERE id = existing_like;
        
        -- Decrementar contador de likes
        UPDATE public.tracks 
        SET likes = GREATEST(likes - 1, 0) 
        WHERE id = toggle_track_like.track_id;
        
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 