import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexFormula from "../../../../../utils/latex-formula";
import "./least-squares.scss";

export default function LeastSquares() {
  const svgRef = useRef();
  const coordinateSystemRef = useRef();

  const [dataPoints, setDataPoints] = useState([
    {
      x: -0.89,
      y: 0.27,
      t: 1,
    },
    {
      x: -0.78,
      y: 0.38,
      t: 1,
    },
    {
      x: -0.84,
      y: 0.2,
      t: 1,
    },
    {
      x: -0.78,
      y: 0.29,
      t: 1,
    },
    {
      x: -0.76,
      y: 0.05,
      t: -1,
    },
    {
      x: -0.7,
      y: 0.2,
      t: -1,
    },
    {
      x: -0.66,
      y: 0.12,
      t: -1,
    },
    {
      x: -0.61,
      y: 0.23,
      t: -1,
    },
  ]);
  const [classValue, setClassValue] = useState(-1);
  const maxPoints = 12;
  const decisionBoundaryRef = useRef();

  const xScale = d3.scaleLinear().domain([-1, 1]).range([5, 1000]);
  const yScale = d3.scaleLinear().domain([-0.5, 0.5]).range([495, 0]);

  // Shows the color scale for the error heatmap
  const interpolateColorArray = [];
  for (let i = 0; i < 100; i++) {
    interpolateColorArray.push(i / 100);
  }
  const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, 1]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 495, 5, coordinateSystemRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
    plotLeastSquaresClassification();
  }, [dataPoints, classValue]);

  function drawCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat((d) => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5);

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5);
  }

  function clickToAddPoints() {
    const svg = d3.select(svgRef.current);
    svg.on("mousemove", (event) => {
      const classPoints = dataPoints.filter((point) => point.t === classValue);
      if (classPoints.length >= maxPoints) {
        svg.style("cursor", "not-allowed");
      } else {
        svg.style("cursor", "pointer");
      }
    });

    svg.on("click", (event) => {
      setDataPoints((prev) => {
        const classPoints = prev.filter((point) => point.t === classValue);
        if (classPoints.length >= maxPoints) {
          return prev;
        }
        const [clickX, clickY] = d3.pointer(event, svg.node());
        const xValue = xScale.invert(clickX);
        const yValue = yScale.invert(clickY);
        return [...prev, { x: xValue, y: yValue, t: classValue }];
      });
    });
  }

  function plotHeatmap(w) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.05);
    const y = d3.range(yScale.domain()[0], yScale.domain()[1], 0.05);
    const vectorNorm = Math.sqrt(Math.pow(w[0][0], 2) + Math.pow(w[1][0], 2));
    const errorValues = [];

    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        const error = Math.pow((w[0][0] * x[i] + w[1][0] * y[j] + w[2][0]) / vectorNorm, 2);
        errorValues.push({
          x: x[i],
          y: y[j],
          error: error,
        });
      }
    }

    const maxError = d3.max(errorValues, (d) => d.error);
    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, maxError]);
    const svgWidth = 995;
    const svgHeight = 495;
    const rectWidth = svgWidth / x.length;
    const rectHeight = svgHeight / y.length;

    coordinateSystemRef.current.selectAll(".least-squares-error-heatmap").remove();

    const heatmapRects = coordinateSystemRef.current
      .selectAll(".least-squares-error-heatmap")
      .data(errorValues)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("class", "least-squares-error-heatmap")
      .attr("stroke-width", "1")
      .attr("fill", (d) => colorScale(d.error))
      .lower();
  }

  function plotDecisionBoundary(w) {
    const decisionBoundary = (x) => -(w[2][0] + w[0][0] * x) / w[1][0];

    const yMin = yScale.domain()[0];
    const yMax = yScale.domain()[1];

    const clampLineY = (x, y) => {
      if (y < yMin) {
        return { x: (yMin * -w[1][0] - w[2][0]) / w[0][0], y: yMin };
      } else if (y > yMax) {
        return { x: (yMax * -w[1][0] - w[2][0]) / w[0][0], y: yMax };
      }
      return { x, y };
    };

    let lineStart = clampLineY(-1, decisionBoundary(-1));
    let lineEnd = clampLineY(1, decisionBoundary(1));

    const lineData = [{ start: lineStart, end: lineEnd }];

    const lines = coordinateSystemRef.current.selectAll(".least-squares-interactive-decision-boundary").data(lineData);

    lines
      .enter()
      .append("line")
      .attr("class", "least-squares-interactive-decision-boundary")
      .attr("x1", (d) => xScale(d.start.x))
      .attr("y1", (d) => yScale(d.start.y))
      .attr("x2", (d) => xScale(d.start.x))
      .attr("y2", (d) => yScale(d.start.y))
      .merge(lines)
      .transition()
      .duration(100)
      .attr("x1", (d) => xScale(d.start.x))
      .attr("y1", (d) => yScale(d.start.y))
      .attr("x2", (d) => xScale(d.end.x))
      .attr("y2", (d) => yScale(d.end.y));

    lines.exit().remove();
  }

  function plotLeastSquaresClassification() {
    const hasPositive = dataPoints.some((point) => point.t === -1);
    const hasNegative = dataPoints.some((point) => point.t === 1);
    if (!hasPositive || !hasNegative) return;

    const X = dataPoints.map((d) => [d.x, d.y, 1]);
    const t = dataPoints.map((d) => [d.t]);
    const regularization = 1e-10;

    let XTX = numeric.dot(numeric.transpose(X), X);
    for (let i = 0; i < XTX.length; i++) {
      XTX[i][i] += regularization;
    }

    const pseudoInverse = numeric.dot(numeric.inv(XTX), numeric.transpose(X));
    const w = numeric.dot(pseudoInverse, t);

    plotHeatmap(w);
    plotDecisionBoundary(w);
  }

  function plotPointOnAxis() {
    const circles = coordinateSystemRef.current.selectAll("circle").data(dataPoints);

    circles
      .enter()
      .append("circle")
      .merge(circles)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", (d) => (d.t === -1 ? "least-squares-class-negative" : "least-squares-class-positive"))
      .attr("r", 12);

    circles.exit().remove();
  }

  function clear() {
    setDataPoints([]);
    coordinateSystemRef.current.selectAll("circle").remove();
    if (decisionBoundaryRef.current) {
      decisionBoundaryRef.current.remove();
    }
    coordinateSystemRef.current.selectAll(".least-squares-error-heatmap").remove();
    d3.selectAll(".least-squares-interactive-decision-boundary").remove();
  }

  return (
    <>
      <div className="centered-text-container" style={{ opacity: 0.5 }}>
        {latexFormula(
          `\\underset{\\vec{w}}{\\text{argmin}} \\; E(\\vec{w}) = \\underset{\\vec{w}}{\\text{argmin}}  \\left(\\frac{1}{2} \\sum_{n=1}^N ({y(\\vec{x}_n)} - t_n)^2\\right) = \\vec{w}^* =  (X^{\\top}X)^{-1}X^{\\top}\\vec{t} = X^\\dagger \\vec{t}`
        )}
      </div>

      <div className="centered-text-container">
        {latexFormula(`y(\\vec{x}) = {\\vec{w}^*}^\\top\\vec{x} = \\vec{t}^{\\top} (X^\\dagger)^{\\top}\\vec{x}`)}
      </div>

      <div className="error-range-container">
        <div className="error-range">
          {interpolateColorArray.map((percentage, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                backgroundColor: colorScale(percentage),
              }}
            />
          ))}
        </div>
        <div className="latex-overlay">{latexFormula(`$E(y(\\vec{x};\\vec{w}))$`)}</div>
      </div>

      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="change-class-button">
        <svg onClick={() => setClassValue(classValue === -1 ? 1 : -1)}>
          <circle
            cx="20"
            cy="20"
            r="15"
            className={classValue === -1 ? "least-squares-class-negative" : "least-squares-class-positive"}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </svg>
        <strong>Change class</strong>
      </div>

      <div className="clear-button">
        <svg
          width="40"
          height="40"
          onClick={() => clear()}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <line x1="10" y1="10" x2="30" y2="30" stroke="red" strokeWidth="4" />
          <line x1="10" y1="30" x2="30" y2="10" stroke="red" strokeWidth="4" />
        </svg>
        <strong>Clear</strong>
      </div>
    </>
  );
}
