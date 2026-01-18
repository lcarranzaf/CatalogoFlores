import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i)
        }
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((pageNum, index) => (
          pageNum === '...' ? (
            <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-pink-200'
                  : 'bg-white border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700'
              }`}
              aria-label={`Ir a página ${pageNum}`}
            >
              {pageNum}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-1"
        aria-label="Página siguiente"
      >
        <span className="text-sm font-medium">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="hidden md:flex items-center gap-2 text-gray-600 text-sm ml-4">
        <span>Página {currentPage} de {totalPages}</span>
        <span>•</span>
        <span>Total: {totalPages} página{totalPages !== 1 ? 's' : ''}</span>
      </div>
    </div>
  )
}