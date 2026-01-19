import React, { useState } from 'react'
import { X, ShoppingCart, Heart, Share2, Search } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { parseDetails } from '../../utils/detailIconParser'
import { ZoomableImage } from './ZoomableImage'

export const ProductModal = ({ product, isOpen, onClose }) => {
  const { id, name, description, price, image_url, type, details } = product || {}
  const { addToCart } = useCart()
  const { success } = useToast()
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const parsedDetails = parseDetails(details)

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      success(`${name} agregado al carrito`)
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: name,
          text: description,
          url: window.location.href
        })
      } catch (err) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        success('Enlace copiado al portapapeles')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      success('Enlace copiado al portapapeles')
    }
  }

  // Close modal on ESC key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isZoomOpen) {
          setIsZoomOpen(false)
        } else {
          onClose()
        }
      }
    }
    
    if (isOpen && !isZoomOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isZoomOpen, onClose])

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleImageClick = () => {
    if (image_url) {
      setIsZoomOpen(true)
    }
  }

  const handleCloseZoom = () => {
    setIsZoomOpen(false)
  }

  if (!isOpen || !product) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      
      {/* Modal container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
          
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                type === 'caja'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
              }`}>
                {type === 'caja' ? '🎁 Caja' : '💐 Ramo'}
              </span>
              <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{name}</h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            
            {/* Image section */}
            <div className="space-y-4">
              <div className="relative group">
                <div 
                  className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 cursor-pointer"
                  onClick={handleImageClick}
                >
                  {image_url ? (
                    <img
                      src={image_url}
                      alt={name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-full h-full hidden items-center justify-center text-pink-300"
                    style={{ display: image_url ? 'none' : 'flex' }}
                  >
                    <svg className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Zoom indicator overlay */}
                {image_url && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <div className="bg-black/60 text-white px-3 py-2 rounded-full flex items-center gap-2 text-sm">
                      <Search className="w-4 h-4" />
                      <span>Click para zoom</span>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                {image_url && (
                  <div 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl flex items-center justify-center cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white/90 rounded-full p-3 shadow-lg">
                        <Search className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons below image */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Compartir</span>
                </button>
                
                {image_url && (
                  <button
                    onClick={handleImageClick}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm font-medium">Zoom</span>
                  </button>
                )}
              </div>
            </div>

            {/* Info section */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Details */}
              {parsedDetails.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Características</h3>
                  <div className="space-y-2">
                    {parsedDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-pink-50 rounded-xl">
                        <span className="flex-shrink-0 text-lg">{detail.icon}</span>
                        <p className="text-sm text-gray-700 flex-1">{detail.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Add to Cart */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Precio</p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ${price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Disponibilidad</p>
                    <p className="text-sm font-medium text-green-600">En stock</p>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 active:scale-95 font-semibold text-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && image_url && (
        <ZoomableImage
          src={image_url}
          alt={name}
          onClose={handleCloseZoom}
        />
      )}
    </div>
  )
}