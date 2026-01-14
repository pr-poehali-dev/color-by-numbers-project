import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Painting } from './types';

interface PaintingCanvasProps {
  painting: Painting;
  onBack: () => void;
}

export default function PaintingCanvas({ painting, onBack }: PaintingCanvasProps) {
  const [activePainting, setActivePainting] = useState<Painting>({
    ...painting,
    zones: painting.zones.map(z => ({ ...z, filled: false }))
  });
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number | null>(null);

  const fillZone = (zoneId: number) => {
    if (!selectedColor) return;
    
    setActivePainting({
      ...activePainting,
      zones: activePainting.zones.map(zone => 
        zone.id === zoneId && zone.number === selectedColor && !zone.filled
          ? { ...zone, filled: true }
          : zone
      )
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastTouchDistance.current = distance;
    } else if (e.touches.length === 1) {
      setIsPainting(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (lastTouchDistance.current !== null) {
        const delta = distance - lastTouchDistance.current;
        const newScale = Math.min(Math.max(scale + delta * 0.01, 1), 3);
        setScale(newScale);
      }

      lastTouchDistance.current = distance;
    } else if (isPainting && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.hasAttribute('data-zone-id')) {
        const zoneId = parseInt(element.getAttribute('data-zone-id')!);
        fillZone(zoneId);
      }
    }
  };

  const handleTouchEnd = () => {
    lastTouchDistance.current = null;
    setIsPainting(false);
  };

  const handleMouseDown = () => {
    setIsPainting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPainting) {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element && element.hasAttribute('data-zone-id')) {
        const zoneId = parseInt(element.getAttribute('data-zone-id')!);
        fillZone(zoneId);
      }
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const calculateProgress = () => {
    const filled = activePainting.zones.filter(z => z.filled).length;
    return Math.round((filled / activePainting.zones.length) * 100);
  };

  const resetPainting = () => {
    setActivePainting({
      ...activePainting,
      zones: activePainting.zones.map(z => ({ ...z, filled: false }))
    });
    setSelectedColor(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-2 flex items-center justify-between px-4">
        <Button 
          size="icon"
          variant="ghost" 
          onClick={onBack}
          className="bg-white rounded-full hover:bg-gray-100"
        >
          <Icon name="ArrowLeft" size={24} className="text-gray-700" />
        </Button>
        
        <div className="flex-1 mx-4 bg-white/30 backdrop-blur rounded-full h-8 flex items-center px-3 gap-2">
          <Icon name="Palette" size={18} className="text-white" />
          <div className="flex-1 bg-white/50 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white font-bold text-sm">{progress}%</span>
        </div>
        
        <Button 
          size="icon"
          variant="ghost"
          className="bg-white rounded-full hover:bg-gray-100"
          onClick={resetPainting}
        >
          <Icon name="RotateCcw" size={20} className="text-gray-700" />
        </Button>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden touch-none pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          ref={canvasRef}
          className="grid gap-0 bg-gray-100"
          style={{ 
            gridTemplateColumns: 'repeat(16, 1fr)',
            width: `min(90vw, 90vh)`,
            height: `min(90vw, 90vh)`,
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isPainting ? 'none' : 'transform 0.2s ease-out',
            touchAction: 'none'
          }}
        >
          {activePainting.zones.map((zone) => (
            <div
              key={zone.id}
              data-zone-id={zone.id}
              onClick={() => fillZone(zone.id)}
              className={`
                aspect-square border border-gray-200 flex items-center justify-center cursor-pointer select-none
                ${zone.filled 
                  ? '' 
                  : 'hover:bg-yellow-100'
                }
                ${selectedColor === zone.number && !zone.filled ? 'ring-2 ring-inset ring-yellow-400' : ''}
              `}
              style={{
                backgroundColor: zone.filled ? zone.color : '#ffffff',
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              {!zone.filled && (
                <span className="text-[10px] font-bold text-gray-600 pointer-events-none">
                  {zone.number}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {scale > 1 && (
        <div className="fixed top-20 right-4 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Icon name="ZoomIn" size={18} className="text-gray-700" />
            <span className="text-sm font-bold text-gray-700">{Math.round(scale * 100)}%</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-200 shadow-lg p-4">
        {progress === 100 ? (
          <div className="max-w-2xl mx-auto text-center py-4">
            <Icon name="Trophy" size={48} className="text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Отлично! Картина готова!</h3>
            <Button className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-lg py-6">
              <Icon name="Share2" size={20} />
              <span className="ml-2">Поделиться результатом</span>
            </Button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {activePainting.colors.map((color) => {
                const remaining = activePainting.zones.filter(z => z.number === color.number && !z.filled).length;
                
                return (
                  <button
                    key={color.number}
                    onClick={() => setSelectedColor(color.number)}
                    className={`
                      flex-shrink-0 relative transition-all duration-200
                      ${selectedColor === color.number 
                        ? 'scale-110 ring-4 ring-green-400' 
                        : 'hover:scale-105'
                      }
                      ${remaining === 0 ? 'opacity-40' : ''}
                    `}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl border-4 border-gray-300 shadow-lg flex items-center justify-center relative"
                      style={{ backgroundColor: color.color }}
                    >
                      <span className="text-2xl font-black text-gray-700 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
                        {color.number}
                      </span>
                      {remaining > 0 && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                          {remaining}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              💡 Зажми и веди пальцем • Увеличь двумя пальцами
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
