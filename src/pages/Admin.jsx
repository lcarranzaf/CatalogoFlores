import { useState } from 'react'
import { LoginForm } from '../components/admin/LoginForm'
import { Dashboard } from '../components/admin/Dashboard'
import { ProductForm } from '../components/admin/ProductForm'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { useToast } from '../hooks/useToast'
import { supabase } from '../services/supabaseClient'

export const Admin = () => {
  const { isAuthenticated, login, logout, loading } = useAuth()
  const { products, refetch, totalCount, page, totalPages } = useProducts()
  const { success, error: toastError } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleLogin = async (email, password) => {
    return await login(email, password)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)

        if (error) throw error
        success('Producto actualizado correctamente')
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error
        success('Producto creado correctamente')
      }

      setShowForm(false)
      setEditingProduct(null)
      refetch()
    } catch (err) {
      console.error('Error saving product:', err)
      toastError('Error al guardar el producto')
    }
  }

  const handleDeleteProduct = async (product) => {
    if (!confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (error) throw error

      success('Producto eliminado correctamente')
      refetch()
    } catch (err) {
      console.error('Error deleting product:', err)
      toastError('Error al eliminar el producto')
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Cargando...
          </h2>
          <p className="text-gray-500">
            Verificando sesión
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <>
      <Dashboard
        products={products}
        totalCount={totalCount}
        page={page}
        totalPages={totalPages}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct}
        onLogout={logout}
        onFetchAll={() => refetch()}
      />

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancelForm}
        />
      )}
    </>
  )
    
}