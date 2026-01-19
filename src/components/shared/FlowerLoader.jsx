

const FlowerLoaderStyles = `
.flower-loader {
  position: relative;
  display: inline-block;
}

.flower-center {
  position: absolute;
  width: 30%;
  height: 30%;
  background: #fbbf24;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
  animation: breathe 2s ease-in-out infinite;
}

.petal {
  position: absolute;
  width: 40%;
  height: 60%;
  border-radius: 50% 50% 50% 0;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: petal-spin 3s linear infinite;
}

/* Petal positions */
.petal-1 { transform: translate(-50%, -50%) rotate(0deg); }
.petal-2 { transform: translate(-50%, -50%) rotate(45deg); }
.petal-3 { transform: translate(-50%, -50%) rotate(90deg); }
.petal-4 { transform: translate(-50%, -50%) rotate(135deg); }
.petal-5 { transform: translate(-50%, -50%) rotate(180deg); }
.petal-6 { transform: translate(-50%, -50%) rotate(225deg); }
.petal-7 { transform: translate(-50%, -50%) rotate(270deg); }
.petal-8 { transform: translate(-50%, -50%) rotate(315deg); }

/* Color variants */
.loader-pink .petal {
  background: linear-gradient(135deg, #ec4899, #f472b6);
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
}

.loader-rose .petal {
  background: linear-gradient(135deg, #f43f5e, #fb7185);
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.3);
}

.loader-purple .petal {
  background: linear-gradient(135deg, #a855f7, #c084fc);
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
}

.loader-multicolor .petal:nth-child(odd) {
  background: linear-gradient(135deg, #ec4899, #f472b6);
  box-shadow: 0 2px 8px rgba(236, 72, 153, 0.3);
}

.loader-multicolor .petal:nth-child(even) {
  background: linear-gradient(135deg, #a855f7, #c084fc);
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
}

/* Animation */
@keyframes petal-spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1);
    opacity: 1;
  }
}

/* Individual petal animations with delays */
.petal-1 { animation-delay: 0s; }
.petal-2 { animation-delay: 0.1s; }
.petal-3 { animation-delay: 0.2s; }
.petal-4 { animation-delay: 0.3s; }
.petal-5 { animation-delay: 0.4s; }
.petal-6 { animation-delay: 0.5s; }
.petal-7 { animation-delay: 0.6s; }
.petal-8 { animation-delay: 0.7s; }

/* Size variations */
.w-8.h-8 .flower-center {
  width: 8px;
  height: 8px;
}

.w-16.h-16 .flower-center {
  width: 12px;
  height: 12px;
}

.w-24.h-24 .flower-center {
  width: 18px;
  height: 18px;
}

.w-32.h-32 .flower-center {
  width: 24px;
  height: 24px;
}

/* Breathing animation for center */
@keyframes breathe {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* Hover effects */
.flower-loader:hover .petal {
  animation-duration: 1.5s;
}

.flower-loader:hover .flower-center {
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
}
`

export const FlowerLoader = ({ size = 'medium', color = 'pink' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const colorClasses = {
    pink: 'loader-pink',
    rose: 'loader-rose',
    purple: 'loader-purple',
    multicolor: 'loader-multicolor'
  }

  return (
    <>
      <style>{FlowerLoaderStyles}</style>
      <div className={`flower-loader ${sizeClasses[size]} ${colorClasses[color]}`}>
        <div className="flower-center"></div>
        <div className="petal petal-1"></div>
        <div className="petal petal-2"></div>
        <div className="petal petal-3"></div>
        <div className="petal petal-4"></div>
        <div className="petal petal-5"></div>
        <div className="petal petal-6"></div>
        <div className="petal petal-7"></div>
        <div className="petal petal-8"></div>
      </div>
    </>
  )
}

export const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="mb-6">
        <FlowerLoader size="xl" color="multicolor" />
      </div>
      <p className="text-lg font-medium text-gray-700 animate-pulse">
        {message}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Preparando flores frescas para ti 🌸
      </p>
    </div>
  )
}

export const InlineLoader = ({ size = 'small', color = 'pink', message }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <FlowerLoader size={size} color={color} />
      {message && (
        <span className="text-sm text-gray-600">{message}</span>
      )}
    </div>
  )
}

export const CardLoader = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6 animate-pulse">
      <div className="flex flex-col items-center justify-center py-8">
        <FlowerLoader size="large" color="pink" />
        <p className="text-sm text-gray-500 mt-4">Cargando producto...</p>
      </div>
    </div>
  )
}

export const PageLoader = ({ message = 'Cargando catálogo...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center">
      <div className="mb-8">
        <FlowerLoader size="xl" color="multicolor" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
      <p className="text-gray-600">Nuestras flores más hermosas están en camino...</p>
    </div>
  )
}