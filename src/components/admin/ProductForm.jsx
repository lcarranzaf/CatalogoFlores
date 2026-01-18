import { useState } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

export const ProductForm = ({ product, onSave, onCancel }) => {
  const { success, error: toastError } = useToast()
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    details: product?.details || '',
    price: product?.price || '',
    image_url: product?.image_url || '',
    type: product?.type || 'caja',
  })
  const [uploading, setUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)

    try {
      const fileName = `${Date.now()}_${file.name}`
      const { supabase } = await import('../../services/supabaseClient')

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path)

      setFormData((prev) => ({ ...prev, image_url: publicUrl }))
      success('Imagen subida correctamente')
    } catch (error) {
      console.error('Error uploading image:', error)
      toastError('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    }

    onSave(productData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-pink-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-pink-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen del Producto
            </label>
            <div className="space-y-3">
              {formData.image_url && (
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-pink-100">
                  <img
                    src={formData.image_url}
                    alt="Producto"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-pink-200 rounded-xl cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    <span className="text-gray-600">Subiendo imagen...</span>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-pink-600" />
                      <span className="text-gray-600">
                        {formData.image_url ? 'Cambiar imagen' : 'Subir imagen'}
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Rosa Roja"
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300"
              required
            />
          </div> 

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Producto *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 bg-white"
              required
            >
              <option value="caja">🎁 Caja</option>
              <option value="ramo">💐 Ramo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Corta *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej: Hermosas rosas rojas para expresar amor"
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detalles del Producto
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Escribe cada detalle en una línea nueva (presiona Enter)
            </p>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Ej:
12 rosas frescas
Follaje verde
Incluye tarjeta personalizada
Envío gratis"
              rows={5}
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="299.99"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-200"
            >
              {product ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}