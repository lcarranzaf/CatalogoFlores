import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { Link } from 'react-router-dom'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { cartCount, setIsOpen: setCartOpen } = useCart()

  const handleCartClick = () => {
    setCartOpen(true)
    setIsOpen(false)
  }

  return (
    <header className="bg-linear-to-r from-pink-50 via-purple-50 to-rose-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              🌸 Catálogo Rosas Eternas
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-extrabold">
              Inicio
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-pink-600 transition-colors font-extrabold">
              Catálogo
            </Link>
            {/* <Link to="/admin" className="text-gray-600 hover:text-pink-600 transition-colors text-sm">
              Admin
            </Link> */}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-100">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-pink-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className="block py-2 text-gray-700 hover:text-pink-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Catálogo
            </Link>
            {/* <Link
              to="/admin"
              className="block py-2 text-gray-600 hover:text-pink-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link> */}
            <button
              onClick={handleCartClick}
              className="flex items-center space-x-2 py-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Carrito ({cartCount})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}