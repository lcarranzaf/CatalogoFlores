import { LogOut, Plus, Package, DollarSign } from 'lucide-react'
import { ProductList } from './ProductList'
import { Pagination } from '../shared/Pagination'

export const Dashboard = ({ products, totalCount, page, totalPages, onEditProduct, onDeleteProduct, onAddProduct, onLogout, onFetchAll }) => {
  const totalProducts = products.length
  const averagePrice = products.length > 0
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🌸 Panel de Administración
            </h1>
            <p className="text-gray-600">
              Gestiona tu catálogo de flores
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-pink-200 text-pink-600 hover:bg-pink-50 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-pink-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {totalProducts}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Total de Productos
            </h3>
            <p className="text-sm text-gray-600">
              Flores en el catálogo
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-rose-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                ${averagePrice.toFixed(2)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Precio Promedio
            </h3>
            <p className="text-sm text-gray-600">
              De todos los productos
            </p>
          </div>

          <div className="bg-linear-to-br from-pink-500 to-purple-500 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            <button
              onClick={onAddProduct}
              className="w-full bg-white text-pink-600 px-4 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

          <div className="mb-4 flex items-center justify-between">
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    📦 Productos
                  </h2>
                  <p className="text-sm text-gray-600">
                    Mostrando {totalProducts} de {totalCount} productos
                  </p>
                </div>
                {totalProducts < totalCount && (
                  <button
                    onClick={onFetchAll}
                    className="bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-200"
                  >
                    Ver Todos
                  </button>
                )}
              </div>
            </div>
          </div>

          <ProductList
            products={products}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
            onAdd={onAddProduct}
          />

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                  onFetchAll ? onFetchAll() : console.log('Page:', newPage)
                }}
              />
            </div>
          )}
        </div>
      </div>
  )
}