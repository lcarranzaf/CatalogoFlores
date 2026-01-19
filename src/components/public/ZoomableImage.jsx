import React, { useState, useRef, useEffect } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

export const ZoomableImage = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
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
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e)
    const handleGlobalMouseUp = () => handleMouseUp()

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
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
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-10">
        🖱️ Rueda del mouse para zoom • Arrastrar con zoom activado
      </div>

      {/* Image container */}
      <div
        ref={containerRef}
        className="relative max-w-full max-h-full overflow-hidden cursor-move"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
          draggable={false}
        />
      </div>
    </div>
  )
}