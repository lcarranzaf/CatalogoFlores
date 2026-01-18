# 🌸 Catálogo de Flores

Catálogo digital de productos florales con panel de administración e integración con WhatsApp.

## 🚀 Tecnologías

- **Frontend**: React + Vite + Tailwind CSS v4.1
- **Backend**: Supabase (PostgreSQL + Storage)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo-url>
cd CatalogoFlores
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
VITE_WHATSAPP_NUMBER=5211234567890
```

4. **Configura Supabase:**
   - Sigue las instrucciones en `SUPABASE_SETUP.md`
   - IMPORTANTE: Configura autenticación siguiendo `SUPABASE_AUTH_COMPLETE.md`

5. Crea el usuario admin en Supabase:
   - Ve a Authentication → Users en Supabase
   - Crea un usuario con email: `admin@flores.com`
   - Establece una contraseña segura

6. Ejecuta los scripts SQL de políticas:
   - Ejecuta el SQL de productos en `SUPABASE_AUTH_COMPLETE.md`
   - Ejecuta el SQL de storage en `SUPABASE_AUTH_COMPLETE.md`

7. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── public/         # Componentes del catálogo público
│   ├── admin/          # Componentes del panel de administración
│   └── shared/         # Componentes compartidos (Header, Footer)
├── pages/              # Páginas de la aplicación
├── hooks/              # Custom hooks (useProducts, useCart)
├── services/           # Servicios (Supabase client)
└── utils/              # Utilidades (formato WhatsApp)
```

## 🎨 Características

### Catálogo Público ✅
- ✅ Diseño responsive y moderno
- ✅ Paleta de colores suaves y atractivos
- ✅ Grid de productos con cards elegantes
- ✅ Búsqueda de productos
- ✅ Skeletons de carga
- ✅ Animaciones suaves

### Panel de Administración ✅
- ✅ Login de administrador con Supabase Auth
- ✅ Autenticación segura
- ✅ CRUD de productos completo
- ✅ Upload de imágenes a Supabase Storage
- ✅ Dashboard con estadísticas
- ✅ Protección de datos con RLS

### Carrito de Compras ✅
- ✅ Agregar/eliminar productos
- ✅ Modificar cantidades
- ✅ Persistencia en localStorage
- ✅ Resumen del pedido
- ✅ Integración con WhatsApp

## 🛣️ Rutas

- `/` - Página de inicio
- `/catalog` - Catálogo completo de productos
- `/admin` - Panel de administración

## 🌈 Paleta de Colores

- **Principal**: Rosa suave (#F9A8D4) a Púrpura (#A855F7)
- **Fondo**: Blanco y grises muy claros
- **Textos**: Grises oscuros para legibilidad
- **Acentos**: Gradientes de rosa a púrpura para CTAs

## 📝 Script SQL (Supabase)

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  details TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

## 🚀 Despliegue

### Vercel

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno en Vercel
5. Deploy automático

## 📄 Licencia

Este proyecto es de uso libre para pequeños negocios.

---

Made with ❤️ using React, Tailwind CSS and Supabase
