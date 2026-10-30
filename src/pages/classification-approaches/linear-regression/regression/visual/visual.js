import { useRef, useEffect } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import * as d3 from "d3";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

  const groundTruthDataPoints = [
    { x: 1, y: 2.8 },
    { x: 2, y: 3.6 },
    { x: 3, y: 4.4 },
    { x: 5, y: 6 },
    { x: 5.5, y: 6.4 },
    { x: 6, y: 6.8 },
    { x: 7, y: 7.6 },
    { x: 8.5, y: 8.8 },
    { x: 9.5, y: 9.6 },
  ];

  const dataPointsWithNoise = [
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

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 5,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 50, axesRef, "coord-system-linear-regression-visual");
        drawGroundTruthLine();
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updatePoints(groundTruthDataPoints);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        updatePoints(dataPointsWithNoise);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".linear-regression-line-visual").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".vertical-line-to-linear-regression-line-visual").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 4,
      action: () => {
        updateRegressionLine(0, 5);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        updateVerticalLinesToRegressionLine(0, 5);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        updateRegressionLine(0.88, 0.96);
        updateVerticalLinesToRegressionLine(0.88, 0.96);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

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

  function drawGroundTruthLine() {
    axesRef.current
      .append("line")
      .attr("x1", xScale(0))
      .attr("y1", yScale(2))
      .attr("x2", xScale(10))
      .attr("y2", yScale(10))
      .attr("class", "ground-truth-linear-regression-line")
      .attr("stroke-width", 10);
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

  function updateRegressionLine(m, b) {
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

  function updateVerticalLinesToRegressionLine(m, b) {
    const regressionLine = (x) => m * x + b;
    const verticalLines = svg.current
      .selectAll(".vertical-line-to-linear-regression-line-visual")
      .data(dataPointsWithNoise);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-line-to-linear-regression-line-visual")
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(regressionLine(d.x)))
      .merge(verticalLines)
      .each(function (d) {
        d3.select(this)
          .transition()
          .duration(500)
          .attr("x1", xScale(d.x))
          .attr("y1", yScale(d.y))
          .attr("x2", xScale(d.x))
          .attr("y2", yScale(regressionLine(d.x)));
      });

    verticalLines.exit().remove();
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
