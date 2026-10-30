import React, { useRef, useEffect, useState } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import numeric from "numeric";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

const xScaleError = d3.scaleLinear().domain([-3, 3]).range([50, 950]);
const yScaleError = d3.scaleLinear().domain([0, 6]).range([900, 50]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();
  const errorAxesRef = useRef();
  const decisionBoundaryRef = useRef([]);

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

  const dataPointsAndOutliers = [
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

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 3,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 50, axesRef);
      },
      remove: () => {
        d3.selectAll(axesRef.current).remove();
        d3.selectAll(".axis-label-least-square").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 2,
      action: () => {
        updatePoints(dataPoints, "least-squares-data-point");
      },

      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 3,
      action: () => {},
      remove: () => {
        d3.selectAll(".least-squares-decision-boundary").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        const start = calculateLeastSquareClassifcation(dataPoints)[0];
        const end = calculateLeastSquareClassifcation(dataPoints)[1];
        updateLine(axesRef.current, start, end, "least-squares-decision-boundary");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        updatePoints(dataPointsAndOutliers, "least-squares-data-point");
        const start = calculateLeastSquareClassifcation(dataPointsAndOutliers)[0];
        const end = calculateLeastSquareClassifcation(dataPointsAndOutliers)[1];
        updateLine(axesRef.current, start, end, "least-squares-decision-boundary");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 13,
      action: () => {
        drawCoordSystemErrorContribution(svgRef, xScaleError, yScaleError, 900, 500, errorAxesRef);
        updatePoints([], "least-squares-data-point");
      },
      remove: () => {
        d3.selectAll(errorAxesRef.current).remove();
        svg.current.selectAll(".error-contribution-axis-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        latexOntoSvg(
          svg.current,
          "z_n \\gt 0",
          xScaleError(1.5),
          yScaleError(3),
          "correct-classification-label",
          "",
          20
        );
        latexOntoSvg(
          svg.current,
          "\\text{Correct Classification}",
          xScaleError(1.5),
          yScaleError(2.5),
          "correct-classification-text-label",
          "",
          20
        );
        latexOntoSvg(
          svg.current,
          "z_n \\lt 0",
          xScaleError(-1.5),
          yScaleError(3),
          "incorrect-classification-label",
          "",
          20
        );
        latexOntoSvg(
          svg.current,
          "\\text{Incorrect Classification}",
          xScaleError(-1.5),
          yScaleError(2.5),
          "incorrect-classification-text-label",
          "",
          20
        );
      },
      remove: () => {
        svg.current.selectAll(".correct-classification-label").remove();
        svg.current.selectAll(".correct-classification-text-label").remove();
        svg.current.selectAll(".incorrect-classification-label").remove();
        svg.current.selectAll(".incorrect-classification-text-label").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        plotVectorArrow(errorAxesRef.current, [0.5, 0.5], [2.5, 0.5], "positive-confidence-arrow", "Confidence");
        plotVectorArrow(errorAxesRef.current, [-0.5, 0.5], [-2.5, 0.5], "negative-confidence-arrow", "Confidence");
      },
      remove: () => {
        svg.current.selectAll(".positive-confidence-arrow").remove();
        svg.current.selectAll(".negative-confidence-arrow").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 13,
      action: () => {
        plotIdealMissClassificationError();
      },
      remove: () => {
        svg.current.selectAll(".ideal-miss-classification-error").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 13,
      action: () => {
        plotErrorContribution();
      },
      remove: () => {
        svg.current.selectAll(".least-squares-error-contribution").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 13,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".highlight-ellipse").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        plotVectorArrow(errorAxesRef.current, [1, 1.5], [1, 0.15], "ideal-classification-arrow", "");
      },
      remove: () => {
        svg.current.selectAll(".ideal-classification-arrow").remove();
      },
      called: false,
    },
    {
      start: 10,
      end: 11,
      action: () => {},
      remove: () => {
        d3.selectAll(".highlight-lease-squares-error").remove();
      },
      called: false,
    },

    {
      start: 10,
      end: 10,
      action: () => {
        highlightInterval(-1.5, -0.5, 2, 6, xScaleError, yScaleError, "highlight-lease-squares-error");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 11,
      end: 11,
      action: () => {
        highlightInterval(1.75, 3, 0.5, 3.6, xScaleError, yScaleError, "highlight-lease-squares-error");
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  function highlightInterval(a, b, rectHeightStart, rectHeightEnd, xScale, yScale, className) {
    const svg = d3.select(svgRef.current);
    const coordSys = svg.select("g");

    const rectHeight = Math.abs(yScale(rectHeightEnd) - yScale(rectHeightStart));
    const rect = coordSys.selectAll(`.${className}`).data([null]);

    rect
      .enter()
      .append("rect")
      .attr("class", className)
      .attr("x", xScale(a))
      .attr("y", yScale(rectHeightEnd))
      .attr("width", xScale(b) - xScale(a))
      .attr("height", rectHeight)
      .attr("rx", 20)
      .attr("ry", 20)
      .merge(rect)
      .transition()
      .ease(d3.easeBackOut.overshoot(0.5))
      .duration(400)
      .attr("x", xScale(a))
      .attr("y", yScale(rectHeightEnd))
      .attr("width", xScale(b) - xScale(a))
      .attr("height", rectHeight);
  }

  function calculateLeastSquareClassifcation(points) {
    const X = points.map((d) => [d.x, d.y, 1]);
    const t = points.map((d) => [d.t]);
    const pseudoInverse = numeric.dot(numeric.inv(numeric.dot(numeric.transpose(X), X)), numeric.transpose(X));
    const w = numeric.dot(pseudoInverse, t);

    const decisionBoundary = (x) => -(w[2][0] + w[0][0] * x) / w[1][0];

    const start = [0, decisionBoundary(0)];
    const end = [10, decisionBoundary(10)];

    return [start, end];
  }

  function updateLine(g, start, end, className) {
    decisionBoundaryRef.current = [{ start, end }];

    if (decisionBoundaryRef.current.length > 0) {
      const lastBoundary = decisionBoundaryRef.current[decisionBoundaryRef.current.length - 1];

      g.selectAll(`.${className}`)
        .data([lastBoundary])
        .join(
          (enter) =>
            enter
              .append("line")
              .attr("x1", (d) => xScale(d.start[0]))
              .attr("y1", (d) => yScale(d.start[1]))
              .attr("x2", (d) => xScale(d.start[0]))
              .attr("y2", (d) => yScale(d.start[1]))
              .transition()
              .ease(d3.easeBackOut)
              .duration(800)
              .attr("x2", (d) => xScale(d.end[0]))
              .attr("y2", (d) => yScale(d.end[1]))
              .attr("class", className),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("x1", (d) => xScale(d.start[0]))
                .attr("y1", (d) => yScale(d.start[1]))
                .attr("x2", (d) => xScale(d.end[0]))
                .attr("y2", (d) => yScale(d.end[1]))
            )
        );
    }
  }

  function plotErrorContribution() {
    const x = d3.range(-2.7, 3, 0.1);
    const line = d3
      .line()
      .x((d) => xScaleError(d))
      .y((d) => yScaleError(Math.pow(d - 1, 2)));

    const svg = d3.select(svgRef.current);
    const coordSys = svg.select("g");

    coordSys.append("path").datum(x).attr("d", line).attr("class", "least-squares-error-contribution");
  }

  function updatePoints(data, className) {
    svg.current
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", 0)
            .transition()
            .ease(d3.easeBackOut)
            .duration(500)
            .attr("r", 18)
            .attr("fill", (d) => (d.t === 1 ? "steelblue" : "orange")),
        (update) =>
          update
            .transition()
            .duration(500)
            .attr("cx", (d) => xScale(d.x))
            .attr("cy", (d) => yScale(d.y))
            .attr("r", 18)
            .attr("fill", (d) => (d.t === 1 ? "steelblue" : "orange")),
        (exit) => exit.remove()
      );
  }

  function plotIdealMissClassificationError() {
    const data = [
      { x: -3, y: 1 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
      { x: 3, y: 0 },
    ];

    const line = d3
      .line()
      .x(function (d) {
        return xScaleError(d.x);
      })
      .y(function (d) {
        return yScaleError(d.y);
      })
      .curve(d3.curveStepAfter);

    errorAxesRef.current.append("path").attr("class", "ideal-miss-classification-error").datum(data).attr("d", line);
  }

  function plotVectorArrow(g, start, end, className, labelText, dashed = false) {
    const arrowHeadLength = 0.25;
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

    const lineAttrs = {
      x1: xScaleError(start[0]),
      y1: yScaleError(start[1]),
      x2: xScaleError(end[0]),
      y2: yScaleError(end[1]),
      "stroke-dasharray": dashed ? "5,5" : "none",
    };

    const polygonPoints = [
      [
        xScaleError(end[0] - arrowHeadLength * Math.cos(angle - Math.PI / 6)),
        yScaleError(end[1] - arrowHeadLength * Math.sin(angle - Math.PI / 6)),
      ],
      [xScaleError(end[0]), yScaleError(end[1])],
      [
        xScaleError(end[0] - arrowHeadLength * Math.cos(angle + Math.PI / 6)),
        yScaleError(end[1] - arrowHeadLength * Math.sin(angle + Math.PI / 6)),
      ],
    ];

    const group = g.append("g").attr("class", className);
    group
      .append("line")
      .attr("x1", lineAttrs.x1)
      .attr("y1", lineAttrs.y1)
      .attr("x2", xScaleError(start[0]))
      .attr("y2", yScaleError(start[1]))
      .attr("stroke-dasharray", lineAttrs["stroke-dasharray"])
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("x2", lineAttrs.x2)
      .attr("y2", lineAttrs.y2);

    group
      .append("polygon")
      .attr("points", [
        [lineAttrs.x1, lineAttrs.y1],
        [lineAttrs.x1, lineAttrs.y1],
        [lineAttrs.x1, lineAttrs.y1],
      ])
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attr("points", polygonPoints);

    group
      .append("text")
      .attr("class", "arrow-label")
      .attr("text-anchor", "middle")
      .attr("x", (lineAttrs.x1 + lineAttrs.x2) / 2)
      .attr("y", (lineAttrs.y1 + lineAttrs.y2) / 2 + 20)
      .text(labelText);
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

    latexOntoSvg(svg, "x_1", xScale(0), 30, "axis-label-least-square", "", 25);
    latexOntoSvg(svg, "x_2", 970, yScale(0), "axis-label-least-square", "", 25);
  }

  function drawCoordSystemErrorContribution(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(
        d3.axisBottom(xScaleError).tickValues([-2, -1, 0, 1, 2]).tickFormat(d3.format("d")).tickPadding(10).tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(d3.axisLeft(yScaleError).tickValues([1]).tickFormat(d3.format("d")).tickPadding(10).tickSize(0))
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg, "E(z_n)", xScaleError(0), 30, "error-contribution-axis-label", "", 20);
    latexOntoSvg(
      svg,
      "z_n = t_n y(x_n) \\quad t_n \\in \\{-1, 1\\}",
      xScaleError(2),
      yScaleError(-0.25),
      "error-contribution-axis-label",
      "",
      20
    );
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
