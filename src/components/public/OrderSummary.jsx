import { formatOrderForWhatsApp } from '../../utils/whatsappFormatter'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { useState } from 'react'

export const OrderSummary = () => {
  const { cart, cartTotal, clearCart, setIsOpen } = useCart()
  const { success, error: toastError } = useToast()
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!customerName || !customerPhone) {
      toastError('Por favor, completa todos tus datos')
      return
    }

    const whatsappUrl = formatOrderForWhatsApp(cart, cartTotal, customerName)

    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank')
      clearCart()
      setIsOpen(false)
      success('Pedido enviado correctamente por WhatsApp')
    }
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📝 Datos de Contacto
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <div className="relative">
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Tu teléfono"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300"
              required
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="pt-4 border-t border-pink-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total a pagar:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
          >
            <span>Enviar por WhatsApp</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Serás redirigido a WhatsApp para completar tu pedido
          </p>
        </div>
      </form>
    </div>
  )
}