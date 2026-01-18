import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../services/supabaseClient'

export const useProducts = (itemsPerPage = 12) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({ searchTerm: '', typeFilter: 'all' })

  const fetchProducts = useCallback(async (pageNumber = 1, currentFilters = filters) => {
    try {
      setLoading(true)
      const from = (pageNumber - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      let query = supabase
        .from('products')
        .select('*', { count: 'exact', head: false })
        .order('created_at', { ascending: false })
        .range(from, to)

      // Aplicar filtros en la consulta
      if (currentFilters.searchTerm) {
        query = query.or(
          `name.ilike.%${currentFilters.searchTerm}%,description.ilike.%${currentFilters.searchTerm}%`
        )
      }

      if (currentFilters.typeFilter !== 'all') {
        query = query.eq('type', currentFilters.typeFilter)
      }

      const { data, error, count } = await query

      if (error) throw error

      setProducts(data || [])
      setTotalCount(count || 0)
      setTotalPages(Math.ceil((count || 0) / itemsPerPage))
      setPage(pageNumber)
      setFilters(currentFilters)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [itemsPerPage, filters])

  const fetchAllProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProducts(data || [])
      setTotalCount(data?.length || 0)
      setTotalPages(1)
      setPage(1)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    fetchProducts(1)
  }, [])

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    fetchProducts(1, updatedFilters)
  }

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchProducts(pageNumber, filters)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const nextPage = () => {
    if (page < totalPages) {
      goToPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      goToPage(page - 1)
    }
  }

  const refetch = () => {
    fetchProducts(page, filters)
  }

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    totalCount,
    filters,
    goToPage,
    nextPage,
    prevPage,
    updateFilters,
    refetch,
    fetchAll: fetchAllProducts,
  }
}