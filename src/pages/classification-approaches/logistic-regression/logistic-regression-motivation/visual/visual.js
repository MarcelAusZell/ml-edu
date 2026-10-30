import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const bayesCoordSystem = useRef();
  const logisticRegressionCoordSystem = useRef();
  const xScaleBayes = d3.scaleLinear().domain([0, 8]).range([50, 950]);
  const yScaleBayes = d3.scaleLinear().domain([0, 1.5]).range([450, 50]);
  const xScaleLogisticRegression = d3.scaleLinear().domain([0, 8]).range([50, 950]);
  const yScaleLogisticRegression = d3.scaleLinear().domain([0, 1.5]).range([950, 550]);

  const maximumLikelihoodCoordSystem = useRef();
  const xScaleMaximumLikelihood = d3.scaleLinear().domain([-5, 10]).range([50, 950]);
  const yScaleMaximumLikelihood = d3.scaleLinear().domain([-10, 5]).range([950, 50]);

  const dataPoints = [
    { x: 1, y: 0, t: 1 },
    { x: 1.5, y: 0, t: 1 },
    { x: 2, y: 0, t: 1 },
    { x: 2.25, y: 0, t: 1 },
    { x: 2.35, y: 0, t: 1 },
    { x: 2.4, y: 0, t: 1 },
    { x: 2.5, y: 0, t: 1 },
    { x: 2.55, y: 0, t: 1 },
    { x: 2.6, y: 0, t: 1 },
    { x: 2.75, y: 0, t: 1 },
    { x: 3, y: 0, t: 1 },
    { x: 4, y: 0, t: 1 },

    { x: 6, y: 0, t: 0 },
    { x: 6.5, y: 0, t: 0 },
    { x: 7, y: 0, t: 0 },
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
      end: 3,
      action: () => {
        drawBayesCoordSystem();
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updatePoints(dataPoints, xScaleBayes, yScaleBayes, 20);

        animateProbabilityPath("probability-path-class-1", m1, v1, p1, m2, v2, p2);
        animateProbabilityPath("probability-path-class-2", m2, v2, p2, m1, v1, p1);
      },
      remove: () => {
        bayesCoordSystem.current.selectAll(".probability-path-class-1").interrupt().remove();
        bayesCoordSystem.current.selectAll(".probability-path-class-2").interrupt().remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 3,
      action: () => {
        drawLogisticRegressionCoordSystem();
        updatePoints(dataPoints, xScaleLogisticRegression, yScaleLogisticRegression, 20);

        plotLastAnimationStep("probability-path-class-1-last-animation", m1, v1, p1, m2, v2, p2);
        plotLastAnimationStep("probability-path-class-2-last-animation", m2, v2, p2, m1, v1, p1);
      },
      remove: () => {
        bayesCoordSystem.current.selectAll(".probability-path-class-1-last-animation").interrupt().remove();
        bayesCoordSystem.current.selectAll(".probability-path-class-2-last-animation").interrupt().remove();
        d3.selectAll(".coord-system-logistic-regression").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        plotLogisticRegressionDecisionBoundary();
      },
      remove: () => {
        d3.selectAll(".logistic-regression-decision-boundary-point").remove();
        d3.selectAll(".logistic-regression-decision-boundary-line").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 3,
      action: () => {},
      remove: () => {
        bayesCoordSystem.current.selectAll("*").remove();
        d3.selectAll(".coord-system-logistic-regression").remove();
        d3.selectAll(".logistic-regression-decision-boundary-point").remove();
        d3.selectAll(".logistic-regression-decision-boundary-line").remove();
        d3.selectAll(".data-points-logistic-regression-visual").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        plotMaximumLikelihoodCoordSystem();
      },
      remove: () => {
        maximumLikelihoodCoordSystem.current.selectAll("*").remove();
        d3.selectAll(".logistic-regression-maximum-likelihood-label").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        updateMaximumLikelihoodPlot(false);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        updateMaximumLikelihoodPlot(true);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  function plotLogisticRegressionDecisionBoundary() {
    const X = dataPoints.map((d) => [1, d.x]);
    const t = dataPoints.map((d) => (d.t === 1 ? 1 : 0));
    let weights = [0, 0];

    const maxIterations = 10;
    const tolerance = 1e-5;

    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = X.map((x) => sigmoid(numeric.dot(x, weights)));
      const errors = numeric.sub(predictions, t);

      const R = numeric.diag(predictions.map((p) => p * (1 - p)));
      const Hessian = numeric.dot(numeric.dot(numeric.transpose(X), R), X);
      const gradient = numeric.dot(numeric.transpose(X), errors);

      const update = numeric.solve(Hessian, gradient);
      weights = numeric.sub(weights, update);

      if (numeric.norm2(update) < tolerance) {
        break;
      }
    }
    const decisionBoundaryPoint = -weights[0] / weights[1];

    logisticRegressionCoordSystem.current
      .append("circle")
      .attr("cx", xScaleLogisticRegression(decisionBoundaryPoint))
      .attr("cy", yScaleLogisticRegression(0))
      .attr("r", 15)
      .attr("class", "logistic-regression-decision-boundary-point");

    logisticRegressionCoordSystem.current
      .append("line")
      .attr("class", "logistic-regression-decision-boundary-line")
      .attr("x1", xScaleLogisticRegression(decisionBoundaryPoint))
      .attr("y1", yScaleLogisticRegression(-0.1))
      .attr("x2", xScaleLogisticRegression(decisionBoundaryPoint))
      .attr("y2", yScaleLogisticRegression(-0.1))
      .transition()
      .duration(1000)
      .attr("x2", xScaleLogisticRegression(decisionBoundaryPoint))
      .attr("y2", yScaleLogisticRegression(1.5));
  }

  function animateProbabilityPath(className, m1, v1, p1, m2, v2, p2) {
    const xValues = d3.range(xScaleBayes.domain()[0], xScaleBayes.domain()[1], 0.01);

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

    let path = bayesCoordSystem.current.selectAll(`.${className}`).data([firstPlot]);

    path = path
      .enter()
      .append("path")
      .attr("class", className)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScaleBayes(d.x))
          .y((d) => yScaleBayes(d.y))
      )
      .merge(path);

    path
      .transition()
      .duration(800)
      .delay(500)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScaleBayes(d.x))
          .y((d) => yScaleBayes(secondPlot.find((p) => p.x === d.x).y))
      )
      .transition()
      .duration(800)
      .delay(500)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScaleBayes(d.x))
          .y((d) => yScaleBayes(thirdPlot.find((p) => p.x === d.x).y))
      );
  }

  function plotLastAnimationStep(className, m1, v1, p1, m2, v2, p2) {
    const xValues = d3.range(xScaleBayes.domain()[0], xScaleBayes.domain()[1], 0.01);

    const line = d3
      .line()
      .x((d) => xScaleBayes(d.x))
      .y((d) => yScaleBayes(d.y));

    const thirdPlot = xValues.map((x) => {
      const y =
        (univariateGaussian(x, m1, v1) * p1) /
        (univariateGaussian(x, m1, v1) * p1 + univariateGaussian(x, m2, v2) * p2);
      return { x: x, y: y };
    });

    let path = bayesCoordSystem.current.selectAll(`.${className}`).data([thirdPlot]);
    path.transition().duration(250).attr("d", line);
    path.enter().append("path").attr("class", className).attr("d", line);
  }

  function drawBayesCoordSystem() {
    const coordSystem = svg.current.append("g");
    bayesCoordSystem.current = coordSystem;

    coordSystem.attr("class", "coord-system-bayes-decision-theory");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,450)`)
      .call(
        d3
          .axisBottom(xScaleBayes)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "2px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(yScaleBayes).tickSize(1).tickPadding(1).tickValues([1]).tickSizeOuter(0))
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "2px");
  }

  function drawLogisticRegressionCoordSystem() {
    const coordSystem = svg.current.append("g");
    logisticRegressionCoordSystem.current = coordSystem;

    coordSystem.attr("class", "coord-system-logistic-regression");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,950)`)
      .call(
        d3
          .axisBottom(xScaleLogisticRegression)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(
        d3
          .axisLeft(yScaleLogisticRegression)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");
  }

  function updatePoints(newData, xScale, yScale, radius) {
    const points = svg.current.selectAll(".data-points-logistic-regression-visual").data(newData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-points-logistic-regression-visual")
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

  function plotMaximumLikelihoodCoordSystem() {
    const coordSystem = svg.current.append("g");
    maximumLikelihoodCoordSystem.current = coordSystem;

    coordSystem.attr("class", "coord-system-maximum-likelihood");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,950)`)
      .call(
        d3
          .axisBottom(xScaleMaximumLikelihood)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(
        d3
          .axisLeft(yScaleMaximumLikelihood)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg.current, "w_1", 975, 950, "logistic-regression-maximum-likelihood-label", "", 25);
    latexOntoSvg(svg.current, "w_0", 50, 30, "logistic-regression-maximum-likelihood-label", "", 25);
  }

  function likelihoodFunction(w0, w1) {
    const linearDiscriminate = (x) => sigmoid(w0 + w1 * x);
    let likelihood = 1;
    const dataPoints = [
      { x: 1.76405235, t: 0 },
      { x: 0.40015721, t: 1 },
      { x: 0.97873798, t: 1 },
      { x: 2.2408932, t: 0 },
      { x: 1.86755799, t: 0 },
      { x: -0.97727788, t: 1 },
      { x: 0.9500884, t: 1 },
      { x: -0.15135721, t: 1 },
      { x: -0.10321885, t: 1 },
      { x: 0.4105985, t: 0 },
    ];

    for (let i = 0; i < dataPoints.length; i++) {
      const y_n = linearDiscriminate(dataPoints[i].x);
      const t_n = dataPoints[i].t;
      likelihood *= y_n ** t_n * (1 - y_n) ** (1 - t_n);
    }
    return likelihood;
  }

  function updateMaximumLikelihoodPlot(showLogLikelihood) {
    const x = d3.range(-5, 10, 0.5);
    const y = d3.range(-10, 5, 0.5);
    const z = [];

    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        z.push({
          x: x[i],
          y: y[j],
          z: showLogLikelihood ? -Math.log(likelihoodFunction(x[i], y[j])) : likelihoodFunction(x[i], y[j]),
        });
      }
    }

    const max = d3.max(z, (d) => d.z);
    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, max]);
    const rectWidth = (950 - 50) / x.length;
    const rectHeight = (950 - 50) / y.length;

    const heatmapRects = maximumLikelihoodCoordSystem.current.selectAll(".heatmap-rect").data(z);

    heatmapRects
      .transition()
      .duration(2000)
      .ease(d3.easeExpOut)
      .attr("fill", (d) => colorScale(d.z));

    heatmapRects
      .enter()
      .append("rect")
      .attr("class", "heatmap-rect")
      .attr("x", (d) => xScaleMaximumLikelihood(d.x))
      .attr("y", (d) => yScaleMaximumLikelihood(d.y) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("fill", (d) => colorScale(d.z));
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
