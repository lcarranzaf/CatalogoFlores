import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './hooks/useToast'
import { CartProvider } from './hooks/useCart'
import { Header } from './components/shared/Header'
import { Footer } from './components/shared/Footer'
import { ToastContainer } from './components/shared/ToastContainer'
import { Cart } from './components/public/Cart'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { Admin } from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </main>
              <Footer />
              <Cart />
              <ToastContainer />
            </div>
          </Router>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App