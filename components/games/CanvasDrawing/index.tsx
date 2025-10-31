'use client';

import { useTranslations } from 'next-intl';
import { useDrawingCanvas } from '@/hooks/useDrawingCanvas';

export default function CanvasDrawing() {
  const t = useTranslations('games');
  const {
    canvasRef,
    color,
    setColor,
    brushSize,
    setBrushSize,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    downloadDrawing
  } = useDrawingCanvas();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 text-center mb-2">
            {t('drawing.title')}
          </h1>
          <p className="text-center text-gray-600 mb-8 text-lg">
            {t('drawing.subtitle')}
          </p>

          <canvas
            ref={canvasRef}
            className="w-full h-96 md:h-[500px] bg-white border-4 border-purple-600 rounded-xl cursor-crosshair mx-auto block touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          <div className="flex gap-4 justify-center items-center mt-6 flex-wrap">
            <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-md border-2 border-purple-200">
              <label className="font-bold text-purple-600 text-lg">{t('drawing.color')}:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-12 border-2 border-purple-300 rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3 bg-white rounded-xl px-6 py-3 shadow-md border-2 border-purple-200">
              <label className="font-bold text-purple-600 text-lg">{t('drawing.size')}:</label>
              <input
                type="range"
                min="2"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-32"
              />
              <span className="font-bold text-purple-600 min-w-[2.5rem] text-lg">{brushSize}</span>
            </div>

            <button
              onClick={clearCanvas}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold text-lg
                         hover:bg-red-600 transition-all shadow-md hover:shadow-lg
                         hover:scale-105 active:scale-95"
            >
              {t('drawing.clear')}
            </button>

            <button
              onClick={downloadDrawing}
              className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold text-lg
                         hover:bg-green-600 transition-all shadow-md hover:shadow-lg
                         hover:scale-105 active:scale-95"
            >
              {t('drawing.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
