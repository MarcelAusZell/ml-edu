import { useEffect, useRef } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import "./introduction-card-logistic-regression.scss";

export default function IntroductionCardLogisticRegression() {
  const svgRef = useRef();

  const dataPoints0 = [
    { x: 40, y: 13, label: 0 },
    { x: 35, y: 10, label: 0 },
    { x: 55, y: 14, label: 0 },
    { x: 45, y: 13, label: 0 },
    { x: 25, y: 7, label: 0 },
    { x: 32, y: 5, label: 0 },
    { x: 40, y: 8, label: 0 },
    { x: 50, y: 10, label: 0 },
    { x: 60, y: 12, label: 0 },
    { x: 30, y: 22, label: 1 },
    { x: 38, y: 24, label: 1 },
    { x: 45, y: 25, label: 1 },
    { x: 50, y: 28, label: 1 },
    { x: 60, y: 24, label: 1 },
    { x: 55, y: 26, label: 1 },
    { x: 32, y: 28, label: 1 },
    { x: 41, y: 27.5, label: 1 },
  ];

  const dataPoints1 = [
    { x: 10, y: 10, label: 0 },
    { x: 11, y: 18, label: 0 },
    { x: 12, y: 25, label: 0 },
    { x: 15, y: 12, label: 0 },
    { x: 18, y: 18, label: 0 },
    { x: 20, y: 7, label: 0 },
    { x: 23, y: 13, label: 0 },
    { x: 25, y: 20, label: 0 },
    { x: 25, y: 20, label: 0 },
    { x: 35, y: 25, label: 1 },
    { x: 39, y: 22, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
  ];

  const dataPoints2 = [
    { x: 10, y: 10, label: 0 },
    { x: 11, y: 18, label: 0 },
    { x: 12, y: 25, label: 0 },
    { x: 15, y: 12, label: 0 },
    { x: 18, y: 18, label: 0 },
    { x: 20, y: 7, label: 0 },
    { x: 23, y: 13, label: 0 },
    { x: 25, y: 20, label: 0 },
    { x: 25, y: 20, label: 0 },
    { x: 35, y: 25, label: 1 },
    { x: 39, y: 22, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
    { x: 80, y: 26, label: 1 },
    { x: 85, y: 23, label: 1 },
    { x: 88, y: 27, label: 1 },
  ];

  const dataSets = [dataPoints0, dataPoints1, dataPoints2];
  let currentIndex = 0;

  useEffect(() => {
    const updateAndPlot = () => {
      currentIndex = (currentIndex + 1) % dataSets.length;
      const currentData = dataSets[currentIndex];
      updateDataPoints(currentData);
      plotSecondOrderLogisticRegression(currentData);
    };
    updateAndPlot();
    const interval = setInterval(updateAndPlot, 15000);
    return () => clearInterval(interval);
  }, []);

  function updateDataPoints(data) {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 2)
            .attr("fill", (d) => (d.label === 0 ? "orange" : "steelblue")),

        (update) =>
          update
            .transition()
            .duration(5000)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 2)
            .attr("fill", (d) => (d.label === 0 ? "orange" : "steelblue")),
        (exit) => exit.remove().transition().duration(5000).attr("r", 0).attr("fill", "red").remove()
      );
  }

  function tanh(x) {
    return Math.tanh(x);
  }

  function tanhDerivative(x) {
    const cosh = Math.cosh(x);
    return 1 / (cosh * cosh);
  }

  function plotSecondOrderLogisticRegression(dataPoints) {
    const X = dataPoints.map((point) => [point.x, point.y, 1]);
    const t = dataPoints.map((d) => (d.label === 0 ? -1 : d.label));

    let weights = [0.1, 0.1, 0.1];
    const maxIter = 100;
    const tol = 1e-5;
    const regularization = 1e-10;

    for (let i = 0; i < maxIter; i++) {
      const linearOutput = numeric.dot(X, weights);
      const predictions = linearOutput.map(tanh);
      const residuals = numeric.sub(t, predictions);
      const W = numeric.diag(linearOutput.map(tanhDerivative));

      const WX = numeric.dot(W, X);
      let XWX = numeric.dot(numeric.transpose(X), WX);

      for (let j = 0; j < XWX.length; j++) {
        XWX[j][j] += regularization;
      }

      const XWX_inv = numeric.inv(XWX);

      const XW = numeric.dot(numeric.transpose(X), W);
      const XWresiduals = numeric.dot(XW, residuals);
      const deltaWeights = numeric.dot(XWX_inv, XWresiduals);
      weights = numeric.add(weights, deltaWeights);

      if (numeric.norm2(deltaWeights) < tol) {
        break;
      }
    }

    const decisionBoundary = (x) => (-weights[2] - weights[0] * x) / weights[1];

    const start = { x: 0, y: decisionBoundary(0) };
    const end = { x: 100, y: decisionBoundary(100) };

    const svg = d3.select(svgRef.current);

    const line = svg.selectAll("line").data([null]);

    line.join(
      (enter) =>
        enter
          .append("line")
          .attr("class", "linear-discriminants-line-introduction-card")
          .attr("x1", 0)
          .attr("y1", decisionBoundary(0))
          .attr("x2", 100)
          .attr("y2", decisionBoundary(100)),
      (update) =>
        update
          .transition()
          .duration(5000)
          .attr("x1", 0)
          .attr("y1", decisionBoundary(0))
          .attr("x2", 100)
          .attr("y2", decisionBoundary(100))
    );
  }

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Logistic Regression</div>
    </div>
  );
}
