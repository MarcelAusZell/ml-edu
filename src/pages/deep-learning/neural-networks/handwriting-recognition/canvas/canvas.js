import { useEffect, useRef } from "react";

export default function useDrawingCanvas(canvasRef, setStrokes, lineWidth) {
  const isDrawing = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.strokeStyle = "white";

    function startDrawing(x, y) {
      isDrawing.current = true;
      lastPosition.current = { x, y }; 
      setStrokes((prevStrokes) => [...prevStrokes, [{ x, y }]]);
    }

    function draw(x, y) {
      if (!isDrawing.current) return;

      context.beginPath();
      context.moveTo(lastPosition.current.x, lastPosition.current.y);
      context.lineTo(x, y);
      context.stroke();

      lastPosition.current = { x, y };
      setStrokes((prevStrokes) => {
        const newStrokes = [...prevStrokes];
        const currentStroke = newStrokes[newStrokes.length - 1];
        if (currentStroke) {
          currentStroke.push({ x, y });
        }
        return newStrokes;
      });
    }

    function stopDrawing() {
      isDrawing.current = false;
    }

    function getOffsetPosition(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseDown(e) {
      if (e.button === 2) return; // Ignore right click
      const { x, y } = getOffsetPosition(e);
      startDrawing(x, y);
    }

    function handleMouseMove(e) {
      if (!isDrawing.current) return;
      const { x, y } = getOffsetPosition(e);
      draw(x, y);
    }

    function handleMouseUp(e) {
      if (e.button === 2) return; // Ignore right click
      stopDrawing();
    }

    function handleMouseLeave() {
      stopDrawing();
    }

    function handleTouchStart(e) {
      e.preventDefault(); // for touch devices it prevents scrolling/zooming/etc
      const touch = e.touches[0];
      const { x, y } = getOffsetPosition(touch);
      startDrawing(x, y);
    }

    function handleTouchMove(e) {
      e.preventDefault(); // for touch devices it prevents scrolling/zooming/etc
      const touch = e.touches[0];
      const { x, y } = getOffsetPosition(touch);
      draw(x, y);
    }

    function handleTouchEnd() {
      stopDrawing();
    }

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mouseenter", handleMouseUp); // Stop drawing on re-entry if mouse button is not down
    canvas.addEventListener("contextmenu", (e) => e.preventDefault()); // Prevent right-click menu
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    // Clean up event listeners on component unmount
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mouseenter", handleMouseUp);
      canvas.removeEventListener("contextmenu", (e) => e.preventDefault());
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
}
