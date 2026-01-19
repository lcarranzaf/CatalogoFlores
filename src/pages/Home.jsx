import { Link } from 'react-router-dom'
import { ProductGrid } from '../components/public/ProductGrid'
import { useProducts } from '../hooks/useProducts'
import { ArrowRight, Sparkles, Truck, Heart } from 'lucide-react'

export const Home = () => {
  const { products, loading } = useProducts()

  const featuredProducts = products.slice(0, 8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Descubre Flores que
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Enamoran el Corazón
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Arreglos florales frescos y hermosos para cada ocasión especial.
              Envíos rápidos y la mejor calidad.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-pink-200 hover:scale-105"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-linear-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="bg-linear-to-br from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Detalles que Hablan de Amor 💐💖</h3>
              <p className="text-gray-600">Arreglos florales creados para expresar amor, detalle y elegancia.</p>
            </div>

            <div className="text-center p-8 bg-linear-to-br from-rose-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="bg-linear-to-br from-rose-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Envío Rápido</h3>
              <p className="text-gray-600">Entregamos tu pedido en tiempo récord para que disfrutes de tus flores.</p>
            </div>

            <div className="text-center p-8 bg-linear-to-br from-purple-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className="bg-linear-to-br from-purple-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hecho con Amor</h3>
              <p className="text-gray-600">Cada arreglo floral es creado con dedicación y cariño para ti.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros Productos Destacados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de flores más hermosas y populares
            </p>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />

          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="inline-flex items-center space-x-2 border-2 border-pink-500 text-pink-600 hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
            >
              <span>Ver Todo el Catálogo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}