'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { Upload, RotateCcw, Check } from 'lucide-react';

// Constants
const CANVAS_BASE_SIZE = 600;

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number;
  imageData: ImageData | null;
  x: number;
  y: number;
}

export default function ImagePuzzle() {
  const t = useTranslations('games');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [gridSize, setGridSize] = useState<number>(3);
  const [showCelebration, setShowCelebration] = useState(false);
  const [canvasSize, setCanvasSize] = useState<number>(CANVAS_BASE_SIZE);
  const [needsInitialPuzzle, setNeedsInitialPuzzle] = useState(false);

  // Drag-and-drop state
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPieceIndex, setDraggedPieceIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        setShowCelebration(false);
        setNeedsInitialPuzzle(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const createPuzzle = (img: HTMLImageElement, targetGridSize?: number) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use the provided grid size or fall back to current state
    const currentGridSize = targetGridSize ?? gridSize;

    // Use CANVAS_BASE_SIZE which is perfectly divisible by 3, 4, and 5
    canvas.width = CANVAS_BASE_SIZE;
    canvas.height = CANVAS_BASE_SIZE;

    // Draw image to fill the square canvas (crop to square)
    const scale = Math.max(CANVAS_BASE_SIZE / img.width, CANVAS_BASE_SIZE / img.height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    const offsetX = (CANVAS_BASE_SIZE - scaledWidth) / 2;
    const offsetY = (CANVAS_BASE_SIZE - scaledHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

    // Calculate piece dimensions (evenly divisible)
    const pieceWidth = CANVAS_BASE_SIZE / currentGridSize;
    const pieceHeight = CANVAS_BASE_SIZE / currentGridSize;
    const newPieces: PuzzlePiece[] = [];

    for (let row = 0; row < currentGridSize; row++) {
      for (let col = 0; col < currentGridSize; col++) {
        const pieceIndex = row * currentGridSize + col;

        // Calculate exact pixel positions
        const x = Math.round(col * pieceWidth);
        const y = Math.round(row * pieceHeight);
        const width = Math.round(pieceWidth);
        const height = Math.round(pieceHeight);

        const imageData = ctx.getImageData(x, y, width, height);

        newPieces.push({
          id: pieceIndex,
          correctPosition: pieceIndex,
          currentPosition: pieceIndex,
          imageData,
          x,
          y,
        });
      }
    }

    // Shuffle pieces using Fisher-Yates algorithm
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }

    // Set state - useEffect will handle drawing
    // Update all state together to ensure consistency
    const newGridSize = targetGridSize ?? gridSize;
    setGridSize(newGridSize);
    setCanvasSize(CANVAS_BASE_SIZE);
    setPieces(shuffled);
  };

  // Draw original image to preview canvas
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas || !uploadedImage) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = CANVAS_BASE_SIZE;
    canvas.height = CANVAS_BASE_SIZE;

    // Draw image to fill the square canvas (crop to square)
    const scale = Math.max(CANVAS_BASE_SIZE / uploadedImage.width, CANVAS_BASE_SIZE / uploadedImage.height);
    const scaledWidth = uploadedImage.width * scale;
    const scaledHeight = uploadedImage.height * scale;
    const offsetX = (CANVAS_BASE_SIZE - scaledWidth) / 2;
    const offsetY = (CANVAS_BASE_SIZE - scaledHeight) / 2;

    ctx.drawImage(uploadedImage, offsetX, offsetY, scaledWidth, scaledHeight);
  }, [uploadedImage]);

  // Create puzzle when needed (after canvases are rendered)
  useEffect(() => {
    if (needsInitialPuzzle && uploadedImage && previewCanvasRef.current) {
      createPuzzle(uploadedImage, 3);
      setNeedsInitialPuzzle(false);
    }
  }, [needsInitialPuzzle, uploadedImage]);

  // Draw puzzle whenever pieces, draggedPieceIndex, canvasSize, gridSize, or hoverPosition changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || pieces.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Verify pieces match the grid size
    const expectedPieceCount = gridSize * gridSize;
    if (pieces.length !== expectedPieceCount) {
      return;
    }

    // Set canvas dimensions
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Calculate piece dimensions
    const pieceWidth = canvasSize / gridSize;
    const pieceHeight = canvasSize / gridSize;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Sort by current position to draw in correct order
    const sortedPieces = [...pieces].sort(
      (a, b) => a.currentPosition - b.currentPosition
    );

    sortedPieces.forEach((piece, idx) => {
      if (!piece.imageData) return;

      // Skip drawing the piece being dragged in its original position
      if (draggedPieceIndex !== null && idx === draggedPieceIndex) {
        // Draw a placeholder/shadow instead
        const col = piece.currentPosition % gridSize;
        const row = Math.floor(piece.currentPosition / gridSize);
        const x = Math.round(col * pieceWidth);
        const y = Math.round(row * pieceHeight);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x, y, piece.imageData.width, piece.imageData.height);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(x, y, piece.imageData.width, piece.imageData.height);
        ctx.setLineDash([]);
        return;
      }

      const col = piece.currentPosition % gridSize;
      const row = Math.floor(piece.currentPosition / gridSize);

      // Calculate position with exact rounding to prevent gaps
      const x = Math.round(col * pieceWidth);
      const y = Math.round(row * pieceHeight);

      ctx.putImageData(piece.imageData, x, y);

      // Highlight hover position
      const isHovered = hoverPosition === piece.currentPosition && draggedPieceIndex !== null;
      ctx.strokeStyle = isHovered ? '#facc15' : '#666';
      ctx.lineWidth = isHovered ? 4 : 2;
      ctx.strokeRect(x, y, piece.imageData.width, piece.imageData.height);
    });
  }, [pieces, canvasSize, gridSize, draggedPieceIndex, hoverPosition]);

  // Helper to get canvas coordinates from pointer event
  const getCanvasCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
      displayX: clientX - rect.left,
      displayY: clientY - rect.top,
    };
  };

  // Helper to get piece position from coordinates
  const getPieceAtPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const pieceWidth = canvas.width / gridSize;
    const pieceHeight = canvas.height / gridSize;

    const col = Math.floor(x / pieceWidth);
    const row = Math.floor(y / pieceHeight);

    if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return null;

    return row * gridSize + col;
  };

  // Pointer event handlers (works for mouse, touch, and pen)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (pieces.length === 0) return;

    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    const position = getPieceAtPosition(coords.x, coords.y);
    if (position === null) return;

    const pieceIndex = pieces.findIndex((p) => p.currentPosition === position);
    if (pieceIndex === -1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Capture pointer to receive events even outside canvas
    e.currentTarget.setPointerCapture(e.pointerId);

    const pieceWidth = canvas.width / gridSize;
    const pieceHeight = canvas.height / gridSize;
    const col = position % gridSize;
    const row = Math.floor(position / gridSize);
    const pieceX = col * pieceWidth;
    const pieceY = row * pieceHeight;

    setIsDragging(true);
    setDraggedPieceIndex(pieceIndex);
    setDragOffset({
      x: coords.x - pieceX,
      y: coords.y - pieceY,
    });
    setDragPosition({ x: coords.displayX, y: coords.displayY });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || draggedPieceIndex === null) return;

    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    if (!coords) return;

    setDragPosition({ x: coords.displayX, y: coords.displayY });

    const position = getPieceAtPosition(coords.x, coords.y);
    setHoverPosition(position);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging || draggedPieceIndex === null) return;

    const coords = getCanvasCoordinates(e.clientX, e.clientY);
    if (coords) {
      const targetPosition = getPieceAtPosition(coords.x, coords.y);

      if (targetPosition !== null && targetPosition !== pieces[draggedPieceIndex].currentPosition) {
        // Swap pieces
        const newPieces = [...pieces];
        const targetPieceIndex = newPieces.findIndex((p) => p.currentPosition === targetPosition);

        if (targetPieceIndex !== -1) {
          const temp = newPieces[draggedPieceIndex].currentPosition;
          newPieces[draggedPieceIndex].currentPosition = newPieces[targetPieceIndex].currentPosition;
          newPieces[targetPieceIndex].currentPosition = temp;

          // Check if puzzle is complete
          const complete = newPieces.every(
            (piece) => piece.correctPosition === piece.currentPosition
          );

          if (complete) {
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
          }

          setPieces(newPieces);
        }
      }
    }

    setIsDragging(false);
    setDraggedPieceIndex(null);
    setHoverPosition(null);
  };

  const handleReset = () => {
    if (uploadedImage) {
      createPuzzle(uploadedImage);
    }
  };

  const handleNewImage = () => {
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card rounded-3xl p-8 shadow-2xl border">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-2">
            {t('puzzle.title')}
          </h1>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            {t('puzzle.subtitle')}
          </p>

          {/* Hidden file input - always present in DOM */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Upload Section */}
          {!uploadedImage && (
            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg
                         hover:bg-primary/90 transition-all shadow-md hover:shadow-lg
                         hover:scale-105 active:scale-95 border-2 border-primary-foreground/50
                         flex items-center gap-3"
              >
                <Upload size={24} />
                {t('puzzle.upload')}
              </button>
            </div>
          )}

          {/* Grid Size Selector */}
          {uploadedImage && (
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <label className="font-bold text-foreground text-lg">
                {t('puzzle.difficulty')}:
              </label>
              <div className="flex gap-2">
                {[3, 4, 5].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (uploadedImage) createPuzzle(uploadedImage, size);
                    }}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      gridSize === size
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border-2 text-foreground hover:bg-primary/20'
                    }`}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Puzzle Canvas */}
          {uploadedImage && (
            <div className="flex flex-col items-center gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
                {/* Original Image Preview */}
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {t('puzzle.original')}
                  </h3>
                  <canvas
                    ref={previewCanvasRef}
                    className="border-4 border-muted rounded-xl block w-full"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </div>

                {/* Puzzle Canvas */}
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {t('puzzle.solve')}
                  </h3>
                  <div className="relative w-full">
                    <canvas
                      ref={canvasRef}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className="border-4 border-primary rounded-xl cursor-grab active:cursor-grabbing block w-full touch-none"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        imageRendering: 'crisp-edges'
                      }}
                    />

                    {/* Floating dragged piece */}
                    {isDragging && draggedPieceIndex !== null && pieces[draggedPieceIndex] && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: dragPosition.x - dragOffset.x,
                          top: dragPosition.y - dragOffset.y,
                          width: canvasSize / gridSize,
                          height: canvasSize / gridSize,
                          transform: 'scale(1.1)',
                          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                          zIndex: 1000,
                        }}
                      >
                        <canvas
                          width={canvasSize / gridSize}
                          height={canvasSize / gridSize}
                          ref={(canvas) => {
                            if (canvas && pieces[draggedPieceIndex]?.imageData) {
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.putImageData(pieces[draggedPieceIndex].imageData!, 0, 0);
                                // Draw highlight border
                                ctx.strokeStyle = '#facc15';
                                ctx.lineWidth = 4;
                                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                              }
                            }
                          }}
                          className="rounded-lg"
                          style={{ imageRendering: 'crisp-edges' }}
                        />
                      </div>
                    )}

                    {showCelebration && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
                          <Check size={64} className="text-green-500 mx-auto mb-4" />
                          <p className="text-2xl font-bold text-green-600">
                            {t('puzzle.complete')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <button
                  onClick={handleNewImage}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-bold text-lg
                           hover:bg-secondary/90 transition-all shadow-md hover:shadow-lg
                           hover:scale-105 active:scale-95 border-2 border-secondary-foreground/50
                           flex items-center gap-2"
                >
                  <Upload size={20} />
                  {t('puzzle.newImage')}
                </button>

                <button
                  onClick={handleReset}
                  className="bg-destructive text-destructive-foreground px-6 py-3 rounded-xl font-bold text-lg
                           hover:bg-destructive/90 transition-all shadow-md hover:shadow-lg
                           hover:scale-105 active:scale-95 border-2 border-destructive-foreground/50
                           flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  {t('puzzle.reset')}
                </button>
              </div>

              {/* Instructions */}
              <div className="bg-primary/10 border-2 border-primary rounded-xl p-4 max-w-2xl">
                <p className="text-foreground text-center">
                  {t('puzzle.instructions')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
