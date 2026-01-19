import React, { useState, useRef, useEffect } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

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

export const ZoomableImage = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, distance: 0 })
  const containerRef = useRef(null)

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1))
  }

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
        distance: 0
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      e.preventDefault()
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile pinch-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom start
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      setIsDragging(true)
      setDragStart({ x: 0, y: 0, distance })
    } else if (e.touches.length === 1) {
      // Single touch for drag
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
        distance: 0
      })
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    e.preventDefault()
    
    if (e.touches.length === 2) {
      // Pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      
      const scaleDelta = distance / dragStart.distance
      const newScale = Math.max(0.5, Math.min(3, scale * scaleDelta))
      setScale(newScale)
      setDragStart({ ...dragStart, distance })
    } else if (e.touches.length === 1 && scale > 1) {
      // Drag when zoomed
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Custom wheel handler without preventDefault
  const wheelTimeoutRef = useRef(null)
  const handleWheel = (e) => {
    // Clear any existing timeout
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current)
    }

    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)))

    // Set a timeout to prevent too rapid scrolling
    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null
    }, 16) // ~60fps
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e)
    const handleGlobalMouseUp = () => handleMouseUp()
    const handleGlobalTouchMove = (e) => handleTouchMove(e)
    const handleGlobalTouchEnd = () => handleTouchEnd()

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false })
      document.addEventListener('touchend', handleGlobalTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchmove', handleGlobalTouchMove)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [isDragging, dragStart, scale])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <>
      <style>{FlowerLoaderStyles}</style>
      <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center">
        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            title="Alejar"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            title="Acercar"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            title="Resetear zoom"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            title="Cerrar (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-10">
          {Math.round(scale * 100)}%
          {isDragging && ' • Arrastrando'}
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10 text-center">
          <div>🖱️ Botones +/**- para zoom</div>
          <div>📱 Pinch-to-zoom en móviles</div>
          <div>✋ Arrastrar con zoom activado</div>
        </div>

        {/* Image container */}
        <div
          ref={containerRef}
          className="relative max-w-full max-h-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onWheel={handleWheel}
          style={{ 
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            touchAction: 'none',
            overscrollBehavior: 'none'
          }}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain select-none"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
            draggable={false}
          />
        </div>
      </div>
    </>
  )
}