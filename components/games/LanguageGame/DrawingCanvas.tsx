'use client';

import { useTranslations } from 'next-intl';
import { useDrawingCanvas } from '@/hooks/useDrawingCanvas';

export default function DrawingCanvas() {
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
    <div className="bg-white/95 rounded-3xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-purple-600 text-center mb-4">
        {t('drawing.title')}
      </h2>

      <canvas
        ref={canvasRef}
        className="w-full h-64 md:h-96 bg-white border-4 border-purple-600 rounded-xl cursor-crosshair mx-auto block touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="flex gap-3 justify-center items-center mt-4 flex-wrap">
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md">
          <label className="font-bold text-purple-600">{t('drawing.color')}:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-8 border-0 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-md">
          <label className="font-bold text-purple-600">{t('drawing.size')}:</label>
          <input
            type="range"
            min="2"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="font-bold text-purple-600 min-w-[2rem]">{brushSize}</span>
        </div>

        <button
          onClick={clearCanvas}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold
                     hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          {t('drawing.clear')}
        </button>

        <button
          onClick={downloadDrawing}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold
                     hover:bg-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          {t('drawing.save')}
        </button>
      </div>
    </div>
  );
}
