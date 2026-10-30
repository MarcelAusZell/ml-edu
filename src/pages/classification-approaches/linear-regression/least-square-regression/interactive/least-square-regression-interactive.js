import { useState, useRef, useEffect } from "react";
import "./least-square-regression-interactive.scss";
import latexFormula from "../../../../../utils/latex-formula";

import * as d3 from "d3";
import numeric from "numeric";

export default function LeastSquareRegressionInteractive() {
  const svgRef = useRef();
  const pathRef = useRef(null);
  const coordinateSystemRef = useRef();
  const [polyDegree, setPolyDegree] = useState(0);
  const [RMSE, setRMSE] = useState(0);

  const dataPoints = [
    { x: 0.175, y: 0.29 },
    { x: 0.904, y: 0.825 },
    { x: 1.856, y: 0.922 },
    { x: 2.78, y: 0.509 },
    { x: 3.538, y: -0.626 },
    { x: 4.608, y: -0.866 },
    { x: 5.455, y: -0.635 },
    { x: 6.088, y: -0.081 },
    { x: 6.658, y: 0.527 },
    { x: 1.537, y: 1.147 },
  ];

  const xScale = d3.scaleLinear().domain([0, 7]).range([5, 1000]);
  const yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([495, 0]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 495, 5, coordinateSystemRef);
    drawPolynomial();
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    const weights = calculateRegressionLine(dataPoints);

    updateRegressionLine(weights);
    updateVerticalLinesToRegression(weights);
  }, [dataPoints, polyDegree]);

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

  function drawPolynomial() {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map((x) => Math.sin(x));

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    coordinateSystemRef.current
      .append("path")
      .datum(x.map((d, i) => ({ x: d, y: y[i] })))
      .attr("d", line)
      .attr("class", "original-regression-polynomial");
  }

  function plotPointOnAxis() {
    const points = coordinateSystemRef.current
      .selectAll("circle")
      .data(dataPoints, (d) => `${d.x},${d.y}`);
    points.exit().remove();

    points
      .enter()
      .append("circle")
      .merge(points)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", "linear-regression-point")
      .attr("r", 10);
  }

  function rootMeanSquareError(weights) {
    const error = dataPoints.reduce((acc, { x, y }) => {
      const predictedY = weights.reduce((sum, weight, idx) => sum + weight * Math.pow(x, idx), 0);
      return acc + Math.pow(y - predictedY, 2);
    }, 0);

    const rmse = Math.sqrt(error / dataPoints.length);
    return isNaN(rmse) ? 0 : rmse;
  }

  function calculateRegressionLine(dataPoints) {
    if (dataPoints.length < 2) return;

    const X = dataPoints.map(({ x }) => generateBasisFunctions(x, polyDegree));
    const t = dataPoints.map(({ y }) => [y]);

    const XT = numeric.transpose(X);
    const XTX = numeric.dot(XT, X);
    const pseudoInverse = numeric.dot(numeric.inv(XTX), XT);
    const weights = numeric.dot(pseudoInverse, t);

    setRMSE(rootMeanSquareError(weights));

    return weights;
  }

  function updateRegressionLine(weights) {
    const start = xScale.domain()[0];
    const end = xScale.domain()[1];
    const xValues = d3.range(start, end, 0.005);

    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z[0] };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    if (!pathRef.current) {
      pathRef.current = coordinateSystemRef.current
        .append("path")
        .attr("class", "lq-with-basis-decision-boundary");
    }

    pathRef.current
      .datum(decisionBoundary)
      .transition()
      .ease(d3.easeBackOut)
      .duration(200)
      .attr("d", line);
  }

  function updateVerticalLinesToRegression(weights) {
    const leastSquareRegressionLine = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const verticalLines = coordinateSystemRef.current
      .selectAll(".vertical-line-to-linear-regression-line")
      .data(dataPoints);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-line-to-linear-regression-line")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4")
      .merge(verticalLines)
      .transition()
      .ease(d3.easeBackOut)
      .duration(200)
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(leastSquareRegressionLine(d.x)));
  }

  function generateBasisFunctions(x, degree) {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      basisFunctions.push(Math.pow(x, i));
    }
    return basisFunctions;
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="setting-container-slider">
        {latexFormula(`$\\text{RMSE}: ${RMSE.toFixed(2)} $`)}
        {latexFormula(`$\\text{M}: ${polyDegree} $`)}

        <input
          className="form-range"
          type="range"
          min="0"
          max="9"
          step="1"
          value={polyDegree}
          onChange={(e) => setPolyDegree(parseFloat(e.target.value))}
        />
      </div>
    </>
  );
}
