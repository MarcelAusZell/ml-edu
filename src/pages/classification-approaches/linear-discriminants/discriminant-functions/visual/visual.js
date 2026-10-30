import React, { useRef, useEffect } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([150, 800]);
const yScale = d3.scaleLinear().domain([0, 10]).range([800, 150]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();
  const decisionBoundaryRef = useRef([]);
  const normalVectorRef = useRef([]);
  const distanceRef = useRef([]);

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 9,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 800, 150, axesRef);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        const start = [0, 9];
        const end = [5, 0];
        updateLine(axesRef.current, start, end, "decision-boundary", false);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 3,
      action: () => {
        const start = [0, 9];
        const end = [5, 0];
        updateLine(axesRef.current, start, end, "decision-boundary");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 9,
      action: () => {},
      remove: () => {
        d3.select(svgRef.current).selectAll(".decision-boundary-area-below").remove();
        d3.select(svgRef.current).selectAll(".decision-boundary-area-above").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 9,
      action: () => {},
      remove: () => {
        d3.select(svgRef.current).selectAll(".normal-vector-arrow").remove();
        d3.select(svgRef.current).selectAll(".normal-vector-label").remove();
      },
      called: false,
    },

    {
      start: 3,
      end: 3,
      action: () => {
        const start = [0, 9];
        const end = [5, 0];
        updateLine(axesRef.current, start, end, "decision-boundary");
        const normalDirection = getNormalDirection(start, end);
        updateVectorArrow(axesRef.current, [0, 0], normalDirection, "normal-vector-arrow", true);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 9,
      action: () => {
        latexOntoSvg(svg.current, "\\vec{w}", xScale(1), yScale(1), "normal-vector-label", "", 20);
      },
      remove: () => {},
      called: false,
    },

    {
      start: 4,
      end: 5,
      action: () => {
        const decisionStart = [0, 5];
        const decisionEnd = [9, 0];
        updateLine(axesRef.current, decisionStart, decisionEnd, "decision-boundary");
      },
      remove: () => {},
      called: false,
    },

    {
      start: 4,
      end: 9,
      action: () => {
        const decisionStart = [0, 5];
        const decisionEnd = [9, 0];
        const decisionNormal = getNormalDirection(decisionStart, decisionEnd);
        updateVectorArrow(axesRef.current, [0, 0], decisionNormal, "normal-vector-arrow", true);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 9,
      action: () => {
        const parallelStart = [0, 0];
        const parallelEnd = [9, -5];
        updateLine(axesRef.current, parallelStart, parallelEnd, "parallel-line-to-decision-boundary");
        latexOntoSvg(svg.current, "\\frac{-w_0}{\\| \\vec{w} \\|}", xScale(6), yScale(-1.25), "bias-label", "", 20);
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".parallel-line-to-decision-boundary").remove();
        d3.select(svgRef.current).selectAll(".distance-line").remove();
        d3.select(svgRef.current).selectAll(".bias-label").remove();
      },
      called: false,
    },

    {
      start: 5,
      end: 5,
      action: () => {
        updateDistanceLine(axesRef.current, [4.5, -2.5], [6.62, 1.32], "distance-line");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 9,
      action: () => {
        const start = [0, 4];
        const end = [7.2, 0];
        updateLine(axesRef.current, start, end, "decision-boundary");
        updateDistanceLine(axesRef.current, [4.5, -2.5], [6.2, 0.6], "distance-line");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 9,
      action: () => {
        const start = [0, 0];
        const end = [7, 3];
        updateVectorArrow(axesRef.current, start, end, "data-point-vector");
        latexOntoSvg(svg.current, "y(\\vec{x})", xScale(7.5), yScale(3.25), "data-point-vector-label", "", 20);
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".data-point-vector").remove();
        d3.select(svgRef.current).selectAll(".data-point-vector-label").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 9,
      action: () => {
        drawLineWithCrinkle(axesRef.current, [0, 0], [5.8, 0.8], [7, 3], "data-point-vector-crinkled");
        latexOntoSvg(svg.current, "\\vec{x}_{\\perp}", xScale(5.6), yScale(0.5), "data-point-projection-label", "", 20);
        latexOntoSvg(svg.current, "r", xScale(6.2), yScale(2), "r-label", "", 20);
        latexOntoSvg(
          svg.current,
          "= \\vec{x}_{\\perp} + r \\frac{\\vec{w}}{\\| \\vec{w} \\|}",
          xScale(8.9),
          yScale(3.25),
          "data-point-equal-label",
          "",
          18
        );
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".data-point-vector-crinkled").remove();
        d3.select(svgRef.current).selectAll(".data-point-projection-label").remove();
        d3.select(svgRef.current).selectAll(".r-label").remove();
        d3.select(svgRef.current).selectAll(".data-point-equal-label").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        latexOntoSvg(svg.current, "\\frac{y(\\vec{x})}{\\| w \\|}", xScale(7), yScale(1.8), "distance-to-decision-boundary-label", "", 20);
      },
      remove: () => {
        d3.select(svgRef.current).selectAll(".distance-to-decision-boundary-label").remove();
      },
      called: false,
    },
  ]).current;

  function getNormalDirection(start, end) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    return [2 * (-dy / length), 2 * (dx / length)];
  }

  function drawLineWithCrinkle(g, start1, end1, end2, className) {
    const pathData = d3.path();
    pathData.moveTo(xScale(start1[0]), yScale(start1[1]));
    pathData.lineTo(xScale(end1[0]), yScale(end1[1]));
    pathData.lineTo(xScale(end2[0]), yScale(end2[1]));

    const pathElement = g.append("path").attr("class", className).attr("d", pathData.toString()).attr("stroke", "black");

    const pathLength = pathElement.node().getTotalLength();

    pathElement.attr("stroke-dasharray", pathLength).attr("stroke-dashoffset", pathLength);
  }

  function updateDistanceLine(g, start, end, className) {
    distanceRef.current = [{ start, end }];

    if (distanceRef.current.length === 0) return;

    const lastLine = distanceRef.current[0];
    const arrowHeadLength = 0.25;

    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

    const arrowHead1 = [
      [xScale(start[0] + arrowHeadLength * Math.cos(angle + Math.PI / 6)), yScale(start[1] + arrowHeadLength * Math.sin(angle + Math.PI / 6))],
      [xScale(start[0]), yScale(start[1])],
      [xScale(start[0] + arrowHeadLength * Math.cos(angle - Math.PI / 6)), yScale(start[1] + arrowHeadLength * Math.sin(angle - Math.PI / 6))],
    ];

    const arrowHead2 = [
      [xScale(end[0] - arrowHeadLength * Math.cos(angle - Math.PI / 6)), yScale(end[1] - arrowHeadLength * Math.sin(angle - Math.PI / 6))],
      [xScale(end[0]), yScale(end[1])],
      [xScale(end[0] - arrowHeadLength * Math.cos(angle + Math.PI / 6)), yScale(end[1] - arrowHeadLength * Math.sin(angle + Math.PI / 6))],
    ];

    const lineAttrs = {
      x1: xScale(start[0]),
      y1: yScale(start[1]),
      x2: xScale(end[0]),
      y2: yScale(end[1]),
    };

    const arrowGroup = g
      .selectAll(`.${className}`)
      .data([lastLine])
      .join(
        (enter) => {
          const group = enter.append("g").attr("class", className);

          group
            .append("line")
            .attr("x1", lineAttrs.x1)
            .attr("y1", lineAttrs.y1)
            .attr("x2", xScale(start[0]))
            .attr("y2", yScale(start[1]))
            .transition()
            .ease(d3.easeBackOut)
            .duration(800)
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
            .ease(d3.easeBackOut)
            .duration(800)
            .attr("points", arrowHead1);

          group
            .append("polygon")
            .attr("points", [
              [lineAttrs.x1, lineAttrs.y1],
              [lineAttrs.x1, lineAttrs.y1],
              [lineAttrs.x1, lineAttrs.y1],
            ])
            .transition()
            .ease(d3.easeBackOut)
            .duration(800)
            .attr("points", arrowHead2);
        },
        (update) => {
          update
            .select("line")
            .attr("x1", lineAttrs.x1)
            .attr("y1", lineAttrs.y1)
            .transition()
            .ease(d3.easeBackOut)
            .duration(400)
            .attr("x2", lineAttrs.x2)
            .attr("y2", lineAttrs.y2);

          update
            .selectAll("polygon")
            .transition()
            .ease(d3.easeBackOut)
            .duration(400)
            .attr("points", function (d, i) {
              return i === 0 ? arrowHead1 : arrowHead2;
            });
        }
      );
  }

  function updateVectorArrow(g, start, end, className, dashed = false) {
    normalVectorRef.current = [{ start, end }];

    if (normalVectorRef.current.length === 0) return;

    const lastArrow = normalVectorRef.current[0];
    const arrowHeadLength = 0.25;
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

    const lineAttrs = {
      x1: xScale(start[0]),
      y1: yScale(start[1]),
      x2: xScale(end[0]),
      y2: yScale(end[1]),
      "stroke-dasharray": dashed ? "5,5" : "none",
    };

    const polygonPoints = [
      [xScale(end[0] - arrowHeadLength * Math.cos(angle - Math.PI / 6)), yScale(end[1] - arrowHeadLength * Math.sin(angle - Math.PI / 6))],
      [xScale(end[0]), yScale(end[1])],
      [xScale(end[0] - arrowHeadLength * Math.cos(angle + Math.PI / 6)), yScale(end[1] - arrowHeadLength * Math.sin(angle + Math.PI / 6))],
    ];

    const arrowGroup = g
      .selectAll(`.${className}`)
      .data([lastArrow])
      .join(
        (enter) => {
          const group = enter.append("g").attr("class", className);

          group
            .append("line")
            .attr("x1", lineAttrs.x1)
            .attr("y1", lineAttrs.y1)
            .attr("x2", xScale(start[0]))
            .attr("y2", yScale(start[1]))
            .attr("stroke-dasharray", lineAttrs["stroke-dasharray"])
            .transition()
            .ease(d3.easeBackOut)
            .duration(800)
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
            .ease(d3.easeBackOut)
            .duration(800)
            .attr("points", polygonPoints);
        },
        (update) => {
          update
            .select("line")
            .attr("x1", lineAttrs.x1)
            .attr("y1", lineAttrs.y1)
            .attr("stroke-dasharray", lineAttrs["stroke-dasharray"])
            .transition()
            .ease(d3.easeBackOut)
            .duration(400)
            .attr("x2", lineAttrs.x2)
            .attr("y2", lineAttrs.y2);

          update.select("polygon").transition().ease(d3.easeBackOut).duration(400).attr("points", polygonPoints);
        }
      );
  }

  function updateAreaUnderDecisionBoundary(g, start, end) {
    const area = d3
      .area()
      .x((d) => xScale(d.x))
      .y0((d) => yScale(d.y0))
      .y1((d) => yScale(d.y1));

    const areaDataBelow = [
      { x: start[0], y0: 0, y1: start[1] },
      { x: end[0], y0: 0, y1: end[1] },
    ];

    const areaDataAbove = [
      { x: start[0], y0: start[1], y1: 10 },
      { x: end[0], y0: end[1], y1: 10 },
      { x: 10, y0: end[1], y1: 10 },
      { x: 10, y0: 10, y1: 10 },
    ];

    g.selectAll(".decision-boundary-area-below")
      .data([areaDataBelow])
      .join(
        (enter) => enter.append("path").attr("class", "decision-boundary-area-below").attr("d", area),
        (update) => update.transition().ease(d3.easeBackOut).duration(200).attr("d", area)
      );

    g.selectAll(".decision-boundary-area-above")
      .data([areaDataAbove])
      .join(
        (enter) => enter.append("path").attr("class", "decision-boundary-area-above").attr("d", area),
        (update) => update.transition().ease(d3.easeBackOut).duration(200).attr("d", area)
      );
  }

  function updateLine(g, start, end, className, showArea = true) {
    decisionBoundaryRef.current = [{ start, end }];

    if (decisionBoundaryRef.current.length > 0) {
      const lastBoundary = decisionBoundaryRef.current[decisionBoundaryRef.current.length - 1];
      if (className === "decision-boundary" && showArea) updateAreaUnderDecisionBoundary(g, start, end);

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

    latexOntoSvg(svg, "x_1", 820, 805, "axis-label", "", 20);
    latexOntoSvg(svg, "x_2", 150, 135, "axis-label", "", 20);
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
