import { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import "./2D-polynomial-basis-function.scss";

export default function PolynomialBasisFunction2D() {
  const svgRef = useRef();
  const coordinateSystemRef = useRef();

  const maxPoints = 10;
  const [dataPoints, setDataPoints] = useState([
    { x: -0.5, y: -0.5, t: -1 },
    { x: -0.5, y: 0.5, t: 1 },
    { x: 0.5, y: -0.5, t: 1 },
    { x: 0.5, y: 0.5, t: -1 },
  ]);
  const [classValue, setClassValue] = useState(-1);
  const decisionBoundaryActivatedRef = useRef();
  const [polyDegree, setPolyDegree] = useState(2);

  const xScale = d3.scaleLinear().domain([-1, 1]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([-1, 1]).range([450, 50]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 450, 50, coordinateSystemRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
    plotLSQActivatedWithPolynomialBasis();
  }, [dataPoints, classValue, polyDegree]);

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
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

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
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");
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

  const plotPointOnAxis = useCallback(() => {
    const points = coordinateSystemRef.current.selectAll("circle").data(dataPoints, (d) => `${d.x},${d.y}`);

    points.exit().remove();

    points
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", (d) => (d.t === -1 ? "lstsq-2D-basis-negative" : "lstsq-2D-basis-positive"))
      .attr("r", 9);

    points
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", (d) => (d.t === -1 ? "lstsq-2D-basis-negative" : "lstsq-2D-basis-positive"))
      .attr("r", 9);
  }, [dataPoints, xScale, yScale]);

  const plotLSQActivatedWithPolynomialBasis = useCallback(() => {
    // Check if both classes are present
    if (!dataPoints.some((point) => point.t === 1) || !dataPoints.some((point) => point.t === -1)) return;

    // Prepare data
    const X = dataPoints.map((d) => generateBasisFunctions(d.x, d.y, polyDegree));
    const t = dataPoints.map((d) => d.t);

    let weights = new Array(X[0].length).fill(0.1);

    // Lernparameters
    const learningRate = 0.5;
    const maxIterations = 10000;
    const tolerance = 1e-5;

    // Function to calculate predictions and gradient
    const calculateGradient = (X, t, weights) => {
      const predictions = X.map((x) => Math.tanh(numeric.dot(x, weights)));
      const errors = numeric.sub(predictions, t);

      const gradient = X.reduce((grad, x, idx) => {
        const derivativeTanh = errors[idx] * (1 - Math.tanh(predictions[idx]) ** 2);
        return numeric.add(grad, numeric.mul(derivativeTanh, x));
      }, new Array(X[0].length).fill(0));

      return { gradient, predictions };
    };

    // Gradient-Descent for optimizing the weights
    for (let iter = 0; iter < maxIterations; iter++) {
      const { gradient } = calculateGradient(X, t, weights);
      weights = numeric.sub(weights, numeric.mul(learningRate, gradient));

      if (numeric.norm2(gradient) < tolerance) break;
    }

    // Decision boundary
    const decisionBoundary = (x, y) => {
      const phi = generateBasisFunctions(x, y, polyDegree);
      return numeric.dot(phi, weights);
    };

    const boundaryPoints = [];
    for (let x = -1; x <= 1; x += 0.005) {
      for (let y = -1; y <= 1; y += 0.005) {
        if (Math.abs(decisionBoundary(x, y)) < 0.05) {
          boundaryPoints.push({ x, y });
        }
      }
    }

    if (decisionBoundaryActivatedRef.current) decisionBoundaryActivatedRef.current.remove();
    decisionBoundaryActivatedRef.current = coordinateSystemRef.current
      .selectAll(".lst-db-activated-polynomial-basis-function")
      .data(boundaryPoints)
      .enter()
      .append("rect")
      .attr("class", "lst-db-activated-polynomial-basis-function")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y))
      .attr("height", 4)
      .attr("width", 4);
  }, [dataPoints, polyDegree, xScale, yScale]);

  const generateBasisFunctions = useCallback((x, y, degree) => {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      for (let j = 0; j <= degree - i; j++) {
        basisFunctions.push(Math.pow(x, i) * Math.pow(y, j));
      }
    }
    return basisFunctions;
  }, []);

  const clear = useCallback(() => {
    setDataPoints([]);
    coordinateSystemRef.current.selectAll("circle").remove();
    coordinateSystemRef.current.selectAll(".least-squares-error-heatmap").remove();
    if (decisionBoundaryActivatedRef.current) decisionBoundaryActivatedRef.current.remove();
  }, []);

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="poly-degree">
        <svg className="minus-button" onClick={() => setPolyDegree(Math.max(polyDegree - 1, 1))}>
          <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
        </svg>

        <span>M: {polyDegree}</span>

        <svg className="plus-button" onClick={() => setPolyDegree(Math.min(polyDegree + 1, 6))}>
          <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
          <line x1="20" y1="10" x2="20" y2="30" strokeWidth="4" />
        </svg>
      </div>

      <div className="setting-changer">
        <div className="change-class-button">
          <svg onClick={() => setClassValue(classValue === -1 ? 1 : -1)}>
            <circle
              cx="20"
              cy="20"
              r="15"
              className={classValue === -1 ? "lstsq-2D-basis-negative" : "lstsq-2D-basis-positive"}
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
      </div>
    </>
  );
}
