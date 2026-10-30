import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

  const dataPoints = [
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
  ];

  const dataPoints2 = [
    { x: 0.43, y: 5.48 },
    { x: 1.7, y: 4.61 },
    { x: 1.84, y: 6.86 },
    { x: 3.35, y: 5.82 },
    { x: 3.24, y: 7.36 },
    { x: 2.51, y: 5.13 },
    { x: 5.05, y: 7.91 },
    { x: 5.84, y: 6.69 },
    { x: 7.2, y: 8.78 },
    { x: 8.49, y: 7.97 },
    { x: 4.48, y: 6.39 },
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 5,
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
        updatePoints(dataPoints, true);
        updateLine(1.29, 3.7);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        latexOntoSvg(svg.current, "x_1", 970, yScale(0), "x1-label-linear-regression-visual", "", 25);
        latexOntoSvg(svg.current, "x_2", xScale(0), 30, "x2-label-linear-regression-visual", "", 25);
      },
      remove: () => {
        svg.current.selectAll(".x1-label-linear-regression-visual").remove();
        svg.current.selectAll(".x2-label-linear-regression-visual").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        latexOntoSvg(svg.current, "x", 970, yScale(0), "x-label-linear-regression-visual", "", 25);
        latexOntoSvg(svg.current, "t", xScale(0), 30, "t-label-linear-regression-visual", "", 25);
      },
      remove: () => {
        svg.current.selectAll(".x-label-linear-regression-visual").remove();
        svg.current.selectAll(".t-label-linear-regression-visual").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 4,
      action: () => {
        updateLine(0.41, 5.01);
        updatePoints(dataPoints2, false);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 4,
      action: () => {
        newDataPoint();
      },
      remove: () => {
        svg.current.selectAll(".breathing-point").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        drawPredictionForNewDataPoint();
      },
      remove: () => {
        svg.current.selectAll(".prediction-arrow-new-data-point").remove();
      },
      called: false,
    },
  ]).current;

  function newDataPoint() {
    const circle = svg.current
      .append("circle")
      .attr("class", "breathing-point")
      .attr("r", 20)
      .attr("fill", "red")
      .attr("cx", xScale(5.5))
      .attr("cy", yScale(0));

    const breathe = () => {
      circle.transition().duration(1000).attr("r", 30).transition().duration(1000).attr("r", 20).on("end", breathe);
    };
    breathe();
  }

  function drawPredictionForNewDataPoint() {
    const regressionLine = (x) => 0.41 * x + 5.01;

    const arrowGroup = axesRef.current.append("g").attr("class", "prediction-arrow-new-data-point");

    const markerId = "arrowhead";
    arrowGroup
      .append("defs")
      .append("marker")
      .attr("id", markerId)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", 0)
      .attr("markerWidth", 3)
      .attr("markerHeight", 3)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("class", "arrow-head")
      .attr("d", "M0,-5L10,0L0,5");

    arrowGroup
      .append("line")
      .attr("x1", xScale(5.5))
      .attr("y1", yScale(0))
      .attr("x2", xScale(5.5))
      .attr("y2", yScale(0))
      .attr("marker-end", `url(#${markerId})`)
      .transition()
      .duration(500)
      .attr("x2", xScale(5.5))
      .attr("y2", yScale(regressionLine(5)));
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
  }

  function updatePoints(newData, showLabels) {
    const points = svg.current.selectAll(".data-point-regression-vs-classification").data(newData);

    points
      .enter()
      .append("circle")
      .attr("class", "data-point-regression-vs-classification")
      .attr("r", 20)
      .attr("fill", (d) => (showLabels ? (d.t === 1 ? "orange" : "steelblue") : "gray"))
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .merge(points)
      .transition()
      .duration(500)
      .attr("fill", (d) => (showLabels ? (d.t === 1 ? "orange" : "steelblue") : "gray"))
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y));

    points.exit().transition().duration(1000).attr("r", 0).remove();
  }

  function updateLine(m, b) {
    let line = svg.current.selectAll(".linear-regression-line-visual");

    const x1 = xScale.domain()[0];
    const x2 = xScale.domain()[1];
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    if (line.empty()) {
      line = svg.current
        .append("line")
        .attr("class", "linear-regression-line-visual")
        .attr("x1", xScale(x1))
        .attr("y1", yScale(y1))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(y2));
    } else {
      line
        .transition()
        .duration(500)
        .attr("x1", xScale(x1))
        .attr("y1", yScale(y1))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(y2));
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
