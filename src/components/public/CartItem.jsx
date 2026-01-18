import { Minus, Plus, Trash2 } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { success } = useToast()

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-3 hover:shadow-md transition-shadow duration-300">
      <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-pink-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-pink-300">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-grow min-w-0">
        <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
        <p className="text-sm text-gray-600 mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-200">
          <button
            onClick={() => {
              onUpdateQuantity(item.id, item.quantity - 1)
            }}
            className="p-1.5 hover:bg-pink-100 rounded-l-lg transition-colors duration-200"
            aria-label="Disminuir cantidad"
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="w-8 text-center font-semibold text-gray-800">
            {item.quantity}
          </span>
          <button
            onClick={() => {
              onUpdateQuantity(item.id, item.quantity + 1)
            }}
            className="p-1.5 hover:bg-pink-100 rounded-r-lg transition-colors duration-200"
            aria-label="Aumentar cantidad"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => {
            onRemove(item.id)
            success(`${item.name} eliminado del carrito`)
          }}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors duration-200"
          aria-label="Eliminar producto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}