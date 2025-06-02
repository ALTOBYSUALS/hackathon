# Configuración de Supabase para SONAR

## Problema identificado
La tabla `tracks` no existe en tu base de datos de Supabase, por eso no se pueden subir ni mostrar canciones.

## Solución paso a paso

### 1. Acceder al Dashboard de Supabase
1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Inicia sesión en tu cuenta
3. Selecciona tu proyecto: `qolrmrqhrnkvazrrqsxb`

### 2. Ejecutar el script SQL
1. En el dashboard, ve a la sección **SQL Editor** (icono de código en el menú lateral)
2. Haz clic en **New Query**
3. Copia y pega todo el contenido del archivo `setup-supabase.sql`
4. Haz clic en **Run** para ejecutar el script

### 3. Verificar que se crearon las tablas
1. Ve a **Table Editor** en el menú lateral
2. Deberías ver las siguientes tablas:
   - `tracks` - Para almacenar información de las canciones
   - `profiles` - Para perfiles de usuario
   - `track_likes` - Para manejar los likes

### 4. Verificar Storage Buckets
1. Ve a **Storage** en el menú lateral
2. Deberías ver los buckets:
   - `songs` - Para archivos de audio
   - `covers` - Para imágenes de portada

## Qué hace el script

El script SQL crea:

- **Tabla `tracks`**: Almacena información de las canciones (título, artista, URLs, etc.)
- **Tabla `profiles`**: Perfiles de usuario extendidos
- **Tabla `track_likes`**: Maneja los likes de usuarios a canciones
- **Storage buckets**: Para archivos de audio y portadas
- **Políticas de seguridad**: Para controlar acceso a los datos
- **Función `toggle_track_like`**: Para manejar likes/dislikes

## Después de ejecutar el script

1. Regresa a tu aplicación en `localhost:3003`
2. Intenta subir una canción nuevamente
3. Deberías poder ver las canciones en la página Discover

## Verificación
Ejecuta nuevamente el script de debug:
```bash
node debug-supabase.js
```

Deberías ver:
```
✅ Successfully connected to Supabase
📊 Found 0 tracks in database
📋 No tracks found in database
```

Una vez que subas una canción, el contador debería incrementar. 