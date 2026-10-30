import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./1st-vs-2st-gradient-descent.scss";

export default function GradientDescentComparisonInteractive() {
  const svgRef = useRef();
  const coordSystemRefFirstOrder = useRef();
  const coordSystemRefSecondOrder = useRef();
  const xStart = -1;
  const xEnd = 5.3;
  const yStart = 0;
  const yEnd = 200;
  const xScaleFirstOrder = d3.scaleLinear().domain([xStart, xEnd]).range([5, 95]);
  const yScaleFirstOrder = d3.scaleLinear().domain([yStart, yEnd]).range([45, 5]);

  const xScaleSecondOrder = d3.scaleLinear().domain([xStart, xEnd]).range([5, 95]);
  const yScaleSecondOrder = d3.scaleLinear().domain([yStart, yEnd]).range([95, 55]);

  const learningRate = 0.02;
  const startPoint = 5;
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    drawCoordSystem(svgRef, xScaleFirstOrder, yScaleFirstOrder, 45, 5, coordSystemRefFirstOrder);
    drawCoordSystem(svgRef, xScaleSecondOrder, yScaleSecondOrder, 95, 5, coordSystemRefSecondOrder);
    plotPolynomial();
  }, []);

  useEffect(() => {
    d3.selectAll(".gradient-descent-comparison-point").remove();

    drawFirstOrderGradientDescent();
    drawSecondOrderGradientDescent();
  }, [steps]);

  function plotPolynomial() {
    const x = d3.range(xScaleFirstOrder.domain()[0], xScaleFirstOrder.domain()[1], 0.01);
    const y = x.map((xVal) => xVal ** 3 + 2 * xVal ** 2);

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
      "gradient-descent-polynomial-interactive-first-order"
    );
    drawPath(
      xScaleSecondOrder,
      yScaleSecondOrder,
      coordSystemRefSecondOrder,
      "gradient-descent-polynomial-interactive-second-order"
    );
  }

  function drawFirstOrderGradientDescent() {
    const fun = (x) => x ** 3 + 2 * x ** 2;
    const gradient = (x) => 3 * x ** 2 + 4 * x;
    const circleRadius = 1.5;

    let xCurrent = startPoint;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;

    drawCurrentStep(
      xCurrent,
      yCurrent,
      circleRadius,
      xScaleFirstOrder,
      yScaleFirstOrder,
      coordSystemRefFirstOrder
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
        coordSystemRefFirstOrder
      );

      xCurrent = xNext;

      if (Math.abs(gradient(xCurrent)) < tol) break;
    }

    drawTangentAndStepLines(xCurrent, gradient, fun);
    let currentGradient = gradient(xCurrent);

    const gradientText = coordSystemRefFirstOrder.current
      .selectAll(".gradient-value-text")
      .data([currentGradient]);

    gradientText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "gradient-value-text")
          .attr("x", xScaleFirstOrder(-0.5))
          .attr("y", yScaleFirstOrder(180))
          .attr("font-size", "2px")
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`),
      (update) =>
        update
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`)
    );

    const stepText = coordSystemRefFirstOrder.current.selectAll(".step-value-text").data([steps]);

    stepText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "step-value-text")
          .attr("x", xScaleFirstOrder(-0.5))
          .attr("y", yScaleFirstOrder(165))
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

  function drawSecondOrderGradientDescent() {
    const fun = (x) => x ** 3 + 2 * x ** 2;
    const gradient = (x) => 3 * x ** 2 + 4 * x;
    const hessian = (x) => 6 * x + 4;
    const circleRadius = 1.5;

    let xCurrent = startPoint;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;

    drawCurrentStep(
      xCurrent,
      yCurrent,
      circleRadius,
      xScaleSecondOrder,
      yScaleSecondOrder,
      coordSystemRefSecondOrder
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
        coordSystemRefSecondOrder
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

    const gradientText = coordSystemRefSecondOrder.current
      .selectAll(".gradient-value-text")
      .data([currentGradient]);

    gradientText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "gradient-value-text")
          .attr("x", xScaleSecondOrder(-0.5))
          .attr("y", yScaleSecondOrder(180))
          .attr("font-size", "2px")
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`),
      (update) =>
        update
          .attr("fill-opacity", (d) => (d.toFixed(1) == 0.0 ? 0.5 : 1))
          .text((d) => `Gradient: ${d.toFixed(1)}`)
    );

    const stepText = coordSystemRefSecondOrder.current.selectAll(".step-value-text").data([steps]);

    stepText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", "step-value-text")
          .attr("x", xScaleSecondOrder(-0.5))
          .attr("y", yScaleSecondOrder(165))
          .attr("font-size", "2px")
          .attr("fill", "black")
          .text((d) => `Steps: ${d}`),
      (update) => update.text((d) => `Steps: ${d}`)
    );
  }

  function drawParabola(x0, gradient, hessian, xScale, yScale, coordSystemRef) {
    const fun = (x) => x ** 3 + 2 * x ** 2;

    const xDomain = xScale.domain();
    const a = hessian / 2;
    const b = gradient - hessian * x0;
    const c = fun(x0) - a * x0 ** 2 - b * x0;

    const xValues = d3.range(xDomain[0], xDomain[1], 0.01);
    const yValues = xValues.map((x) => a * x ** 2 + b * x + c);

    const line = d3
      .line()
      .x((d, i) => xScale(xValues[i]))
      .y((d, i) => yScale(yValues[i]));

    coordSystemRef.current.selectAll(".second-gd-parabola").remove();
    coordSystemRef.current.append("path").attr("class", "second-gd-parabola").datum(yValues).attr("d", line);

    const min = -b / (2 * a);
    const minPoint = [min, a * min ** 2 + b * min + c];

    coordSystemRef.current.selectAll(".second-gd-min-point").remove();

    coordSystemRef.current
      .append("circle")
      .attr("class", "second-gd-min-point")
      .attr("cx", xScale(minPoint[0]))
      .attr("cy", yScale(minPoint[1]))
      .attr("r", 1);

    coordSystemRef.current.selectAll(".second-gd-min-line").remove();

    coordSystemRef.current
      .append("line")
      .attr("class", "second-gd-min-line")
      .attr("x1", xScale(minPoint[0]))
      .attr("y1", yScale(minPoint[1]))
      .attr("x2", xScale(minPoint[0]))
      .attr("y2", yScale(fun(minPoint[0])));
  }

  function drawCurrentStep(xNext, yNext, circleRadius, xScale, yScale, coordSystemRef) {
    const newCircle = coordSystemRef.current
      .append("circle")
      .attr("class", "gradient-descent-comparison-point")
      .attr("cx", xScale(xNext))
      .attr("cy", yScale(yNext))
      .attr("r", circleRadius);
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
      .append("clipPath")
      .attr("id", "clip-path")
      .append("rect")
      .attr("width", xScale.range()[1] - xScale.range()[0])
      .attr("height", yScale.range()[0] - yScale.range()[1])
      .attr("x", xScale.range()[0])
      .attr("y", yScale.range()[1]);
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef}  height={500} viewBox={`0 0 100 100`} />
      </div>
      <div className="setting-container-gradient-descent-comparison">
        <div className="interactive-slider-container">
          <span>Steps: {steps}</span>
          <input
            className="form-range"
            type="range"
            min="0"
            max="60"
            step="1"
            value={steps}
            onChange={(e) => setSteps(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </>
  );
}
