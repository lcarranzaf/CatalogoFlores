# 📊 SQL para Agregar Columna "Tipo" a Tabla Products

## Ejecutar en Supabase SQL Editor

```sql
-- Agregar columna tipo/categoría a la tabla products
ALTER TABLE products ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'caja';

-- Crear índice para búsqueda por tipo
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);

-- Actualizar políticas RLS para incluir la nueva columna
-- Política para lectura pública (ya existe, solo verificamos)
SELECT * FROM pg_policies WHERE tablename = 'products';

-- Política para insertar productos (solo admin autenticado)
DROP POLICY IF EXISTS "Allow admin insert" ON "products";
CREATE POLICY "Allow admin insert"
ON "products"
FOR INSERT
TO authenticated
WITH CHECK (
  auth.email() = 'admin@flores.com'
);

-- Política para actualizar productos (solo admin autenticado)
DROP POLICY IF EXISTS "Allow admin update" ON "products";
CREATE POLICY "Allow admin update"
ON "products"
FOR UPDATE
TO authenticated
USING (
  auth.email() = 'admin@flores.com'
)
WITH CHECK (
  auth.email() = 'admin@flores.com'
);

-- Verificar la estructura de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;
```

## Si ya tienes productos existentes, ejecuta:

```sql
-- Actualizar productos existentes con un valor por defecto
-- Opcional: Deja esto comentado si quieres definir tipo por producto
-- UPDATE products SET type = 'caja' WHERE type IS NULL;
```

## Valores Permitidos para el Campo "type"

- `caja` - Para productos tipo caja
- `ramo` - Para productos tipo ramo

---

Made with 🌸
