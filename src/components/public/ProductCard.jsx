import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { parseDetails } from '../../utils/detailIconParser'

export const ProductCard = ({ product, onProductClick }) => {
  const { id, name, description, price, image_url, type, details } = product
  const { addToCart } = useCart()
  const { success } = useToast()

  const parsedDetails = parseDetails(details)

  const handleAddToCart = () => {
    addToCart(product)
    success(`${name} agregado al carrito`)
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-pink-100 cursor-pointer"
      onClick={() => onProductClick && onProductClick(product)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 group">
        <div className="aspect-[4/3] sm:aspect-square overflow-hidden">
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-pink-50 to-purple-50"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div 
            className="w-full h-full hidden items-center justify-center text-pink-300 bg-gradient-to-br from-pink-50 to-purple-50"
            style={{ display: image_url ? 'none' : 'flex' }}
          >
            <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
          <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
            type === 'caja'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
          }`}>
            {type === 'caja' ? '🎁 Caja' : '💐 Ramo'}
          </span>
        </div>
        
        {/* Overlay para indicar que es clickable */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[3rem]">{description}</p>

        {parsedDetails.length > 0 && (
          <div className="space-y-1 mb-3 sm:mb-4">
            {parsedDetails.map((detail, index) => (
              <p key={index} className="text-xs text-gray-700 flex items-center gap-1.5">
                <span className="flex-shrink-0">{detail.icon}</span>
                <span className="line-clamp-1">{detail.text}</span>
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart()
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 active:scale-95 text-sm sm:text-base"
            title="Agregar al carrito"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}