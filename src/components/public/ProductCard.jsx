import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { parseDetails } from '../../utils/detailIconParser'

export const ProductCard = ({ product }) => {
  const { id, name, description, price, image_url, type, details } = product
  const { addToCart } = useCart()
  const { success } = useToast()

  const parsedDetails = parseDetails(details)

  const handleAddToCart = () => {
    addToCart(product)
    success(`${name} agregado al carrito`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-pink-100">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pink-300">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            type === 'caja'
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
          }`}>
            {type === 'caja' ? '🎁 Caja' : '💐 Ramo'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {parsedDetails.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {parsedDetails.slice(0, 4).map((detail, index) => (
              <p key={index} className="text-xs text-gray-700 flex items-center gap-1.5">
                <span>{detail.icon}</span>
                <span className="line-clamp-1">{detail.text}</span>
              </p>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}