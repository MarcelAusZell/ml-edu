import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./gradient-descent-interactive.scss";

export default function GradientDescentInteractive() {
  const svgRef = useRef();
  const coordSystemRef = useRef();
  const xScale = d3.scaleLinear().domain([0, 10]).range([5, 95]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([95, 5]);

  const [learningRate, setLearningRate] = useState(1.8);
  const [steps, setSteps] = useState(10);

  const startPoint = 9;

  useEffect(() => {
    drawCoordSystem();
    plotPolynomial();
    plotGradientDescent();
  }, []);

  useEffect(() => {
    d3.selectAll(".learning-rate-demo-point").remove();
    d3.selectAll(".gradient-descent-arrow").remove();
    plotGradientDescent();
  }, [learningRate, steps]);

  function drawCoordSystem() {
    const svg = d3.select(svgRef.current);

    const coordSystem = svg
      .append("g")
      .attr("class", "coord-system-linear-regression")
      .attr("transform", "translate(0,0)");

    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,95)`)
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
      .attr("transform", `translate(5,0)`)
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
      .attr("class", "gradient-descent-arrow-head");
  }

  function plotPolynomial() {
    const x = d3.range(xScale.domain()[0] + 0.5, xScale.domain()[1] - 0.5, 0.01);
    const y = x.map((d) => 0.5 * (d - 5) ** 2);

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const path = coordSystemRef.current
      .append("path")
      .attr("class", "gradient-descent-polynomial-interactive")
      .datum(y)
      .attr("d", line);

    path.lower();
  }

  function plotGradientDescent() {
    const fun = (x) => 0.5 * (x - 5) ** 2;
    const gradient = (x) => x - 5;
    const circleRadius = 1.5;

    let xCurrent = startPoint;
    let yCurrent = fun(xCurrent);
    const tol = 1e-6;
    let previousPoint = [xCurrent, yCurrent];

    drawCurrentStep(xCurrent, yCurrent, circleRadius);
    for (let i = 0; i < steps; i++) {
      const xNext = xCurrent - learningRate * gradient(xCurrent);
      const yNext = fun(xNext);

      drawCurrentStep(xNext, yNext, circleRadius);
      drawArrow(previousPoint, xNext, yNext, circleRadius);

      previousPoint = [xNext, yNext];
      xCurrent = xNext;

      if (Math.abs(gradient(xCurrent)) < tol) break;
    }
  }

  function drawCurrentStep(xNext, yNext, circleRadius) {
    const newCircle = coordSystemRef.current
      .append("circle")
      .attr("class", "learning-rate-demo-point")
      .attr("cx", xScale(xNext))
      .attr("cy", yScale(yNext))
      .attr("r", circleRadius);
  }

  function drawArrow(previousPoint, xNext, yNext, circleRadius) {
    const angle = Math.atan2(yNext - previousPoint[1], xNext - previousPoint[0]);
    const xEnd = xNext - (circleRadius / 600) * 100 * Math.cos(angle);
    const yEnd = yNext - (circleRadius / 600) * 100 * Math.sin(angle);

    coordSystemRef.current
      .append("line")
      .attr("class", "gradient-descent-arrow")
      .attr("x1", xScale(previousPoint[0]))
      .attr("y1", yScale(previousPoint[1]))
      .attr("x2", xScale(xEnd))
      .attr("y2", yScale(yEnd))
      .attr("marker-end", "url(#arrow)");
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} height={500} viewBox={`0 0 100 100`} />
      </div>
      <div className="setting-container-gradient-descent">
        <span>η: {learningRate}</span>
        <div className="interactive-slider-container">
          <input
            className="form-range"
            type="range"
            min="0.01"
            max="3"
            step="0.001"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          />
          <span>Steps: {steps}</span>
          <input
            className="form-range"
            type="range"
            min="1"
            max="30"
            step="1"
            value={steps}
            onChange={(e) => setSteps(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </>
  );
}
