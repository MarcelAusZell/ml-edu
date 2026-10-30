import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  const xScaleLength = 960;
  const coordSystemLikelihood = useRef();
  const coordSystemLikelihoodXPrior = useRef();
  const coordSystemPosterior = useRef();
  const coordSystemErrorContribution = useRef();
  const coordSystemClassification = useRef();

  const xScaleLikelihood = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScaleLikelihood = d3.scaleLinear().domain([0, 1.5]).range([320, 40]);
  const xScaleLikelihoodXPrior = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScaleLikelihoodXPrior = d3.scaleLinear().domain([0, 1.5]).range([640, 360]);
  const xScalePosterior = d3.scaleLinear().domain([0, 10]).range([40, xScaleLength]);
  const yScalePosterior = d3.scaleLinear().domain([0, 1.5]).range([960, 680]);

  const xScaleErrorContribution = d3.scaleLinear().domain([-2.5, 2.5]).range([50, 950]);
  const yScaleErrorContribution = d3.scaleLinear().domain([0, 4]).range([950, 450]);

  const xScaleClassification = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScaleClassification = d3.scaleLinear().domain([0, 10]).range([400, 50]);

  const dataPoints = [
    { x: 2, y: 0, t: 1 },
    { x: 2.25, y: 0, t: 1 },
    { x: 2.5, y: 0, t: 1 },
    { x: 2.75, y: 0, t: 1 },
    { x: 3, y: 0, t: 1 },

    { x: 6, y: 0, t: 0 },
    { x: 7, y: 0, t: 0 },
    { x: 8, y: 0, t: 0 },
  ];

  const dataPointsClassification = [
    { x: 0.9, y: 7, t: 1 },
    { x: 1, y: 8, t: 1 },
    { x: 1.3, y: 8.4, t: 1 },
    { x: 1.5, y: 6.5, t: 1 },
    { x: 2, y: 7.5, t: 1 },
    { x: 2.5, y: 8, t: 1 },
    { x: 3, y: 5.5, t: -1 },
    { x: 2.5, y: 6, t: -1 },
    { x: 4, y: 6.3, t: -1 },
    { x: 3.5, y: 7, t: -1 },
    { x: 3.1, y: 6.5, t: -1 },
    { x: 10, y: 1, t: -1 },
    { x: 9.4, y: 1.2, t: -1 },
  ];

  const points1 = dataPoints.filter((d) => d.t === 1);
  const points2 = dataPoints.filter((d) => d.t === 0);
  const [m1, v1] = getProbabilityParameterEstimates(points1);
  const [m2, v2] = getProbabilityParameterEstimates(points2);
  const p1 = points1.length / dataPoints.length;
  const p2 = points2.length / dataPoints.length;

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 4,
      action: () => {
        drawCoordSystem(svgRef, xScaleLikelihood, yScaleLikelihood, 320, 40, coordSystemLikelihood);
        plotProbalityFunction(
          coordSystemLikelihood,
          xScaleLikelihood,
          yScaleLikelihood,
          "likelihood",
          "likelihood-1",
          m1,
          v1,
          p1,
          m2,
          v2,
          p2
        );
        plotProbalityFunction(
          coordSystemLikelihood,
          xScaleLikelihood,
          yScaleLikelihood,
          "likelihood",
          "likelihood-2",
          m2,
          v2,
          p2,
          m1,
          v1,
          p1
        );
        plotParameterDescription(
          coordSystemLikelihood,
          xScaleLikelihood,
          yScaleLikelihood,
          "+ Means: 2",
          5,
          1.5,
          "parameter-description"
        );
        plotParameterDescription(
          coordSystemLikelihood,
          xScaleLikelihood,
          yScaleLikelihood,
          "+ (Co)variances: 2",
          5,
          1.3,
          "parameter-description"
        );
      },
      remove: () => {
        coordSystemLikelihood.current.remove();
        d3.selectAll(".data-points-logistic-regression-visual").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updatePoints(dataPoints, xScaleLikelihood, yScaleLikelihood, 20, "data-points-logistic-regression-visual");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 4,
      action: () => {
        drawCoordSystem(svgRef, xScaleLikelihoodXPrior, yScaleLikelihoodXPrior, 640, 40, coordSystemLikelihoodXPrior);

        plotProbalityFunction(
          coordSystemLikelihoodXPrior,
          xScaleLikelihoodXPrior,
          yScaleLikelihoodXPrior,
          "likelihoodXPrior",
          "likelihood-x-prior-1",
          m1,
          v1,
          p1,
          m2,
          v2,
          p2
        );
        plotProbalityFunction(
          coordSystemLikelihoodXPrior,
          xScaleLikelihoodXPrior,
          yScaleLikelihoodXPrior,
          "likelihoodXPrior",
          "likelihood-x-prior-2",
          m2,
          v2,
          p2,
          m1,
          v1,
          p1
        );
        plotParameterDescription(
          coordSystemLikelihoodXPrior,
          xScaleLikelihoodXPrior,
          yScaleLikelihoodXPrior,
          "+ Priors: 1",
          5,
          1.5,
          "parameter-description"
        );
      },
      remove: () => {
        coordSystemLikelihoodXPrior.current.remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updatePoints(
          dataPoints,
          xScaleLikelihoodXPrior,
          yScaleLikelihoodXPrior,
          20,
          "data-points-logistic-regression-visual"
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 4,
      action: () => {
        drawCoordSystem(svgRef, xScalePosterior, yScalePosterior, 960, 40, coordSystemPosterior);
        plotProbalityFunction(
          coordSystemPosterior,
          xScalePosterior,
          yScalePosterior,
          "posterior",
          "posterior-1",
          m1,
          v1,
          p1,
          m2,
          v2,
          p2
        );
        plotProbalityFunction(
          coordSystemPosterior,
          xScalePosterior,
          yScalePosterior,
          "posterior",
          "posterior-2",
          m2,
          v2,
          p2,
          m1,
          v1,
          p1
        );
        plotParameterDescription(
          coordSystemPosterior,
          xScalePosterior,
          yScalePosterior,
          "Total: 5",
          5,
          1.5,
          "parameter-description"
        );
      },
      remove: () => {
        coordSystemPosterior.current.remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 4,
      action: () => {
        updatePoints(dataPoints, xScalePosterior, yScalePosterior, 20, "data-points-logistic-regression-visual");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        plotLogisticRegressionDecisionBoundary(3.9);
        plotParameterDescription(
          coordSystemPosterior,
          xScalePosterior,
          yScalePosterior,
          "Logistic Regression: 1",
          5,
          1.3,
          "parameter-description-logistic-regression"
        );
      },
      remove: () => {
        d3.select(".parameter-comparison-decision-point").remove();
        d3.select(".parameter-comparison-decision-boundary").remove();
        d3.select(".parameter-description-logistic-regression").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 10,
      action: () => {
        drawCoordSystem(svgRef, xScaleClassification, yScaleClassification, 400, 50, coordSystemClassification);
        drawErrorContributionPlot(
          svgRef,
          xScaleErrorContribution,
          yScaleErrorContribution,
          950,
          500,
          coordSystemErrorContribution
        );
        updatePoints(
          dataPointsClassification,
          xScaleClassification,
          yScaleClassification,
          15,
          "data-points-classification"
        );
        latexOntoSvg(
          svg.current,
          "x_1",
          xScaleClassification(10.2),
          yScaleClassification(0),
          "logistic-regression-comparison-axis-label",
          "",
          "20"
        );
        latexOntoSvg(
          svg.current,
          "x_2",
          xScaleClassification(0),
          yScaleClassification(10.3),
          "logistic-regression-comparison-axis-label",
          "",
          "20"
        );
        latexOntoSvg(
          svg.current,
          "z_n = t_n y(x_n) , \\; t_n \\in \\{-1,1\\}",
          830,
          980,
          "logistic-regression-comparison-axis-label",
          "",
          "20"
        );
        latexOntoSvg(svg.current, "E(z_n)", 500, 430, "logistic-regression-comparison-axis-label", "", "20");
      },
      remove: () => {
        coordSystemClassification.current.remove();
        coordSystemErrorContribution.current.remove();
        d3.selectAll(".data-points-classification").remove();
        d3.selectAll(".logistic-regression-comparison-axis-label").remove();
        d3.selectAll(".logistic-regression-comparison-axis-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        const weightsLeastSquares = calculateLeastSquares(dataPointsClassification);
        updateDecisionBoundary(
          coordSystemClassification,
          weightsLeastSquares,
          xScaleClassification,
          yScaleClassification,
          "decision-boundary-classification-approaches-comparison"
        );
        updateErrors(
          coordSystemErrorContribution,
          xScaleErrorContribution,
          yScaleErrorContribution,
          squaredError,
          "error-comparison"
        );
        highlightInterval(
          coordSystemErrorContribution,
          -1.25,
          -0.25,
          1.75,
          3.9,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        updateErrors(
          coordSystemErrorContribution,
          xScaleErrorContribution,
          yScaleErrorContribution,
          squaredError,
          "error-comparison"
        );
        highlightInterval(
          coordSystemErrorContribution,
          1.1,
          2.5,
          0.1,
          2.5,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 8,
      action: () => {
        const weightsActivatedLeastSquares = calculateLeastSquaresWithTanh(dataPointsClassification);
        updateDecisionBoundary(
          coordSystemClassification,
          weightsActivatedLeastSquares,
          xScaleClassification,
          yScaleClassification,
          "decision-boundary-classification-approaches-comparison"
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        updateErrors(
          coordSystemErrorContribution,
          xScaleErrorContribution,
          yScaleErrorContribution,
          squaredErrorTanh,
          "error-comparison"
        );
        highlightInterval(
          coordSystemErrorContribution,
          1,
          2.5,
          -0.3,
          0.3,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        updateErrors(
          coordSystemErrorContribution,
          xScaleErrorContribution,
          yScaleErrorContribution,
          squaredErrorTanh,
          "error-comparison"
        );
        highlightInterval(
          coordSystemErrorContribution,
          -2.5,
          -1.8,
          3.5,
          4.2,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 9,
      end: 10,
      action: () => {
        const weightsCrossEntropy = calculateSecondOrderLogisticRegression(dataPointsClassification);
        updateDecisionBoundary(
          coordSystemClassification,
          weightsCrossEntropy,
          xScaleClassification,
          yScaleClassification,
          "decision-boundary-classification-approaches-comparison"
        );
        updateErrors(
          coordSystemErrorContribution,
          xScaleErrorContribution,
          yScaleErrorContribution,
          crossEntropyError,
          "error-comparison"
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        highlightInterval(
          coordSystemErrorContribution,
          1,
          2.5,
          -0.2,
          0.5,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 10,
      action: () => {
        highlightInterval(
          coordSystemErrorContribution,
          -2.5,
          -0.5,
          1.25,
          4,
          xScaleErrorContribution,
          yScaleErrorContribution
        );
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  /* ----------------------------------------------------- Why logistic regression and not bayes decision? ----------------------------------------------------- */

  function plotLogisticRegressionDecisionBoundary(threshold) {
    coordSystemPosterior.current
      .append("circle")
      .attr("cx", xScalePosterior(threshold))
      .attr("cy", yScalePosterior(0))
      .attr("r", 15)
      .attr("class", "parameter-comparison-decision-point");

    coordSystemPosterior.current
      .append("line")
      .attr("class", "parameter-comparison-decision-boundary")
      .attr("x1", xScalePosterior(threshold))
      .attr("y1", yScalePosterior(-0.1))
      .attr("x2", xScalePosterior(threshold))
      .attr("y2", yScalePosterior(-0.1))
      .transition()
      .duration(800)
      .attr("x2", xScalePosterior(threshold))
      .attr("y2", yScalePosterior(1.1));
  }

  function plotProbalityFunction(coordSystem, xScale, yScale, plot, className, m1, v1, p1, m2, v2, p2) {
    const xValues = d3.range(xScalePosterior.domain()[0], xScalePosterior.domain()[1], 0.01);

    const firstPlot = xValues.map((x) => {
      const y = univariateGaussian(x, m1, v1);
      return { x: x, y: y };
    });

    const secondPlot = xValues.map((x) => {
      const y = univariateGaussian(x, m1, v1) * p1;
      return { x: x, y: y };
    });

    const thirdPlot = xValues.map((x) => {
      const y =
        (univariateGaussian(x, m1, v1) * p1) /
        (univariateGaussian(x, m1, v1) * p1 + univariateGaussian(x, m2, v2) * p2);
      return { x: x, y: y };
    });

    const data = plot === "likelihood" ? firstPlot : plot === "likelihoodXPrior" ? secondPlot : thirdPlot;

    let path = coordSystem.current.selectAll(`.${className}`).data([data]);

    path.exit().remove();

    path = path
      .enter()
      .append("path")
      .attr("class", className)
      .merge(path)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y))
      )
      .attr("fill", "none")
      .attr("stroke", "black");

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-width", 10)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);
  }

  function plotParameterDescription(coordSystem, xScale, yScale, description, x, y, className) {
    coordSystem.current
      .append("text")
      .attr("x", xScale(x))
      .attr("y", yScale(y))
      .attr("text-anchor", "middle")
      .text(description)
      .attr("class", className);
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
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5);

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5);
  }

  function updatePoints(newData, xScale, yScale, radius, className) {
    const points = svg.current.selectAll(`.${className}`).data(newData);

    points
      .enter()
      .append("circle")
      .attr("class", className)
      .attr("fill", (d) => (d.t === 1 ? "orange" : "steelblue"))
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .merge(points)
      .transition()
      .duration(200)
      .attr("r", radius)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y));

    points.exit().transition().duration(1000).attr("r", 0).remove();
  }

  function getProbabilityParameterEstimates(dataPoints) {
    const xValues = dataPoints.map((d) => d.x);
    const estimatedMean = d3.mean(xValues);
    const estimatedVariance = d3.variance(xValues);
    return [estimatedMean, estimatedVariance];
  }

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }

  /* ----------------------------------------------------- Why logistic regression and not least squares? ----------------------------------------------------- */

  function logisticSigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function calculateSecondOrderLogisticRegression(dataPoints) {
    const X = dataPoints.map((point) => [point.x, point.y, 1]);
    const t = dataPoints.map((point) => (point.t == -1 ? 0 : 1));

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

    return weights;
  }

  function tanh(x) {
    return Math.tanh(x);
  }

  function tanhDerivative(x) {
    const cosh = Math.cosh(x);
    return 1 / (cosh * cosh);
  }

  function calculateLeastSquaresWithTanh(dataPoints) {
    const X = dataPoints.map((point) => [point.x, point.y, 1]);
    const t = dataPoints.map((d) => d.t);

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

    return weights;
  }

  function calculateLeastSquares(dataPoints) {
    const X = dataPoints.map((d) => [d.x, d.y, 1]);
    const t = dataPoints.map((d) => [d.t]);
    const regularization = 1e-10;

    let XTX = numeric.dot(numeric.transpose(X), X);
    for (let i = 0; i < XTX.length; i++) {
      XTX[i][i] += regularization;
    }

    const pseudoInverse = numeric.dot(numeric.inv(XTX), numeric.transpose(X));
    const weights = numeric.dot(pseudoInverse, t);

    const w = [weights[0][0], weights[1][0], weights[2][0]];

    return w;
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

  function squaredError(x) {
    return (1 - x) ** 2;
  }

  function squaredErrorTanh(x) {
    return (1 - tanh(x)) ** 2;
  }

  function crossEntropyError(x) {
    return Math.log(1 + Math.exp(-x)) / Math.log(2);
  }

  function updateErrors(coordSystem, xScale, yScale, errorFunction, className) {
    const xValues = d3.range(xScaleErrorContribution.domain()[0], xScaleErrorContribution.domain()[1], 0.01);

    const data = xValues.map((x) => {
      const y = errorFunction(x);
      return { x: x, y: y };
    });
    const filteredData = data.filter((d) => d.y <= yScaleErrorContribution.domain()[1]);

    const path = coordSystem.current.selectAll(`.${className}`).data([filteredData]);

    path
      .enter()
      .append("path")
      .attr("class", className)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y))
      )
      .merge(path)
      .transition()
      .duration(400)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.x))
          .y((d) => yScale(d.y))
      );
  }

  function highlightInterval(coordSystem, a, b, rectHeightStart, rectHeightEnd, xScale, yScale) {
    const rectHeight = Math.abs(yScale(rectHeightEnd) - yScale(rectHeightStart));
    const rect = coordSystem.current.selectAll(".highlighting-rect").data([null]);

    rect
      .enter()
      .append("rect")
      .attr("class", "highlighting-rect")
      .attr("x", xScale(a))
      .attr("y", yScale(rectHeightEnd))
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("width", xScale(b) - xScale(a))
      .attr("height", rectHeight)
      .merge(rect)
      .transition()
      .ease(d3.easeBackOut.overshoot(0.5))
      .duration(400)
      .attr("x", xScale(a))
      .attr("y", yScale(rectHeightEnd))
      .attr("width", xScale(b) - xScale(a))
      .attr("height", rectHeight);
  }

  function drawErrorContributionPlot(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(d3.axisBottom(xScale).tickPadding(10).tickValues([-1, 0, 1]).tickSize(0).tickFormat(d3.format("d")))
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(d3.axisLeft(yScale).tickPadding(10).tickValues([1, 2, 3]).tickSize(0).tickFormat(d3.format("d")))
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");
  }

  useEffect(() => {
    if (currentStep === null) {
      d3.select(svgRef.current).selectAll("*").remove();
      actions.forEach((action) => {
        action.called = false;
      });
    }
    actions.forEach((action) => {
      const inRange = currentStep >= action.start && currentStep <= action.end;
      if (inRange && !action.called) {
        action.action();
        action.called = true;
      } else if (!inRange && action.called) {
        action.remove();
        action.called = false;
      }
    });
  }, [currentStep]);

  return <svg ref={svgRef} viewBox="0 0 1000 1000" />;
}
