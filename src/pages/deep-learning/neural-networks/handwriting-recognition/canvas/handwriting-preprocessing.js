import React, { useEffect, useRef, useState, useContext } from "react";
import useDrawingCanvas from "./canvas";
import "./handwriting-preprocessing.scss";

const PixelImageContext = React.createContext();

export function usePixelImage() {
  return useContext(PixelImageContext);
}

// Pre-Processing der Zeichnung gemäß https://yann.lecun.com/exdb/mnist/
export default function HandwritingRecognizer({ recognizerComponent: RecognizerComponent, lineWidth, canvasSizes }) {
  const canvasRef = useRef(null);
  const boundingBoxCanvasRef = useRef(null);
  const centeredImageCanvasRef = useRef(null);
  const pixelCanvasRef = useRef(null);

  const [strokes, setStrokes] = useState([]);
  const [pixelImage, setPixelImage] = useState(Array(784).fill(0));
  const [showPreProcessing, setShowPreProcessing] = useState(false);
  const [isPreProcessingDisabled, setIsPreProcessingDisabled] = useState(false);

  useDrawingCanvas(canvasRef, setStrokes, lineWidth);

  // Überprüfung der Fenstergröße für die Anzeige des Pre-Processing
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
        setShowPreProcessing(false);
        setIsPreProcessingDisabled(true);
      } else {
        setIsPreProcessingDisabled(false);
      }
    }
    window.addEventListener("resize", handleResize);
    // Initialer Check für die Größe des Browserfensters
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function drawBoundingBox() {
    // Filtern der Koordinatenwerte aus den Strokes
    const strokesFlatten = strokes.flat();
    const xValues = strokesFlatten.map((stroke) => stroke.x);
    const yValues = strokesFlatten.map((stroke) => stroke.y);

    // Berechnung der kleinsten und größten Koordinatenwerte für die Bounding Box
    const minX = Math.min(...xValues) - lineWidth / 2;
    const maxX = Math.max(...xValues) + lineWidth / 2;
    const minY = Math.min(...yValues) - lineWidth / 2;
    const maxY = Math.max(...yValues) + lineWidth / 2;

    // Bounding Box als minimalstes Quadrat um die Zeichnung
    const boundingBoxHeight = maxY - minY;
    const boundingBoxWidth = maxX - minX;
    const maxSide = Math.max(boundingBoxHeight, boundingBoxWidth);

    // Kopieren des Zeichnungs-Canvas auf das Bounding Box Canvas
    const boundingBoxCanvas = boundingBoxCanvasRef.current;
    const ctx = boundingBoxCanvas.getContext("2d", { willReadFrequently: true });

    ctx.clearRect(0, 0, boundingBoxCanvas.width, boundingBoxCanvas.height);
    ctx.drawImage(
      canvasRef.current,
      // Canvas vom dem die Zeichnung kopiert wird
      minX,
      minY,
      maxSide,
      maxSide,
      // Canvas auf das die Zeichnung kopiert wird
      0,
      0,
      boundingBoxCanvas.width,
      boundingBoxCanvas.height
    );
  }

  function drawCenteredImage() {
    const boundingBoxCanvas = boundingBoxCanvasRef.current;
    const boundingBoxCtx = boundingBoxCanvas.getContext("2d", { willReadFrequently: true });

    // Array an Pixelinformationen des Bounding Box Canvas
    const boundingBoxImageData = boundingBoxCtx.getImageData(
      0,
      0,
      boundingBoxCanvas.width,
      boundingBoxCanvas.height
    ).data;

    // Berechnung des Schwerpunkts der Zeichnung
    let sumX = 0;
    let sumY = 0;
    let pixelCount = 0;

    for (let y = 0; y < boundingBoxCanvas.height; y++) {
      for (let x = 0; x < boundingBoxCanvas.width; x++) {
        const pixelIndex = (y * boundingBoxCanvas.width + x) * 4;
        const isFilledPixel = boundingBoxImageData[pixelIndex + 3] > 0;
        if (isFilledPixel) {
          sumX += x;
          sumY += y;
          pixelCount++;
        }
      }
    }

    const xCenterOfMass = sumX / pixelCount;
    const yCenterOfMass = sumY / pixelCount;

    // KOMMENTARE WEG MACHEN UM DEN SCHWERPUNKT ZU VISUALISIEREN
    // if (showPreProcessing) {
    //   boundingBoxCtx.fillStyle = "red";
    //   boundingBoxCtx.beginPath();
    //   boundingBoxCtx.arc(xCenterOfMass, yCenterOfMass, 5, 0, 2 * Math.PI);
    //   boundingBoxCtx.fill();
    // }

    const centeredCanvas = centeredImageCanvasRef.current;
    const centeredCtx = centeredCanvas.getContext("2d", { willReadFrequently: true });

    // MNIST Skalierungsfaktor für die Zentrierung
    const mnistScaleFactor = 1 - 8 / 28;

    // Offeset Berechnung um Schwerpunkt in die Mitte des Centered Canvas zu verschieben
    const scaledXCenter = xCenterOfMass * mnistScaleFactor;
    const scaledYCenter = yCenterOfMass * mnistScaleFactor;
    const offsetX = centeredCanvas.width / 2 - scaledXCenter;
    const offsetY = centeredCanvas.height / 2 - scaledYCenter;

    centeredCtx.fillRect(0, 0, centeredCanvas.width, centeredCanvas.height);

    // Kopieren des Bounding Box Canvas auf das Centered Canvas
    centeredCtx.drawImage(
      boundingBoxCanvas,
      offsetX,
      offsetY,
      boundingBoxCanvas.width * mnistScaleFactor,
      boundingBoxCanvas.height * mnistScaleFactor
    );
  }

  function drawPixelImage() {
    const pixelCanvasCtx = pixelCanvasRef.current.getContext("2d", { willReadFrequently: true });
    const centeredCanvas = centeredImageCanvasRef.current;
    pixelCanvasCtx.drawImage(centeredCanvas, 0, 0, 28, 28);

    // Array an Pixelinformationen des Pixel Canvas
    const pixelData = pixelCanvasCtx.getImageData(0, 0, 28, 28).data;
    const pixels = [];

    // Berechnung der Grauwerte der Pixel
    for (let i = 0; i < pixelData.length; i += 4) {
      const pixel = [pixelData[i], pixelData[i + 1], pixelData[i + 2]];
      pixels.push(pixel);
    }
    const grayscaleValues = pixels.map(([r, g, b]) => (r + g + b) / 3);
    setPixelImage(grayscaleValues);
  }

  // Höhere Auflösung für die Pixelbilder durch Div-Elemente
  function makePixelImage(grayscaleValues) {
    const pixels = [];
    const size = Math.sqrt(784);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const value = grayscaleValues[i * size + j];
        const color = `rgb(${value}, ${value}, ${value})`;
        pixels.push(<div key={`${i}-${j}`} style={{ backgroundColor: color, border: `0.5px solid ${color}` }} />);
      }
    }
    return (
      <div
        className="pixel-image"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
          width: canvasSizes,
          height: canvasSizes,
        }}
      >
        {pixels}
      </div>
    );
  }

  // function pixelImageCoordinantes() {
  //   const imgDim = Math.sqrt(784);
  //   const pixels = [];
  //   for (let i = 0; i < imgDim; i++) {
  //     for (let j = 0; j < imgDim; j++) {
  //       const pixelIndex = i * imgDim + j;
  //       if (pixelImage[pixelIndex] !== 0) {
  //         pixels.push([j + 1, i + 1, pixelImage[pixelIndex]]);
  //       }
  //     }
  //   }
  //   console.log(pixels);
  // }

  useEffect(() => {
    if (!strokes.length > 0) return;
    drawBoundingBox();
    drawCenteredImage();
    drawPixelImage();
    // pixelImageCoordinantes();
  }, [strokes, showPreProcessing]);

  function clearCanvas() {
    const clearCanvasElement = (canvas) => {
      if (canvas) {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    clearCanvasElement(canvasRef.current);
    clearCanvasElement(boundingBoxCanvasRef.current);
    clearCanvasElement(centeredImageCanvasRef.current);
    clearCanvasElement(pixelCanvasRef.current);
    setStrokes([]);
    setPixelImage(Array(784).fill(0));
  }

  return (
    <PixelImageContext.Provider value={pixelImage}>
      <div className="handwriting-recognizer-container">
        <div className="handwriting-recognizer-button-container">
          <div className="button-group">
            <button onClick={clearCanvas}>
              <span>Clear</span>
            </button>
            <button onClick={() => setShowPreProcessing(!showPreProcessing)} disabled={isPreProcessingDisabled}>
              <span>{showPreProcessing ? "Hide Pre-Processing" : "Show Pre-Processing"}</span>
            </button>
          </div>
        </div>
        <div className="canvas-container" style={{ gap: "25px" }}>
          <div className="canvas-element">
            <canvas className="drawing-canvas" ref={canvasRef} width={canvasSizes} height={canvasSizes} />{" "}
            <span className="draw-here-text">Draw here!</span>
          </div>
          <div className="canvas-element" style={{ display: showPreProcessing ? "" : "none" }}>
            <canvas
              ref={boundingBoxCanvasRef}
              width={canvasSizes}
              height={canvasSizes}
              style={{ display: showPreProcessing ? "block" : "none" }}
            />
            <span>Bounding box</span>
          </div>
          <div className="canvas-element" style={{ display: showPreProcessing ? "" : "none" }}>
            <canvas
              ref={centeredImageCanvasRef}
              width={canvasSizes}
              height={canvasSizes}
              style={{ display: showPreProcessing ? "block" : "none" }}
            />
            <span>Centered</span>
          </div>
          <div className="canvas-element" style={{ display: "none" }}>
            <canvas
              ref={pixelCanvasRef}
              width={28}
              height={28}
              style={{
                width: `${canvasSizes}px`,
                height: `${canvasSizes}px`,
                display: showPreProcessing ? "block" : "none",
              }}
            />
            <span>Pixelimage</span>
          </div>
          <div className="canvas-element">
            <div className="pixel-image">{makePixelImage(pixelImage)}</div> <span>Model input</span>
          </div>
        </div>
        <RecognizerComponent />
      </div>
    </PixelImageContext.Provider>
  );
}
