import { ProductGrid } from '../components/public/ProductGrid'
import { useProducts } from '../hooks/useProducts'
import { Pagination } from '../components/shared/Pagination'
import { ProductModal } from '../components/public/ProductModal'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

export const Catalog = () => {
  const { 
    products, 
    loading, 
    error, 
    page, 
    totalPages, 
    goToPage, 
    nextPage, 
    prevPage, 
    totalCount, 
    filters, 
    updateFilters 
  } = useProducts()
  
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 300) // Clear product after animation
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Nuestro Catálogo de Flores
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Explora nuestra colección completa de arreglos florales perfectos para cada ocasión
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar flores..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 bg-white shadow-sm"
              />
            </div>

            <div className="relative sm:w-48">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filters.typeFilter}
                onChange={(e) => updateFilters({ typeFilter: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 bg-white shadow-sm appearance-none cursor-pointer"
              >
                <option value="all">Todos</option>
                <option value="caja">🎁 Cajas</option>
                <option value="ramo">💐 Ramos</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center text-gray-600 text-sm">
          Mostrando {products.length} de {totalCount} productos
        </div>

        {error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl">
            <p className="text-red-600 text-lg">Error: {error}</p>
          </div>
        ) : (
          <>
            <ProductGrid products={products} loading={loading} onProductClick={handleProductClick} />
            
            {!loading && products.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div>
            )}
          </>
        )}

        {!loading && products.length === 0 && filters.searchTerm && (
          <div className="text-center py-16 bg-pink-50 rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No encontramos "{filters.searchTerm}"
            </h2>
            <p className="text-gray-500">Intenta con otro término de búsqueda</p>
          </div>
        )}

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}