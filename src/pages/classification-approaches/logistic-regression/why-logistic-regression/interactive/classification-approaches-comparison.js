import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import "./classification-approaches-comparison.scss";

export default function ClassificationApproachesComparison({ svgWidth, svgHeight }) {
  const svgRef = useRef();
  const xScaleLength = 960;
  const coordSystemLeastSquares = useRef();
  const coordSystemActivatedLeastSquares = useRef();
  const coordSystemLogisticRegression = useRef();

  const xScaleLR = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScaleLR = d3.scaleLinear().domain([0, 10]).range([160, 40]);
  const xScaleALQ = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScaleALQ = d3.scaleLinear().domain([0, 10]).range([320, 200]);
  const xScaleLQ = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScaleLQ = d3.scaleLinear().domain([0, 10]).range([480, 360]);

  const maxPoints = 12;
  const [dataPoints, setDataPoints] = useState([
    {
      x: 0.38,
      y: 6.86,
      t: 0,
    },
    {
      x: 0.39,
      y: 5.7,
      t: 0,
    },
    {
      x: 0.28,
      y: 6.36,
      t: 0,
    },
    {
      x: 0.53,
      y: 8.11,
      t: 0,
    },
    {
      x: 0.51,
      y: 6.78,
      t: 0,
    },
    {
      x: 0.55,
      y: 5.86,
      t: 0,
    },
    {
      x: 0.65,
      y: 7.36,
      t: 0,
    },
    {
      x: 1.13,
      y: 7.86,
      t: 1,
    },
    {
      x: 1.02,
      y: 6.2,
      t: 1,
    },
    {
      x: 0.9,
      y: 7.2,
      t: 1,
    },
    {
      x: 0.91,
      y: 6.03,
      t: 1,
    },
    {
      x: 1.17,
      y: 5.95,
      t: 1,
    },
    {
      x: 1.13,
      y: 7.2,
      t: 1,
    },
    {
      x: 1.54,
      y: 4.7,
      t: 1,
    },
  ]);
  const [classValue, setClassValue] = useState(0);

  useEffect(() => {
    drawCoordSystem(svgRef, xScaleLR, yScaleLR, 160, 40, coordSystemLogisticRegression);
    drawCoordSystem(svgRef, xScaleALQ, yScaleALQ, 320, 40, coordSystemActivatedLeastSquares);
    drawCoordSystem(svgRef, xScaleLQ, yScaleLQ, 480, 40, coordSystemLeastSquares);
    plotDescription(
      coordSystemLogisticRegression,
      xScaleLR,
      yScaleLR,
      "Logistic Regression - Binary Cross-Entropy-Error"
    );
    plotDescription(
      coordSystemActivatedLeastSquares,
      xScaleALQ,
      yScaleALQ,
      "Activated Least Squares - tanh as activation function"
    );
    plotDescription(coordSystemLeastSquares, xScaleLQ, yScaleLQ, "Least Squares - unactivated");
  }, []);

  useEffect(() => {
    clickToAddPoints();
    plotSecondOrderLogisticRegression();
    plotLeastSquaresWithTanh();
    plotLeastSquares();
  }, [dataPoints, classValue]);

  function plotDescription(coordSystem, xScale, yScale, text) {
    coordSystem.current
      .append("text")
      .attr("x", xScale(5))
      .attr("y", yScale(10.6))
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(text)
      .attr("class", "classification-approaches-description-text");
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
      const [clickX, clickY] = d3.pointer(event, svg.node());

      let xScale, yScale;
      if (clickY < 200) {
        xScale = xScaleLR;
        yScale = yScaleLR;
      } else if (clickY < 360) {
        xScale = xScaleALQ;
        yScale = yScaleALQ;
      } else {
        xScale = xScaleLQ;
        yScale = yScaleLQ;
      }

      const xValue = xScale.invert(clickX);
      const yValue = yScale.invert(clickY);

      setDataPoints((prev) => {
        const classPoints = prev.filter((point) => point.t === classValue);
        if (classPoints.length >= maxPoints) {
          return prev;
        }
        return [...prev, { x: xValue, y: yValue, t: classValue }];
      });
    });

    plotPointsOnAllAxes();
  }

  function plotPointsOnAllAxes() {
    plotPoints(coordSystemLogisticRegression.current, xScaleLR, yScaleLR);
    plotPoints(coordSystemActivatedLeastSquares.current, xScaleALQ, yScaleALQ);
    plotPoints(coordSystemLeastSquares.current, xScaleLQ, yScaleLQ);
  }

  function plotPoints(coordSystem, xScale, yScale) {
    const circles = coordSystem.selectAll("circle").data(dataPoints);
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", (d) =>
        d.t === 0 ? "classification-approaches-data-point-class-0" : "classification-approaches-data-point-class-1"
      )
      .attr("r", 5);
    circles.exit().remove();
  }

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
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.3)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.3)
      .style("font-size", "20px");
  }

  function clear() {
    setDataPoints([]);
    svgRef.current.querySelectorAll("circle").forEach((circle) => circle.remove());
    d3.select(".decision-boundary-logistic-regression").remove();
    d3.select(".decision-boundary-least-squares-tanh").remove();
    d3.select(".decision-boundary-least-squares").remove();
  }

  /* ---------------------------------------------------------------------------------------------------------------- */
  // Logistic regression
  function logisticSigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function plotSecondOrderLogisticRegression() {
    const hasClass0 = dataPoints.some((point) => point.t === 0);
    const hasClass1 = dataPoints.some((point) => point.t === 1);

    if (!hasClass0 || !hasClass1) return;

    const X = dataPoints.map((point) => [point.x, point.y, 1]);
    const t = dataPoints.map((point) => point.t);

    let weights = [0, 0, 0];

    const maxIterations = 10;
    const tolerance = 1e-6;
    const regularization = 1e-10;

    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = X.map((x) => logisticSigmoid(numeric.dot(x, weights)));
      const errors = numeric.sub(predictions, t);

      const R = numeric.diag(predictions.map((p) => p * (1 - p)));
      let Hessian = numeric.dot(numeric.dot(numeric.transpose(X), R), X);

      for (let j = 0; j < Hessian.length; j++) {
        Hessian[j][j] += regularization;
      }

      const gradient = numeric.dot(numeric.transpose(X), errors);

      const update = numeric.solve(Hessian, gradient);
      weights = numeric.sub(weights, update);

      if (numeric.norm2(update) < tolerance) {
        break;
      }
    }

    updateDecisionBoundary(
      coordSystemActivatedLeastSquares,
      weights,
      xScaleLR,
      yScaleLR,
      "decision-boundary-logistic-regression"
    );
  }

  // Least squares with tanh (activated linear discriminant)
  function tanh(x) {
    return Math.tanh(x);
  }

  function tanhDerivative(x) {
    const cosh = Math.cosh(x);
    return 1 / (cosh * cosh);
  }

  function plotLeastSquaresWithTanh() {
    const hasClass0 = dataPoints.some((point) => point.t === 0);
    const hasClass1 = dataPoints.some((point) => point.t === 1);

    if (!hasClass0 || !hasClass1) return;

    const X = dataPoints.map((point) => [point.x, point.y, 1]);
    const t = dataPoints.map((d) => (d.t === 0 ? -1 : d.t));

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

    updateDecisionBoundary(
      coordSystemActivatedLeastSquares,
      weights,
      xScaleALQ,
      yScaleALQ,
      "decision-boundary-least-squares-tanh"
    );
  }

  function plotLeastSquares() {
    const hasClass0 = dataPoints.some((point) => point.t === 0);
    const hasClass1 = dataPoints.some((point) => point.t === 1);
    if (!hasClass0 || !hasClass1) return;

    const X = dataPoints.map((d) => [d.x, d.y, 1]);
    const t = dataPoints.map((d) => [d.t === 0 ? -1 : d.t]);
    const regularization = 1e-10;

    let XTX = numeric.dot(numeric.transpose(X), X);
    for (let i = 0; i < XTX.length; i++) {
      XTX[i][i] += regularization;
    }

    const pseudoInverse = numeric.dot(numeric.inv(XTX), numeric.transpose(X));
    const weights = numeric.dot(pseudoInverse, t);

    const w = [weights[0][0], weights[1][0], weights[2][0]];

    updateDecisionBoundary(coordSystemLeastSquares, w, xScaleLQ, yScaleLQ, "decision-boundary-least-squares");
  }

  function updateDecisionBoundary(coordSystem, w, xScale, yScale, className) {
    const decisionBoundary = (x) => -(w[2] + w[0] * x) / w[1];

    const xMin = xScale.domain()[0];
    const xMax = xScale.domain()[1];
    const yMin = yScale.domain()[0];
    const yMax = yScale.domain()[1];

    const intersections = [];

    const yAtXMin = decisionBoundary(xMin);
    if (yAtXMin >= yMin && yAtXMin <= yMax) {
      intersections.push({ x: xMin, y: yAtXMin });
    }

    const yAtXMax = decisionBoundary(xMax);
    if (yAtXMax >= yMin && yAtXMax <= yMax) {
      intersections.push({ x: xMax, y: yAtXMax });
    }

    const xAtYMin = -(w[2] + w[1] * yMin) / w[0];
    if (xAtYMin >= xMin && xAtYMin <= xMax) {
      intersections.push({ x: xAtYMin, y: yMin });
    }

    const xAtYMax = -(w[2] + w[1] * yMax) / w[0];
    if (xAtYMax >= xMin && xAtYMax <= xMax) {
      intersections.push({ x: xAtYMax, y: yMax });
    }

    if (intersections.length < 2) return;
    intersections.sort((a, b) => a.x - b.x);

    const lineData = intersections.map((point) => ({
      x: point.x,
      y: point.y,
    }));

    const boundary = coordSystem.current.selectAll(`.${className}`).data([lineData]);

    boundary
      .enter()
      .append("line")
      .attr("class", className)
      .attr("x1", (d) => xScale(d[0].x))
      .attr("y1", (d) => yScale(d[0].y))
      .attr("x2", (d) => xScale(d[1].x))
      .attr("y2", (d) => yScale(d[1].y))
      .merge(boundary)
      .transition()
      .duration(400)
      .attr("x1", (d) => xScale(d[0].x))
      .attr("y1", (d) => yScale(d[0].y))
      .attr("x2", (d) => xScale(d[1].x))
      .attr("y2", (d) => yScale(d[1].y));
  }

  /* ---------------------------------------------------------------------------------------------------------------- */

  return (
    <>
      <div className="interactive-svg">
        <svg width={svgWidth} height={svgHeight} ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>
      <div className="setting-changer">
        <div className="change-class-button">
          <svg onClick={() => setClassValue(classValue === 0 ? 1 : 0)}>
            <circle
              cx="20"
              cy="20"
              r="15"
              className={
                classValue === 0
                  ? "classification-approaches-data-point-class-0"
                  : "classification-approaches-data-point-class-1"
              }
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
