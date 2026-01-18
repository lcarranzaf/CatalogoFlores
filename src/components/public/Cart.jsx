import { X, ShoppingBag, Trash2 } from 'lucide-react'
import { CartItem } from './CartItem'
import { OrderSummary } from './OrderSummary'
import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Cart = () => {
  const { cart, cartTotal, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCart()
  const [showOrderForm, setShowOrderForm] = useState(false)

  const handleCheckout = () => {
    setShowOrderForm(true)
  }

  const handleBackToCart = () => {
    setShowOrderForm(false)
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:bg-transparent"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto md:shadow-xl md:border-l md:border-pink-100 md:mt-16 md:h-[calc(100vh-4rem)] md:rounded-l-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-pink-600" />
              <h2 className="text-xl font-bold text-gray-800">
                {showOrderForm ? 'Finalizar Pedido' : 'Tu Carrito'}
              </h2>
              <span className="bg-pink-500 text-white text-sm px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                setShowOrderForm(false)
              }}
              className="p-2 hover:bg-pink-100 rounded-full transition-colors duration-200"
              aria-label="Cerrar carrito"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌷</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-6">
                Agrega algunas flores hermosas para empezar
              </p>
              <Link
                to="/catalog"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
              >
                <span>Explorar Catálogo</span>
              </Link>
            </div>
          ) : showOrderForm ? (
            <>
              <div className="mb-6 pb-6 border-b border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📋 Resumen del Pedido
                </h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-pink-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <OrderSummary />

              <button
                onClick={handleBackToCart}
                className="w-full mt-4 border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Volver al Carrito</span>
              </button>
            </>
          ) : (
            <>
              <div className="mb-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="border-t border-pink-100 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
                  >
                    <span>Completar Pedido</span>
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full border-2 border-pink-200 text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}