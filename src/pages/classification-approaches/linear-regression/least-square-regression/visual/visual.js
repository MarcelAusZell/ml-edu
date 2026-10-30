import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

  // Linear data points which stem from 2 + (8 / 10) * x
  const dataPointsLinear = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 2.5 },
    { x: 5, y: 4 },
    { x: 5.5, y: 5 },
    { x: 6, y: 7.5 },
    { x: 7, y: 8 },
    { x: 8.5, y: 7.5 },
    { x: 9.5, y: 10 },
  ];

  // Non-linear data points which stem from  3 * sin(x / 1.5) + 5
  const dataPointsNonLinear = [
    { x: 0.5, y: 5 },
    { x: 1.25, y: 8 },
    { x: 2.5, y: 9 },
    { x: 4, y: 5 },
    { x: 5.5, y: 6 },
    { x: 6, y: 1 },
    { x: 7.25, y: 3 },
    { x: 8.5, y: 2.5 },
    { x: 9.5, y: 6 },
  ];

  // Same data points as dataPointsNonLinear but with more data points according 3 * sin(x / 1.5) + 5 and random some noise
  const dataPointsNonLinearMoreData = [
    { x: 0.5, y: 5 },
    { x: 1.25, y: 8 },
    { x: 2.5, y: 9 },
    { x: 4, y: 5 },
    { x: 5.5, y: 6 },
    { x: 6, y: 1 },
    { x: 7.25, y: 3 },
    { x: 8.5, y: 2.5 },
    { x: 9.5, y: 6 },
  ];
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  for (let i = 0; i < 100; i++) {
    const x = getRandomNumber(0, 10);
    const y = 3 * Math.sin(x / 1.5) + 5 + getRandomNumber(-1, 1);
    dataPointsNonLinearMoreData.push({ x, y });
  }

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 10,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 50, axesRef, "coord-system-linear-regression-visual");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updatePoints(dataPointsLinear);
        plotRegressionPath(dataPointsLinear, 1);
        drawAndTransitionGroundTruthLine("linear");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 10,
      action: () => {
        updatePoints(dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 3);
        drawAndTransitionGroundTruthLine("nonlinear");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        plotRegressionPath(dataPointsNonLinear, 3);
        drawAndTransitionGroundTruthLine("nonlinear");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 10,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".RMSE-text-linear-regression-visual").remove();
        svg.current.selectAll(".degree-text-linear-regression-visual").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        const weights = calculateRegressionLine(dataPointsNonLinear, 0);
        updateRMSEText(weights, 0, dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 0);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        const weights = calculateRegressionLine(dataPointsNonLinear, 2);
        updateRMSEText(weights, 2, dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 2);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        const weights = calculateRegressionLine(dataPointsNonLinear, 4);
        updateRMSEText(weights, 4, dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 4);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        const weights = calculateRegressionLine(dataPointsNonLinear, 6);
        updateRMSEText(weights, 6, dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 6);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 9,
      action: () => {
        const weights = calculateRegressionLine(dataPointsNonLinear, 9);
        updateRMSEText(weights, 9, dataPointsNonLinear);
        plotRegressionPath(dataPointsNonLinear, 9);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 10,
      action: () => {
        newDataPoint(7.7);
      },
      remove: () => {
        svg.current.selectAll(".breathing-point").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 10,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".prediction-arrow-new-data-point").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        drawPredictionForNewDataPoint(7.7, 9, dataPointsNonLinear);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 10,
      action: () => {
        drawPredictionForNewDataPoint(7.7, 9, dataPointsNonLinearMoreData);
        const weights = calculateRegressionLine(dataPointsNonLinearMoreData, 9);
        updateRMSEText(weights, 9, dataPointsNonLinearMoreData);
        plotRegressionPath(dataPointsNonLinearMoreData, 9, false);
        plotBigNonLinearDataSet();
      },
      remove: () => {
        svg.current.selectAll(".data-point-extra-linear-regression-visual").remove();
      },
      called: false,
    },
  ]).current;

  function plotBigNonLinearDataSet() {
    const points = svg.current
      .selectAll(".data-point-extra-linear-regression-visual")
      .data(dataPointsNonLinearMoreData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-extra-linear-regression-visual")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 0)
      .transition()
      .ease(d3.easeBackOut)
      .duration(1000)
      .attr("r", 20);
  }

  function calculateRMSE(weights, dataPoints) {
    const error = dataPoints.reduce((acc, { x, y }) => {
      const predictedY = weights.reduce((sum, weight, idx) => sum + weight * Math.pow(x, idx), 0);
      return acc + Math.pow(y - predictedY, 2);
    }, 0);

    const rmse = Math.sqrt(error / dataPoints.length);
    return isNaN(rmse) ? 0 : rmse;
  }

  function drawAndTransitionGroundTruthLine(type) {
    const x = d3.range(0, 10, 0.01);
    let y;

    if (type === "linear") {
      y = x.map((x) => 2 + (8 / 10) * x);
    } else {
      y = x.map((x) => 3 * Math.sin(x / 1.5) + 5);
    }

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let path = axesRef.current.selectAll(".ground-truth-path").data([x.map((d, i) => ({ x: d, y: y[i] }))]);

    path
      .enter()
      .append("path")
      .attr("class", "ground-truth-path")
      .attr("d", line)
      .merge(path)
      .transition()
      .duration(500)
      .attr("d", line);
  }

  function updateRMSEText(weights, polyDegree, dataPoints) {
    const RMSE = calculateRMSE(weights, dataPoints);
    const RMSEText = svg.current.selectAll(".RMSE-text-linear-regression-visual").data([RMSE]);

    RMSEText.enter()
      .append("text")
      .attr("class", "RMSE-text-linear-regression-visual")
      .attr("x", 100)
      .attr("y", 850)
      .text(`RMSE: ${RMSE.toFixed(2)}`)
      .merge(RMSEText)
      .text(`RMSE: ${RMSE.toFixed(2)}`);

    const DegreeText = svg.current.selectAll(".degree-text-linear-regression-visual").data([polyDegree]);

    DegreeText.enter()
      .append("text")
      .attr("class", "degree-text-linear-regression-visual")
      .attr("x", 100)
      .attr("y", 900)
      .text(`Deg: ${polyDegree}`)
      .merge(DegreeText)
      .text(`Deg: ${polyDegree}`);
  }

  function drawCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", className);
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
      .attr("opacity", 0.5)
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
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg, "x", 970, yScale(0), "x1-label-linear-regression-visual", "", 25);
    latexOntoSvg(svg, "t", xScale(0), 30, "x2-label-linear-regression-visual", "", 25);
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

    let path = axesRef.current.selectAll(".regression-path-visual").data([decisionBoundary]);
    path.transition().duration(500).attr("d", line);
    path.enter().append("path").attr("class", "regression-path-visual").attr("d", line);
  }

  function updateVerticalLinesToRegression(dataPoints, weights, polyDegree) {
    const leastSquareRegressionLine = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const verticalLines = axesRef.current.selectAll(".vertical-lines-to-regression-path-visual").data(dataPoints);

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

  function updatePoints(newData) {
    const points = svg.current.selectAll(".data-point-linear-regression-visual").data(newData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-linear-regression-visual")
      .attr("r", 20)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .merge(points)
      .transition()
      .duration(500)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y));

    points.exit().transition().duration(1000).attr("r", 0).remove();
  }

  function newDataPoint(xValue) {
    const circle = svg.current
      .append("circle")
      .attr("class", "breathing-point")
      .attr("r", 20)
      .attr("cx", xScale(xValue))
      .attr("cy", yScale(0));

    const breathe = () => {
      circle.transition().duration(1000).attr("r", 30).transition().duration(1000).attr("r", 20).on("end", breathe);
    };
    breathe();
  }

  function drawPredictionForNewDataPoint(xValue, polyDegree, dataPoints) {
    const weights = calculateRegressionLine(dataPoints, polyDegree);
    const phiX = generateBasisFunctions(xValue, polyDegree);
    const height = numeric.dot(phiX, weights)[0];

    let arrowGroup = axesRef.current.select(".prediction-arrow-new-data-point");

    if (arrowGroup.empty()) {
      arrowGroup = axesRef.current.append("g").attr("class", "prediction-arrow-new-data-point");
    }

    const markerId = "arrowhead";
    let defs = arrowGroup.selectAll("defs").data([1]);
    defs = defs.enter().append("defs").merge(defs);

    let marker = defs.selectAll("marker").data([1]);
    marker = marker
      .enter()
      .append("marker")
      .attr("id", markerId)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 3)
      .attr("markerHeight", 3)
      .attr("orient", "auto-start-reverse")
      .merge(marker);

    let arrowPath = marker.selectAll("path").data([1]);
    arrowPath = arrowPath
      .enter()
      .append("path")
      .attr("class", "arrow-head")
      .attr("d", "M0,-5L10,0L0,5")
      .merge(arrowPath);

    let arrowLine = arrowGroup.selectAll("line").data([1]);
    arrowLine = arrowLine
      .enter()
      .append("line")
      .attr("x1", xScale(xValue))
      .attr("y1", yScale(0))
      .attr("x2", xScale(xValue))
      .attr("y2", yScale(0))
      .attr("marker-end", `url(#${markerId})`)
      .merge(arrowLine);

    arrowLine.transition().duration(500).attr("x2", xScale(xValue)).attr("y2", yScale(height));
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
