import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

export const Toast = ({ toast, onClose }) => {
  const getTypeClasses = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
      default:
        return 'bg-blue-500'
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <XCircle className="w-5 h-5" />
      case 'info':
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  return (
    <div
      className={`${getTypeClasses()} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in`}
    >
      {getIcon()}
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-white/80 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}