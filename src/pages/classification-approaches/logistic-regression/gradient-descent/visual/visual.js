import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric, { t } from "numeric";
import "./visual.scss";

export default function Visual({ currentStep, currentInnerStep, scrollProgress, innerScrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const coordSystemRefFirstOrder = useRef();
  const coordSystemRefSecondOrder = useRef();
  const coordSystemRefLearningRate = useRef();
  const xStart = 1;
  const xEnd = 3;
  const yStart = 0;
  const yEnd = 1;
  const xScaleFirstOrder = d3.scaleLinear().domain([xStart, xEnd]).range([5, 95]);
  const yScaleFirstOrder = d3.scaleLinear().domain([yStart, yEnd]).range([45, 5]);
  const xScaleSecondOrder = d3.scaleLinear().domain([xStart, xEnd]).range([5, 95]);
  const yScaleSecondOrder = d3.scaleLinear().domain([yStart, yEnd]).range([95, 55]);
  const xScaleLearningRate = d3.scaleLinear().domain([0, 10]).range([5, 95]);
  const yScaleLearningRate = d3.scaleLinear().domain([0, 10]).range([95, 5]);

  const learningRate = 0.1;
  const startPoint = 2.8;
  const startPointLearningRate = 9;

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 7,
      action: () => {
        drawCoordSystem(svgRef, xScaleFirstOrder, yScaleFirstOrder, 45, 5, coordSystemRefFirstOrder);
        drawCoordSystem(svgRef, xScaleSecondOrder, yScaleSecondOrder, 95, 5, coordSystemRefSecondOrder);
        plotPolynomial();
      },
      remove: () => {
        coordSystemRefFirstOrder.current.selectAll("*").remove();
        coordSystemRefSecondOrder.current.selectAll("*").remove();
        coordSystemRefSecondOrder.current.selectAll(".gradient-value-text").remove();
        coordSystemRefSecondOrder.current.selectAll(".step-value-text").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-parabola").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-min-point").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-min-line").remove();
        d3.selectAll(".gradient-descent-point-second-order").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 7,
      action: () => {
      },
      remove: () => {
        coordSystemRefFirstOrder.current.selectAll(".gradient-value-text").remove();
        coordSystemRefFirstOrder.current.selectAll(".step-value-text").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-tangent-line").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-step-line").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-support-step-line").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        drawFirstOrderGradientDescent(0);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        drawFirstOrderGradientDescent(1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 7,
      action: () => {
        drawFirstOrderGradientDescent(14);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 7,
      action: () => {},
      remove: () => {
        coordSystemRefFirstOrder.current.selectAll(".gradient-descent-point-first-order").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-tangent-line").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-step-line").remove();
        coordSystemRefFirstOrder.current.selectAll(".first-gd-support-step-line").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 7,
      action: () => {},
      remove: () => {
        coordSystemRefSecondOrder.current.selectAll(".gradient-value-text").remove();
        coordSystemRefSecondOrder.current.selectAll(".step-value-text").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-parabola").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-min-point").remove();
        coordSystemRefSecondOrder.current.selectAll(".second-gd-min-line").remove();

        d3.selectAll(".gradient-descent-point-second-order").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        drawSecondOrderGradientDescent(0);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        drawSecondOrderGradientDescent(1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        drawSecondOrderGradientDescent(3);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 11,
      action: () => {
        drawCoordSystem(svgRef, xScaleLearningRate, yScaleLearningRate, 95, 5, coordSystemRefLearningRate);
        plotLearningRateParobola();
      },
      remove: () => {
        coordSystemRefLearningRate.current.selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        gradientDescentLearningRate(10, 0.2);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        gradientDescentLearningRate(10, 1.8);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 10,
      action: () => {
        gradientDescentLearningRate(10, 2.05);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  /*---------------------------------------------------------------------------------------*/

  function plotLearningRateParobola() {
    const x = d3.range(xScaleLearningRate.domain()[0] + 0.5, xScaleLearningRate.domain()[1] - 0.5, 0.01);
    const y = x.map((d) => 0.5 * (d - 5) ** 2);

    const line = d3
      .line()
      .x((d, i) => xScaleLearningRate(x[i]))
      .y((d, i) => yScaleLearningRate(y[i]));

    const path = coordSystemRefLearningRate.current
      .append("path")
      .attr("class", "gradient-descent-polynomial-interactive")
      .datum(y)
      .attr("d", line);

    path.lower();
  }

  function gradientDescentLearningRate(steps, learningRate) {
    const fun = (x) => 0.5 * (x - 5) ** 2;
    const gradient = (x) => x - 5;
    const circleRadius = 1.5;

    let xCurrent = startPointLearningRate;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;
    let previousPoint = [xCurrent, yCurrent];

    coordSystemRefLearningRate.current.selectAll(".learning-rate-demo-point-visual").remove();
    coordSystemRefLearningRate.current.selectAll(".gradient-descent-arrow-visual").remove();

    drawLearningRateSteps(xCurrent, yCurrent, circleRadius);
    for (let i = 0; i < steps; i++) {
      const xNext = xCurrent - learningRate * gradient(xCurrent);
      const yNext = fun(xNext);

      drawLearningRateSteps(xNext, yNext, circleRadius);
      drawArrow(previousPoint, xNext, yNext, circleRadius);

      previousPoint = [xNext, yNext];
      xCurrent = xNext;

      if (Math.abs(gradient(xCurrent)) < tol) break;
    }
  }

  function drawLearningRateSteps(xNext, yNext, circleRadius) {
    const newCircle = coordSystemRefLearningRate.current
      .append("circle")
      .attr("class", "learning-rate-demo-point-visual")
      .attr("cx", xScaleLearningRate(xNext))
      .attr("cy", yScaleLearningRate(yNext))
      .attr("r", circleRadius);
  }

  function drawArrow(previousPoint, xNext, yNext, circleRadius) {
    const angle = Math.atan2(yNext - previousPoint[1], xNext - previousPoint[0]);
    const xEnd = xNext - (circleRadius / 100) * Math.cos(angle);
    const yEnd = yNext - (circleRadius / 100) * Math.sin(angle);

    coordSystemRefLearningRate.current
      .append("line")
      .attr("class", "gradient-descent-arrow-visual")
      .attr("x1", xScaleLearningRate(previousPoint[0]))
      .attr("y1", yScaleLearningRate(previousPoint[1]))
      .attr("x2", xScaleLearningRate(xEnd))
      .attr("y2", yScaleLearningRate(yEnd))
      .attr("marker-end", "url(#arrow)");
  }
  /*---------------------------------------------------------------------------------------*/

  function drawFirstOrderGradientDescent(steps) {
    const fun = (x) => 0.5 * (x - 2) ** 3 + (x - 2) ** 2;
    const gradient = (x) => 1.5 * (x - 2) ** 2 + 2 * (x - 2);
    const circleRadius = 1.5;

    let xCurrent = startPoint;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;
    d3.selectAll(".gradient-descent-point-first-order").remove();

    drawCurrentStep(
      xCurrent,
      yCurrent,
      circleRadius,
      xScaleFirstOrder,
      yScaleFirstOrder,
      coordSystemRefFirstOrder,
      "gradient-descent-point-first-order"
    );

    for (let i = 0; i < steps; i++) {
      const xNext = xCurrent - learningRate * gradient(xCurrent);
      const yNext = fun(xNext);

      drawCurrentStep(
        xNext,
        yNext,
        circleRadius,
        xScaleFirstOrder,
        yScaleFirstOrder,
        coordSystemRefFirstOrder,
        "gradient-descent-point-first-order"
      );

      xCurrent = xNext;

      if (Math.abs(gradient(xCurrent)) < tol) break;
    }
    drawTangentAndStepLines(xCurrent, gradient, fun);
    let currentGradient = gradient(xCurrent);

    const gradientText = coordSystemRefFirstOrder.current.selectAll(".gradient-value-text").data([currentGradient]);

    gradientText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "gradient-value-text")
          .attr("x", xScaleFirstOrder(1.1))
          .attr("y", yScaleFirstOrder(0.9))
          .attr("font-size", "2px")
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`),
      (update) =>
        update.attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1)).text((d) => `Gradient: ${d.toFixed(1)}`)
    );

    const stepText = coordSystemRefFirstOrder.current.selectAll(".step-value-text").data([steps]);

    stepText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "step-value-text")
          .attr("x", xScaleFirstOrder(1.1))
          .attr("y", yScaleFirstOrder(0.8))
          .attr("font-size", "2px")
          .attr("fill", "black")
          .text((d) => `Steps: ${d}`),
      (update) => update.text((d) => `Steps: ${d}`)
    );
  }

  function drawTangentAndStepLines(lastX, gradient, fun) {
    const xDomain = xScaleFirstOrder.domain();

    const tangentLine = d3
      .line()
      .x((d, i) => xScaleFirstOrder(xDomain[i]))
      .y((d, i) => yScaleFirstOrder(fun(lastX) + gradient(lastX) * (xDomain[i] - lastX)));

    coordSystemRefFirstOrder.current.selectAll(".first-gd-tangent-line").remove();
    coordSystemRefFirstOrder.current
      .append("path")
      .attr("class", "first-gd-tangent-line")
      .datum([0, 1])
      .attr("d", tangentLine)
      .attr("stroke", "black")
      .attr("clip-path", "url(#clip-path)");

    const stepLine = (x) => fun(lastX) + gradient(lastX) * (x - lastX);
    let stepStartX = lastX;
    let stepEndX = lastX - learningRate * gradient(lastX);

    coordSystemRefFirstOrder.current.selectAll(".first-gd-step-line").remove();
    coordSystemRefFirstOrder.current
      .append("line")
      .attr("class", "first-gd-step-line")
      .attr("x1", xScaleFirstOrder(stepStartX))
      .attr("y1", yScaleFirstOrder(fun(stepStartX)))
      .attr("x2", xScaleFirstOrder(stepEndX))
      .attr("y2", yScaleFirstOrder(stepLine(stepEndX)));

    drawSupportStepLines(stepStartX, stepEndX, fun);
  }

  function drawSupportStepLines(stepStartX, stepEndX, fun) {
    const supportLineData = [
      { x: stepEndX, y: 0, y2: fun(stepEndX) },
      { x: stepStartX, y: 0, y2: fun(stepStartX) },
    ];

    coordSystemRefFirstOrder.current.selectAll(".first-gd-support-step-line").remove();

    supportLineData.forEach((d) => {
      coordSystemRefFirstOrder.current
        .append("line")
        .attr("class", "first-gd-support-step-line")
        .attr("x1", xScaleFirstOrder(d.x))
        .attr("y1", yScaleFirstOrder(d.y))
        .attr("x2", xScaleFirstOrder(d.x))
        .attr("y2", yScaleFirstOrder(d.y2));
    });
  }

  function drawCurrentStep(xNext, yNext, circleRadius, xScale, yScale, coordSystemRef, className) {
    const newCircle = coordSystemRef.current
      .append("circle")
      .attr("class", className)
      .attr("cx", xScale(xNext))
      .attr("cy", yScale(yNext))
      .attr("r", circleRadius);
  }

  function plotPolynomial() {
    const x = d3.range(xScaleFirstOrder.domain()[0], xScaleFirstOrder.domain()[1] - 0.15, 0.01);
    const y = x.map((x) => 0.5 * (x - 2) ** 3 + (x - 2) ** 2);

    function drawPath(xScale, yScale, coordSystemRef, className) {
      const line = d3
        .line()
        .x((d, i) => xScale(x[i]))
        .y((d, i) => yScale(y[i]));

      coordSystemRef.current.append("path").attr("class", className).datum(y).attr("d", line);
    }

    drawPath(
      xScaleFirstOrder,
      yScaleFirstOrder,
      coordSystemRefFirstOrder,
      "gradient-descent-polynomial-interactive-first-order-visual"
    );
    drawPath(
      xScaleSecondOrder,
      yScaleSecondOrder,
      coordSystemRefSecondOrder,
      "gradient-descent-polynomial-interactive-second-order-visual"
    );
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
      .attr("stroke-width", 0.75)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "2px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 0.75)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "2px");


    coordSystem
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("class", "gradient-descent-arrow-head-visual");
  }

  function drawSecondOrderGradientDescent(steps) {
    const fun = (x) => 0.5 * (x - 2) ** 3 + (x - 2) ** 2;
    const gradient = (x) => 1.5 * (x - 2) ** 2 + 2 * (x - 2);
    const hessian = (x) => 3 * (x - 2) + 2;
    const circleRadius = 1.5;

    let xCurrent = startPoint;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;
    d3.selectAll(".gradient-descent-point-second-order").remove();

    drawCurrentStep(
      xCurrent,
      yCurrent,
      circleRadius,
      xScaleSecondOrder,
      yScaleSecondOrder,
      coordSystemRefSecondOrder,
      "gradient-descent-point-second-order"
    );

    for (let i = 0; i < steps; i++) {
      const xNext = xCurrent - gradient(xCurrent) / hessian(xCurrent);
      const yNext = fun(xNext);

      drawCurrentStep(
        xNext,
        yNext,
        circleRadius,
        xScaleSecondOrder,
        yScaleSecondOrder,
        coordSystemRefSecondOrder,
        "gradient-descent-point-second-order"
      );

      xCurrent = xNext;

      if (Math.abs(gradient(xCurrent)) < tol) break;
    }
    drawParabola(
      xCurrent,
      gradient(xCurrent),
      hessian(xCurrent),
      xScaleSecondOrder,
      yScaleSecondOrder,
      coordSystemRefSecondOrder
    );

    let currentGradient = gradient(xCurrent);

    const gradientText = coordSystemRefSecondOrder.current.selectAll(".gradient-value-text").data([currentGradient]);

    gradientText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "gradient-value-text")
          .attr("x", xScaleSecondOrder(1.1))
          .attr("y", yScaleSecondOrder(0.9))
          .attr("font-size", "2px")
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`),
      (update) =>
        update.attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1)).text((d) => `Gradient: ${d.toFixed(1)}`)
    );

    const stepText = coordSystemRefSecondOrder.current.selectAll(".step-value-text").data([steps]);

    stepText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "step-value-text")
          .attr("x", xScaleSecondOrder(1.1))
          .attr("y", yScaleSecondOrder(0.8))
          .attr("font-size", "2px")
          .attr("fill", "black")
          .text((d) => `Steps: ${d}`),
      (update) => update.text((d) => `Steps: ${d}`)
    );
  }

  function drawParabola(x0, gradient, hessian, xScale, yScale, coordSystemRef) {
    const fun = (x) => 0.5 * (x - 2) ** 3 + (x - 2) ** 2;

    const xDomain = xScale.domain();
    const a = hessian / 2;
    const b = gradient - hessian * x0;
    const c = fun(x0) - a * x0 ** 2 - b * x0;

    const xValues = d3.range(xDomain[0], xDomain[1], 0.01);
    const yValues = xValues.map((x) => a * x ** 2 + b * x + c);

    const filteredData = xValues.map((x, i) => ({ x, y: yValues[i] })).filter((d) => d.y <= 1);
    const filteredXValues = filteredData.map((d) => d.x);
    const filteredYValues = filteredData.map((d) => d.y);

    const line = d3
      .line()
      .x((d, i) => xScale(filteredXValues[i]))
      .y((d, i) => yScale(filteredYValues[i]));

    coordSystemRef.current.selectAll(".second-gd-parabola").remove();
    coordSystemRef.current.append("path").attr("class", "second-gd-parabola").datum(filteredYValues).attr("d", line);

    const min = -b / (2 * a);
    const minPoint = [min, a * min ** 2 + b * min + c];

    coordSystemRef.current.selectAll(".second-gd-min-point").remove();

    if (minPoint[1] <= 10) {
      coordSystemRef.current
        .append("circle")
        .attr("class", "second-gd-min-point")
        .attr("cx", xScale(minPoint[0]))
        .attr("cy", yScale(minPoint[1]))
        .attr("r", 1);
    }

    coordSystemRef.current.selectAll(".second-gd-min-line").remove();

    if (minPoint[1] <= 10) {
      coordSystemRef.current
        .append("line")
        .attr("class", "second-gd-min-line")
        .attr("x1", xScale(minPoint[0]))
        .attr("y1", yScale(minPoint[1]))
        .attr("x2", xScale(minPoint[0]))
        .attr("y2", yScale(fun(minPoint[0])));
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

  return <svg ref={svgRef} viewBox="0 0 100 100" />;
}
