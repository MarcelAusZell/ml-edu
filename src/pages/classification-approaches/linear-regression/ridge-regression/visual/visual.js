import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  const regressionAxesRef = useRef();
  const weightsAxesRef = useRef();

  const xScaleRegression = d3.scaleLinear().domain([0, 7]).range([50, 950]);
  const yScaleRegression = d3.scaleLinear().domain([-1.5, 1.5]).range([450, 50]);
  const xScaleWeights = d3.scaleLinear().domain([0, 9]).range([50, 950]);
  const yScaleWeights = d3.scaleLog().domain([0.1, 100000]).range([950, 550]);
  const xScaleRegulization = d3.scaleLinear().domain([0, 7]).range([50, 950]);
  const yScaleRegulization = d3.scaleLinear().domain([-1.5, 1.5]).range([950, 50]);

  const dataPointsNonLinear = [
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

  const dataPointsNonLinearMoreData = [
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

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  for (let i = 0; i < 100; i++) {
    const x = getRandomNumber(0, 7);
    const y = Math.sin(x) + getRandomNumber(-0.25, 0.25);
    dataPointsNonLinearMoreData.push({ x, y });
  }

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        drawRegulizationCoordSystem();
        plotMoreDataPoints();
        plotRegressionPath(dataPointsNonLinearMoreData, 9, xScaleRegulization, yScaleRegulization, false);
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".data-point-extra-linear-regression-visual").remove();
        d3.select(svgRef.current).selectAll(".regression-path-visual").remove();
        d3.select(svgRef.current).selectAll(".vertical-lines-to-regression-path-visual").remove();
        d3.select(svgRef.current).selectAll(".coord-system-regulization").remove();
        d3.select(svgRef.current).selectAll(".ridge-regression-label").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 10,
      action: () => {},
      remove: () => {
        d3.select(svgRef.current).selectAll(".data-point-linear-regression-visual").remove();
      },
      called: false,
    },

    {
      start: 2,
      end: 2,
      action: () => {
        drawRegressionCordSystem();
        drawWeightsCoordSystem();
        updatePoints(dataPointsNonLinear, xScaleRegression, yScaleRegression, 10);
        animateRegressionPath(dataPointsNonLinear);
      },
      remove: () => {
        if (animatedRegressionInterval) {
          clearInterval(animatedRegressionInterval);
        }
        d3.select(svgRef.current).selectAll(".weight-norm-polyline").remove();
        d3.select(svgRef.current).selectAll(".coord-system-linear-regression").remove();
        d3.select(svgRef.current).selectAll(".overfitting-chart-label").remove();
        d3.select(svgRef.current).selectAll(".label-weights").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 10,
      action: () => {
        drawRegulizationCoordSystem();
        updatePoints(dataPointsNonLinear, xScaleRegulization, yScaleRegulization, 20);
        drawGroundTruthLine();
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".coord-system-regulization").remove();
        d3.select(svgRef.current).selectAll(".linear-regression-ground-truth-line").remove();
        d3.select(svgRef.current).selectAll(".ridge-regression-label").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        const weights = calculateRegularizedRegressionLine(dataPointsNonLinear, 9, 0);
        updateRegularizedRegressionLine(weights, 9, xScaleRegulization, yScaleRegulization);
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".regression-path-animated-visual").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 10,
      action: () => {},
      remove: () => {
        d3.select(svgRef.current).selectAll(".regression-path-visual").remove();
      },
      called: false,
    },

    {
      start: 4,
      end: 4,
      action: () => {
        plotRegularizedRegressionPath(
          dataPointsNonLinear,
          9,
          xScaleRegulization,
          yScaleRegulization,
          0.0000000000000001,
          false
        );
        updateParameterText(
          calculateRegularizedRegressionLine(dataPointsNonLinear, 9, 0.0000000000000001),
          9,
          dataPointsNonLinear,
          0.0000000000000001
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        plotRegularizedRegressionPath(dataPointsNonLinear, 9, xScaleRegulization, yScaleRegulization, 0.000001, false);
        updateParameterText(
          calculateRegularizedRegressionLine(dataPointsNonLinear, 9, 0.000001),
          9,
          dataPointsNonLinear,
          0.000001
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        plotRegularizedRegressionPath(dataPointsNonLinear, 9, xScaleRegulization, yScaleRegulization, 0.001, false);
        updateParameterText(
          calculateRegularizedRegressionLine(dataPointsNonLinear, 9, 0.001),
          9,
          dataPointsNonLinear,
          0.001
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        plotRegularizedRegressionPath(dataPointsNonLinear, 9, xScaleRegulization, yScaleRegulization, 1000, false);
        updateParameterText(
          calculateRegularizedRegressionLine(dataPointsNonLinear, 9, 1000),
          9,
          dataPointsNonLinear,
          1000
        );
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  let animatedRegressionInterval = null;

  function animateRegressionPath(dataPoints) {
    let pointsForPolyline = [];
    let i = 0;

    const executeIteration = () => {
      if (i > 9) {
        clearInterval(animatedRegressionInterval);
        return;
      }

      const weights = calculateRegressionLine(dataPoints, i);
      const weightNorm = numeric.norm2(weights);
      plotRegressionPath(dataPoints, i, xScaleRegression, yScaleRegression);
      pointsForPolyline.push({ x: xScaleWeights(i), y: yScaleWeights(weightNorm) });
      plotWeightNormPolyLine(pointsForPolyline);

      i++;
    };

    executeIteration();
    animatedRegressionInterval = setInterval(executeIteration, 400);
  }

  function plotMoreDataPoints() {
    const points = svg.current
      .selectAll(".data-point-extra-linear-regression-visual")
      .data(dataPointsNonLinearMoreData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-extra-linear-regression-visual")
      .attr("cx", (d) => xScaleRegulization(d.x))
      .attr("cy", (d) => yScaleRegulization(d.y))
      .attr("r", 0)
      .transition()
      .ease(d3.easeBackOut)
      .duration(1000)
      .attr("r", 20);
  }

  function plotWeightNormPolyLine(points) {
    weightsAxesRef.current
      .append("polyline")
      .attr("class", "weight-norm-polyline")
      .attr("points", points.map((p) => `${p.x},${p.y}`).join(" "))
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 10);
  }

  function drawGroundTruthLine() {
    const x = d3.range(xScaleRegulization.domain()[0], xScaleRegulization.domain()[1], 0.01);
    const y = x.map((x) => Math.sin(x));

    const line = d3
      .line()
      .x((d) => xScaleRegulization(d.x))
      .y((d) => yScaleRegulization(d.y));

    const path = regressionAxesRef.current
      .append("path")
      .attr("class", "linear-regression-ground-truth-line")
      .datum(x.map((d, i) => ({ x: d, y: y[i] })))
      .attr("d", line);
    const totalLength = d3
      .select(svgRef.current)
      .selectAll(".linear-regression-ground-truth-line")
      .node()
      .getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1200)
      .attr("stroke-dashoffset", 0);
  }

  function updateParameterText(weights, polyDegree, dataPoints, lambda) {
    const RMSE = calculateRMSE(weights, dataPoints);
    const RMSEText = regressionAxesRef.current.selectAll(".RMSE-text-linear-regression-visual").data([RMSE]);
    const DegreeText = regressionAxesRef.current.selectAll(".degree-text-linear-regression-visual").data([polyDegree]);

    const lambdaText = regressionAxesRef.current.selectAll(".lamda-text-linear-regression-visual").data([lambda]);

    lambdaText
      .enter()
      .append("text")
      .attr("class", "lamda-text-linear-regression-visual")
      .attr("x", 100)
      .attr("y", 830)
      .text(`λ: ${lambda.toExponential()}`)
      .merge(lambdaText)
      .text(`λ: ${lambda.toExponential()}`);

    RMSEText.enter()
      .append("text")
      .attr("class", "RMSE-text-linear-regression-visual")
      .attr("x", 100)
      .attr("y", 880)
      .text(`RMSE: ${RMSE.toFixed(2)}`)
      .merge(RMSEText)
      .text(`RMSE: ${RMSE.toFixed(2)}`);

    DegreeText.enter()
      .append("text")
      .attr("class", "degree-text-linear-regression-visual")
      .attr("x", 100)
      .attr("y", 930)
      .text(`Deg: ${polyDegree}`)
      .merge(DegreeText)
      .text(`Deg: ${polyDegree}`);
  }

  function calculateRMSE(weights, dataPoints) {
    const error = dataPoints.reduce((acc, { x, y }) => {
      const predictedY = weights.reduce((sum, weight, idx) => sum + weight * Math.pow(x, idx), 0);
      return acc + Math.pow(y - predictedY, 2);
    }, 0);

    const rmse = Math.sqrt(error / dataPoints.length);
    return isNaN(rmse) ? 0 : rmse;
  }

  function updatePoints(newData, xScale, yScale, radius) {
    const points = svg.current.selectAll(".data-point-linear-regression-visual").data(newData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-linear-regression-visual")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .merge(points)
      .transition()
      .duration(500)
      .attr("r", radius)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y));

    points.exit().transition().duration(1000).attr("r", 0).remove();
  }

  function plotRegressionPath(dataPoints, polyDegree, xScale, yScale, showVerticalLines = true) {
    const weights = calculateRegressionLine(dataPoints, polyDegree);
    updateRegressionLine(weights, polyDegree, xScale, yScale);

    if (showVerticalLines) updateVerticalLinesToRegression(dataPoints, weights, polyDegree, xScale, yScale);
  }

  function calculateRegressionLine(dataPoints, polyDegree) {
    const X = dataPoints.map(({ x }) => generateBasisFunctions(x, polyDegree));
    const t = dataPoints.map(({ y }) => [y]);

    const XT = numeric.transpose(X);
    const XTX = numeric.dot(XT, X);
    const pseudoInverse = numeric.dot(numeric.inv(XTX), XT);
    const weights = numeric.dot(pseudoInverse, t);

    return weights;
  }

  function updateRegressionLine(weights, polyDegree, xScale, yScale) {
    const start = xScaleRegression.domain()[0];
    const end = xScaleRegression.domain()[1];
    const xValues = d3.range(start + 0.1, end - 0.2, 0.01);

    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z[0] };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let path = regressionAxesRef.current.selectAll(".regression-path-visual").data([decisionBoundary]);
    path.transition().duration(500).attr("d", line);
    path.enter().append("path").attr("class", "regression-path-visual").attr("d", line);
  }

  function updateVerticalLinesToRegression(dataPoints, weights, polyDegree, xScale, yScale) {
    const leastSquareRegressionLine = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const verticalLines = regressionAxesRef.current
      .selectAll(".vertical-lines-to-regression-path-visual")
      .data(dataPoints);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-lines-to-regression-path-visual")
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(leastSquareRegressionLine(d.x)))
      .merge(verticalLines)
      .transition()
      .duration(500)
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

  function drawRegressionCordSystem() {
    const coordSystem = svg.current.append("g");
    regressionAxesRef.current = coordSystem;

    coordSystem.attr("class", "coord-system-linear-regression");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,450)`)
      .call(
        d3
          .axisBottom(xScaleRegression)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(
        d3
          .axisLeft(yScaleRegression)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg.current, "x", 970, 450, "overfitting-chart-label", "", 25);
    latexOntoSvg(svg.current, "t", xScaleRegression(0), 30, "overfitting-chart-label", "", 25);
  }

  function drawWeightsCoordSystem() {
    const coordSystem = svg.current.append("g");
    weightsAxesRef.current = coordSystem;

    coordSystem.attr("class", "coord-system-linear-regression");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,950)`)
      .call(d3.axisBottom(xScaleWeights).tickPadding(5).tickSize(0.25).tickValues([1, 2, 3, 4, 5, 6, 7, 8]))
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(
        d3
          .axisLeft(yScaleWeights)
          .tickValues([0.1, 10, 1000, 10000, 100000])
          .tickFormat(d3.format(".0e"))
          .tickPadding(5)
          .tickSize(0.25)
      )
      .attr("stroke-width", 7.5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg.current, "\\text{Degree}", 950, 980, "label-weights", "", 20);
    latexOntoSvg(svg.current, "\\text{Norm of} \\; \\vec{w}", 60, 515, "label-weights", "", 20);
  }

  function plotRegularizedRegressionPath(dataPoints, polyDegree, xScale, yScale, lambda, showVerticalLines) {
    const weights = calculateRegularizedRegressionLine(dataPoints, polyDegree, lambda);
    updateRegressionLine(weights, polyDegree, xScale, yScale);
    if (showVerticalLines) updateVerticalLinesToRegression(dataPoints, weights, polyDegree, xScale, yScale);
  }

  function updateRegularizedRegressionLine(weights, polyDegree, xScale, yScale) {
    const start = xScaleRegulization.domain()[0];
    const end = xScaleRegulization.domain()[1];
    const xValues = d3.range(start + 0.1, end - 0.2, 0.01);

    // Function to compute the decision boundary
    const decisionBoundary = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale(decisionBoundary(d)));

    let path = regressionAxesRef.current.selectAll(".regression-path-animated-visual").data([xValues]);
    path
      .enter()
      .append("path")
      .attr("class", "regression-path-animated-visual")
      .attr("d", line)
      .attr("stroke", "blue")
      .attr("stroke-width", 0.5)
      .attr("fill", "none")
      .each(function () {
        const totalLength = this.getTotalLength();
        d3.select(this)
          .attr("stroke-dasharray", totalLength + " " + totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(1200)
          .attr("stroke-dashoffset", 0);
      });
  }

  function calculateRegularizedRegressionLine(dataPoints, polyDegree, lambda) {
    const X = dataPoints.map(({ x }) => generateBasisFunctions(x, polyDegree));
    const t = dataPoints.map(({ y }) => [y]);

    const XT = numeric.transpose(X);
    const XTX = numeric.dot(XT, X);
    const lambdaI = numeric.mul(lambda, numeric.identity(XTX.length));
    const lambdaIPlusXTX = numeric.add(lambdaI, XTX);
    const pseudoInverse = numeric.dot(numeric.inv(lambdaIPlusXTX), XT);

    const weights = numeric.dot(pseudoInverse, t);
    return weights;
  }

  function drawRegulizationCoordSystem() {
    const coordSystem = svg.current.append("g");
    regressionAxesRef.current = coordSystem;

    coordSystem.attr("class", "coord-system-regulization");

    coordSystem
      .append("g")
      .attr("transform", `translate(0,950)`)
      .call(
        d3
          .axisBottom(xScaleRegulization)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(
        d3
          .axisLeft(yScaleRegulization)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7.5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg.current, "x", 970, 950, "ridge-regression-label", "", 25);
    latexOntoSvg(svg.current, "t", xScaleRegulization(0), 30, "ridge-regression-label", "", 25);
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
