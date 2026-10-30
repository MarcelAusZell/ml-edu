import { useRef, useEffect } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import numeric from "numeric";
import "./visual.scss";

const xScaleXOR = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScaleXOR = d3.scaleLinear().domain([0, 10]).range([950, 50]);

const xScale1D = d3.scaleLinear().domain([-1, 4]).range([50, 950]);
const yScale1D = d3.scaleLinear().domain([-2, -2]).range([800, 800]);

const xScale2D = d3.scaleLinear().domain([-2, 2]).range([250, 750]);
const yScale2D = d3.scaleLinear().domain([-2, 2]).range([550, 50]);

const xScalePolyBasis = d3.scaleLinear().domain([-0.5, 0.5]).range([50, 950]);
const yScalePolyBasis = d3.scaleLinear().domain([-5, 5]).range([950, 50]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const XORdataPoints = [
    { x: 2.5, y: 7.5, t: 1 },
    { x: 2.5, y: 2.5, t: -1 },
    { x: 7.5, y: 2.5, t: 1 },
    { x: 7.5, y: 7.5, t: -1 },
  ];

  const notLinearlySeparableDataPoints = [
    { x: -0.25, y: 0, t: 1 },
    { x: 0.25, y: 0.25, t: 1 },
    { x: 0.5, y: 0.5, t: 1 },
    { x: -0.15, y: 0.8, t: 1 },
    { x: 0, y: -0.5, t: 1 },
    { x: -0.5, y: -0.65, t: 1 },
    { x: -0.6, y: 0.5, t: 1 },
    { x: 0.5, y: -0.55, t: 1 },
    { x: -0.8, y: 0.1, t: 1 },
    { x: 0.8, y: -0.1, t: 1 },

    { x: -1, y: 1.5, t: -1 },
    { x: -1.5, y: 1, t: -1 },
    { x: -1.6, y: 0.25, t: -1 },
    { x: 0, y: 1.3, t: -1 },
    { x: 1, y: 1.5, t: -1 },
    { x: 1.6, y: -1, t: -1 },
    { x: 1, y: 1, t: -1 },
    { x: 1.5, y: 0.5, t: -1 },
    { x: -1, y: -1.5, t: -1 },
    { x: 0, y: -1.4, t: -1 },
    { x: -1.5, y: -1, t: -1 },
    { x: 1, y: 1.5, t: -1 },
    { x: 1, y: -1.3, t: -1 },
  ];

  const polyBasisDataPoints = [
    { x: -0.4, y: 0, t: 1 },
    { x: -0.2, y: 0, t: -1 },
    { x: 0.2, y: 0, t: 1 },
    { x: 0.4, y: 0, t: -1 },
  ];

  const polyBasisDataPoints2 = [
    { x: -0.4, y: 2.5, t: 1 },
    { x: -0.2, y: -2.5, t: -1 },
    { x: 0.2, y: -2.5, t: 1 },
    { x: 0.4, y: 2.5, t: -1 },
  ];

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        drawXORAxes(svgRef, xScaleXOR, yScaleXOR, 950, 50, axesRef, "coord-system-xor");
        drawXORPoints(XORdataPoints, 30, "basis-function-data-point-xor");
      },
      remove: () => {
        d3.selectAll(".coord-system-xor").remove();
        d3.selectAll(".basis-function-data-point-xor").remove();
        d3.selectAll(".latex-xor-axis-label").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        draw2DCoordSystem(svgRef, xScale2D, yScale2D, 300, 500, axesRef, "coord-system-2d");
        draw2DPoints(notLinearlySeparableDataPoints, 20, "basis-function-data-point-2d");
      },
      remove: () => {
        d3.selectAll(".coord-system-2d").remove();
        d3.selectAll(".basis-function-data-point-2d").remove();
        d3.selectAll(".latex-2d-axis-label").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        draw1DCoordSystem(svgRef, xScale1D, yScale1D, 800, 800, axesRef, "coord-system-1d");
        draw1DPoints(notLinearlySeparableDataPoints, 20, "basis-function-data-point-1d");
      },
      remove: () => {
        d3.selectAll(".coord-system-1d").remove();
        d3.selectAll(".basis-function-data-point-1d").remove();
        d3.selectAll(".latex-1d-axis-label").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        drawLinearDecisionBoundary();
      },
      remove: () => {
        d3.selectAll(".linear-decision-boundary").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        drawNonlinearDecisionBoundary();
      },
      remove: () => {
        d3.selectAll(".nonlinear-decision-boundary").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 10,
      action: () => {
        drawCoordSystemPolyBasis(
          svgRef,
          xScalePolyBasis,
          yScalePolyBasis,
          500,
          500,
          axesRef,
          "coord-system-poly-basis"
        );
      },
      remove: () => {
        d3.selectAll(".basis-function-data-point-poly-basis").remove();
        d3.selectAll(".coord-system-poly-basis").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 8,
      action: () => {
        drawOrUpdatePolyBasisPoints(polyBasisDataPoints, 20, "basis-function-data-point-poly-basis");
        latexOntoSvg(svg.current, "x", 975, 500, "latex-basis-1d-label", "", 25);
      },
      remove: () => {
        d3.selectAll(".latex-basis-1d-label").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 8,
      action: () => {
        calculateDecisionBoundaryWithBasisFunctions(polyBasisDataPoints);
      },
      remove: () => {
        d3.selectAll(".lq-poly-basis-decision-boundary").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        drawVerticalClassSepartors();
      },
      remove: () => {
        d3.selectAll(".class-separator-polynomial-basis-function").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 10,
      action: () => {
        drawAnimatedyAxisLine();
        drawOrUpdatePolyBasisPoints(polyBasisDataPoints2, 20, "basis-function-data-point-poly-basis");
      },
      remove: () => {
        d3.selectAll(".y-axis-line-animated").remove();
        d3.selectAll(".latex-basis-2d-label").remove();
      },
      called: false,
    },

    {
      start: 10,
      end: 10,
      action: () => {
        plotLSQActivatedWithPolynomialBasis(polyBasisDataPoints2);
      },
      remove: () => {
        d3.selectAll(".lq-poly-basis-2D-decision-boundary").remove();
      },
      called: false,
    },
  ]).current;

  function drawXORPoints(points, radius, className) {
    svg.current
      .selectAll(`.${className}`)
      .data(points)
      .enter()
      .append("circle")
      .attr("class", className)
      .attr("cx", (d) => xScaleXOR(d.x))
      .attr("cy", (d) => yScaleXOR(d.y))
      .attr("fill", (d) => (d.t === 1 ? "orange" : "steelblue"))
      .attr("r", radius);
  }

  function draw2DPoints(points, radius, className) {
    for (let i = 0; i < points.length; i++) {
      svg.current
        .append("circle")
        .attr("class", className)
        .attr("cx", xScale2D(points[i].x))
        .attr("cy", yScale2D(points[i].y))
        .attr("fill", points[i].t === 1 ? "orange" : "steelblue")
        .attr("r", 0)
        .transition()
        .ease(d3.easeBackOut)
        .duration(500)
        .attr("r", radius);
    }
  }

  function draw1DPoints(points, radius, className) {
    for (let i = 0; i < points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;
      let t = points[i].t;
      let x1 = x ** 2 + y ** 2;
      let y1 = 0;
      let color = t === 1 ? "orange" : "steelblue";
      svg.current
        .append("circle")
        .attr("class", className)
        .attr("cx", xScale2D(x))
        .attr("cy", yScale2D(y))
        .attr("r", radius)
        .attr("fill", color)
        .transition()
        .duration(1500)
        .ease(d3.easeExpIn)
        .attr("cx", xScale1D(x1))
        .attr("cy", yScale1D(y1));
    }
  }

  function drawLinearDecisionBoundary() {
    axesRef.current
      .append("line")
      .attr("class", "linear-decision-boundary")
      .attr("x1", 450)
      .attr("y1", 850)
      .attr("x2", 450)
      .attr("y2", 850)
      .transition()
      .ease(d3.easeBackOut)
      .duration(500)
      .attr("x2", 450)
      .attr("y2", 750);
  }

  function drawXORAxes(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
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

    latexOntoSvg(svg, "x_1", xScale(0), 30, "latex-xor-axis-label", "", 25);
    latexOntoSvg(svg, "x_2", 970, yScale(0), "latex-xor-axis-label", "", 25);
  }
  function draw1DCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
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
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg, "x", xScale(4.1), yScale(0), "latex-1d-axis-label", "", 25);
  }

  function draw2DCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
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

    latexOntoSvg(svg, "x_1", xScale(2.15), yScale(0), "latex-2d-axis-label", "", 25);
    latexOntoSvg(svg, "x_2", xScale(0), yScale(2.1), "latex-2d-axis-label", "", 25);
  }

  function drawCoordSystemPolyBasis(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
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
  }

  function drawNonlinearDecisionBoundary(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
    const circle = axesRef.current
      .append("circle")
      .attr("class", "nonlinear-decision-boundary")
      .attr("cx", xScale2D(0))
      .attr("cy", yScale2D(0))
      .attr("r", 145)
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("fill", "none");

    const circumference = 2 * Math.PI * 145;

    circle
      .attr("stroke-dasharray", circumference)
      .attr("stroke-dashoffset", circumference)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  function drawAnimatedyAxisLine() {
    svg.current
      .append("line")
      .attr("x1", 50)
      .attr("y1", 950)
      .attr("x2", 50)
      .attr("y2", 950)
      .attr("class", "y-axis-line-animated")
      .transition()
      .ease(d3.easeBackOut.overshoot(0.2))
      .duration(500)
      .attr("x2, 50")
      .attr("y2", 50);

    latexOntoSvg(svg.current, "x_1", 970, 500, "latex-basis-2d-label", "", 25);
    latexOntoSvg(svg.current, "x_2", 50, 30, "latex-basis-2d-label", "", 25);
  }

  function drawOrUpdatePolyBasisPoints(points, radius, className) {
    const circles = svg.current.selectAll(`.${className}`).data(points);

    circles
      .enter()
      .append("circle")
      .attr("class", className)
      .attr("cx", (d) => xScalePolyBasis(d.x))
      .attr("cy", (d) => yScalePolyBasis(d.y))
      .attr("fill", (d) => (d.t === 1 ? "orange" : "steelblue"))
      .attr("r", radius);

    circles
      .transition()
      .ease(d3.easeBackOut)
      .duration(500)
      .attr("cx", (d) => xScalePolyBasis(d.x))
      .attr("cy", (d) => yScalePolyBasis(d.y));

    circles.exit().remove();
  }

  function calculateDecisionBoundaryWithBasisFunctions(points) {
    const hasPositive = points.some((point) => point.t === 1);
    const hasNegative = points.some((point) => point.t === -1);
    if (!hasPositive || !hasNegative) return;

    const polyDegree = 4;

    const X = points.map((d) => generateBasisFunctions(d.x, polyDegree));
    const t = points.map((d) => d.t);

    let weights = new Array(polyDegree + 1).fill(0.1);

    const learningRate = 0.25;
    const maxIterations = 10000;
    const tolerance = 1e-5;

    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = X.map((x) => {
        const z = numeric.dot(x, weights);
        return Math.tanh(z);
      });

      const errors = numeric.sub(predictions, t);

      const gradient = X.reduce((grad, x, idx) => {
        const derivativeTanh = errors[idx] * (1 - Math.tanh(predictions[idx]) ** 2);
        return numeric.add(grad, numeric.mul(derivativeTanh, x));
      }, new Array(polyDegree + 1).fill(0));

      weights = numeric.sub(weights, numeric.mul(learningRate, gradient));

      if (numeric.norm2(gradient) < tolerance) {
        break;
      }
    }

    const xValues = d3.range(-0.5, 0.5, 0.01);
    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z };
    });

    const line = d3
      .line()
      .x((d) => xScalePolyBasis(d.x))
      .y((d) => yScalePolyBasis(d.y));

    const path = axesRef.current
      .append("path")
      .datum(decisionBoundary)
      .attr("class", "lq-poly-basis-decision-boundary")
      .attr("d", line);

    // Berechnen der Pfadlänge
    const totalLength = path.node().getTotalLength();

    // Initialisieren der Dash-Array-Animation
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .attr("stroke-dashoffset", 0);
  }

  function generateBasisFunctions(x, degree) {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      basisFunctions.push(Math.pow(x, i));
    }
    return basisFunctions;
  }

  function drawVerticalClassSepartors() {
    const zeroCrossings = [-0.33, 0, 0.33];
    const lineGroup = axesRef.current.selectAll(".class-separator-polynomial-basis-function").data(zeroCrossings);
    lineGroup
      .enter()
      .append("line")
      .attr("class", "class-separator-polynomial-basis-function")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("x1", (d) => xScalePolyBasis(d))
      .attr("x2", (d) => xScalePolyBasis(d))
      .attr("y1", 1000)
      .attr("y2", 1000)
      .merge(lineGroup)
      .transition()
      .ease(d3.easeBackOut)
      .duration(600)
      .attr("x1", (d) => xScalePolyBasis(d))
      .attr("x2", (d) => xScalePolyBasis(d))
      .attr("y1", 0)
      .attr("y2", 1000);

    lineGroup.exit().remove();
  }

  function plotLSQActivatedWithPolynomialBasis() {
    const boundaryPointsSmallerZero = [
      {
        x: -0.5,
        y: 0,
      },
      {
        x: -0.41999999999999993,
        y: -8.444460408707499e-14,
      },
      {
        x: -0.32999999999999985,
        y: -0.005000000000084445,
      },
      {
        x: -0.2699999999999998,
        y: -0.010000000000084445,
      },
      {
        x: -0.22999999999999976,
        y: -0.015000000000084446,
      },
      {
        x: -0.1749999999999997,
        y: -0.025000000000084448,
      },
      {
        x: -0.1549999999999997,
        y: -0.03000000000008445,
      },
      {
        x: -0.12499999999999967,
        y: -0.04000000000008445,
      },
      {
        x: -0.09499999999999964,
        y: -0.05500000000008444,
      },
      {
        x: -0.07499999999999962,
        y: -0.07000000000008444,
      },
      {
        x: -0.06999999999999962,
        y: -0.07500000000008444,
      },
      {
        x: -0.06499999999999961,
        y: -0.08000000000008445,
      },
      {
        x: -0.04999999999999962,
        y: -0.10000000000008447,
      },
      {
        x: -0.044999999999999624,
        y: -0.11000000000008447,
      },
      {
        x: -0.039999999999999626,
        y: -0.12000000000008448,
      },
      {
        x: -0.03499999999999963,
        y: -0.1300000000000845,
      },
      {
        x: -0.029999999999999628,
        y: -0.1450000000000845,
      },
      {
        x: -0.014999999999999625,
        y: -0.21000000000008456,
      },
      {
        x: -0.009999999999999624,
        y: -0.2450000000000846,
      },
      {
        x: -0.004999999999999624,
        y: -0.30000000000008464,
      },
      {
        x: 3.7643499428696714e-16,
        y: -0.40000000000008473,
      },
      {
        x: 3.7643499428696714e-16,
        y: -1.015000000000085,
      },
      {
        x: 3.7643499428696714e-16,
        y: -1.0200000000000848,
      },
      {
        x: -0.004999999999999624,
        y: -1.3350000000000781,
      },
      {
        x: -0.009999999999999624,
        y: -1.6100000000000723,
      },
      {
        x: -0.019999999999999626,
        y: -2.1100000000000616,
      },
      {
        x: -0.03499999999999963,
        y: -2.8150000000000466,
      },
      {
        x: -0.039999999999999626,
        y: -3.0450000000000417,
      },
      {
        x: -0.044999999999999624,
        y: -3.2750000000000368,
      },
      {
        x: -0.06999999999999962,
        y: -4.400000000000013,
      },
      {
        x: -0.085,
        y: -5,
      },
    ];

    const boundaryPointsBiggerZero = [
      {
        x: 0.15000000000000007,
        y: 5,
      },
      {
        x: 0.14000000000000007,
        y: 4.57499999999984,
      },
      {
        x: 0.10500000000000004,
        y: 2.994999999999874,
      },
      {
        x: 0.09500000000000003,
        y: 2.529999999999884,
      },
      {
        x: 0.08500000000000002,
        y: 2.049999999999894,
      },
      {
        x: 0.07500000000000001,
        y: 1.5399999999999048,
      },
      {
        x: 0.07,
        y: 1.2549999999999109,
      },
      {
        x: 0.065,
        y: 0.8799999999999162,
      },
      {
        x: 0.065,
        y: 0.8749999999999162,
      },
      {
        x: 0.065,
        y: 0.8699999999999162,
      },
      {
        x: 0.065,
        y: 0.8649999999999162,
      },
      {
        x: 0.065,
        y: 0.5599999999999159,
      },
      {
        x: 0.065,
        y: 0.5549999999999159,
      },
      {
        x: 0.065,
        y: 0.5499999999999159,
      },
      {
        x: 0.065,
        y: 0.5449999999999159,
      },
      {
        x: 0.07,
        y: 0.3899999999999158,
      },
      {
        x: 0.07,
        y: 0.3849999999999158,
      },
      {
        x: 0.07500000000000001,
        y: 0.31999999999991574,
      },
      {
        x: 0.08000000000000002,
        y: 0.2749999999999157,
      },
      {
        x: 0.08500000000000002,
        y: 0.2449999999999157,
      },
      {
        x: 0.10500000000000004,
        y: 0.17499999999991564,
      },
      {
        x: 0.11000000000000004,
        y: 0.16499999999991563,
      },
      {
        x: 0.13000000000000006,
        y: 0.1349999999999156,
      },
      {
        x: 0.14500000000000007,
        y: 0.11999999999991559,
      },
      {
        x: 0.1650000000000001,
        y: 0.10499999999991558,
      },
      {
        x: 0.1750000000000001,
        y: 0.09999999999991557,
      },
      {
        x: 0.1850000000000001,
        y: 0.09499999999991557,
      },
      {
        x: 0.21000000000000013,
        y: 0.08499999999991556,
      },
      {
        x: 0.25000000000000017,
        y: 0.07499999999991555,
      },
      {
        x: 0.2750000000000002,
        y: 0.06999999999991555,
      },
      {
        x: 0.3100000000000002,
        y: 0.06499999999991554,
      },
      {
        x: 0.35500000000000026,
        y: 0.059999999999915545,
      },
      {
        x: 0.4200000000000003,
        y: 0.05499999999991555,
      },
      {
        x: 0.4250000000000003,
        y: 0.05499999999991555,
      },
      {
        x: 0.5,
        y: 0.0535,
      },
    ];

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x((d) => xScalePolyBasis(d.x))
      .y((d) => yScalePolyBasis(d.y));

    boundaryPointsSmallerZero.sort((a, b) => b.y - a.y);
    boundaryPointsBiggerZero.sort((a, b) => b.y - a.y);

    const drawPath = (data) => {
      const path = axesRef.current
        .append("path")
        .attr("class", "lq-poly-basis-2D-decision-boundary")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none");

      const totalLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(1000) // Dauer der Animation in Millisekunden
        .attr("stroke-dashoffset", 0);
    };

    boundaryPointsSmallerZero.sort((a, b) => b.y - a.y);
    boundaryPointsBiggerZero.sort((a, b) => b.y - a.y);

    drawPath(boundaryPointsSmallerZero);
    drawPath(boundaryPointsBiggerZero);
  }

  function drawDebugGrid() {
    const g = svg.current.append("g");
    g.attr("stroke", "black").attr("stroke-width", 0.5).attr("stroke-opacity", 0.1);

    g.append("circle").attr("cx", 50).attr("cy", 50).attr("r", 1).attr("fill", "orange").attr("fill-opacity", 0.5);

    for (let i = 0; i <= 100; i += 10) {
      g.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", 100);
    }
    for (let i = 0; i <= 100; i += 10) {
      g.append("line").attr("x1", 0).attr("y1", i).attr("x2", 100).attr("y2", i);
    }
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
