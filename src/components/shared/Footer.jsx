export const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-pink-50 via-purple-50 to-rose-50 border-t border-pink-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            🌸 Detalles hechos con el corazón
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} Catálogo Flores. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}