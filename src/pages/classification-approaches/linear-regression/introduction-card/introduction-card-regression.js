import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-regression.scss";
import numeric from "numeric";

export default function IntroductionCardRegression() {
  const svg = useRef();
  const svgRef = useRef();
  const polyDegrees = [0, 1, 2, 3, 4];
  const cycleInterval = 5000;

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
    plotDataPoints();

    let currentDegreeIndex = 0;
    plotRegressionPath(dataPoints, polyDegrees[currentDegreeIndex]);

    const intervalId = setInterval(() => {
      currentDegreeIndex = (currentDegreeIndex + 1) % polyDegrees.length;
      plotRegressionPath(dataPoints, polyDegrees[currentDegreeIndex]);
    }, cycleInterval);
    return () => clearInterval(intervalId);
  }, []);

  const xScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([30, 0]);

  const dataPoints = [
    { x: 0.5, y: 5 },
    { x: 1.25, y: 8 },
    { x: 2.5, y: 9 },
    { x: 4, y: 5 },
    { x: 5, y: 2 },
    { x: 6, y: 1 },
    { x: 7.25, y: 3 },
    { x: 8.5, y: 2.5 },
    { x: 9.5, y: 6 },
  ];

  function plotDataPoints() {
    const points = svg.current
      .selectAll(".data-point-introduction-card-regression")
      .data(dataPoints);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-introduction-card-regression")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 2);
  }

  function plotRegressionPath(dataPoints, polyDegree, showVerticalLines = true) {
    const weights = calculateRegressionLine(dataPoints, polyDegree);
    updateRegressionLine(weights, polyDegree);
    if (showVerticalLines) updateVerticalLinesToRegression(dataPoints, weights, polyDegree);
  }

  function calculateRegressionLine(dataPoints, polyDegree) {
    const X = dataPoints.map(({ x }) => generateBasisFunctions(x, polyDegree));
    const t = dataPoints.map(({ y }) => [y]);

    while (X.length <= X[0].length) {
      X.push(
        Array(X[0].length)
          .fill(0)
          .map(() => Math.random() * 1e-10)
      );
      t.push([0]);
    }

    const { U, S, V } = numeric.svd(X);

    const S_inv = numeric.diag(S.map((s) => (s > 1e-10 ? 1 / s : 0)));
    const pseudoInverse = numeric.dot(numeric.dot(V, S_inv), numeric.transpose(U));
    const weights = numeric.dot(pseudoInverse, t);

    return weights;
  }

  function updateRegressionLine(weights, polyDegree) {
    const start = xScale.domain()[0];
    const end = xScale.domain()[1];
    const xValues = d3.range(start, end, 0.01);

    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z[0] };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let path = svg.current.selectAll(".regression-path-introduction").data([decisionBoundary]);
    path.transition().duration(2000).attr("d", line);
    path.enter().append("path").attr("class", "regression-path-introduction").attr("d", line);
  }

  function updateVerticalLinesToRegression(dataPoints, weights, polyDegree) {
    const leastSquareRegressionLine = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const verticalLines = svg.current
      .selectAll(".vertical-lines-to-regression-path-introduction")
      .data(dataPoints);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-lines-to-regression-path-introduction")
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(leastSquareRegressionLine(d.x)))
      .merge(verticalLines)
      .transition()
      .duration(2000)
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
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Linear Regression</div>
    </div>
  );
}
