import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 0.5]).range([500, 100]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const axisRef = useRef();
  const coordinateSystemRef = useRef();

  const circles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        className: "circle",
        id: `media1-p${i + 1}`,
      })),
    []
  );

  const states = useMemo(
    () => [
      [
        { id: "media1-p1", x: 2, y: 0, radius: 15, class: "media-1-class-a-points" },
        { id: "media1-p2", x: 4, y: 0, radius: 15, class: "media-1-class-a-points" },
        { id: "media1-p3", x: 4.8, y: 0, radius: 15, class: "media-1-class-a-points" },
        { id: "media1-p4", x: 5.3, y: 0, radius: 15, class: "media-1-class-a-points" },
        { id: "media1-p5", x: 8, y: 0, radius: 15, class: "media-1-class-a-points" },

        { id: "media1-p6", x: 3, y: 0, radius: 15, class: "media-1-class-b-points" },
        { id: "media1-p7", x: 6, y: 0, radius: 15, class: "media-1-class-b-points" },
        { id: "media1-p8", x: 7.2, y: 0, radius: 15, class: "media-1-class-b-points" },
        { id: "media1-p9", x: 7.8, y: 0, radius: 15, class: "media-1-class-b-points" },
        { id: "media1-p10", x: 9, y: 0, radius: 15, class: "media-1-class-b-points" },
      ],
    ],
    []
  );

  const actions = useRef([
    {
      start: 1,
      end: 3,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 500, 950, axisRef);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        // Draw x-axis for points
        plotPosteriors(axisRef.current, 4, 2, 0.75, "media-1-posterior-a");
        plotPosteriors(axisRef.current, 7, 1, 0.25, "media-1-posterior-b");

        latexOntoSvg(
          svg.current,
          "\\text{Posterior} = \\frac{\\text{Likelihood} \\cdot \\text{Prior}}{\\text{Normalization-Factor}}",
          450,
          100,
          "media-1-posterior-label",
          "",
          "30"
        );
        latexOntoSvg(svg.current, "p(\\mathcal{C}_1 \\mid x)", 100, 250, "media-1-posterior-a-label", "", "20");
        latexOntoSvg(svg.current, "p(\\mathcal{C}_2 \\mid x)", 100, 300, "media-1-posterior-b-label", "", "20");
        plotThreshold(axisRef.current, 6.1);
        latexOntoSvg(svg.current, "\\theta", xScale(6.1), yScale(-0.05), "media-1-threshold-label", "", "20");
        plotDecisionArrows(axisRef.current, 6.1);
        latexOntoSvg(
          svg.current,
          "\\text{Decide for } \\mathcal{C}_1",
          xScale(3),
          yScale(-0.075),
          "media-1-decide-for-a-label",
          "",
          "20"
        );
        latexOntoSvg(
          svg.current,
          "\\text{Decide for } \\mathcal{C}_2",
          xScale(8.2),
          yScale(-0.075),
          "media-1-decide-for-b-label",
          "",
          "20"
        );
      },
      remove: () => {
        d3.selectAll(".media-1-posterior-a").remove();
        d3.selectAll(".media-1-posterior-b").remove();
        d3.selectAll(".media-1-posterior-label").remove();
        d3.selectAll(".media-1-posterior-a-label").remove();
        d3.selectAll(".media-1-posterior-b-label").remove();
        d3.selectAll(".media-1-threshold").remove();
        d3.selectAll(".media-1-threshold-label").remove();
        d3.selectAll(".media-1-arrow").remove();
        d3.selectAll(".media-1-decide-for-a-label").remove();
        d3.selectAll(".media-1-decide-for-b-label").remove();
        d3.select("#media-1-arrow-left").remove();
        d3.select("#media-1-arrow-right").remove();
        d3.selectAll(".media-1-arrow-right").remove();
        d3.selectAll(".media-1-arrow-left").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 3,
      action: () => {
        plotPoints(axisRef.current, states);
      },
      remove: () => {
        d3.selectAll(".media-1-class-a-points").remove();
        d3.selectAll(".media-1-class-b-points").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 950, coordinateSystemRef, false);
        // Draw probability density estimation

        drawProbabilityDensityEstimation(4.8, 3.8, "media-1-probability-density-estimation-class-a");
        drawProbabilityDensityEstimation(6.6, 2.28, "media-1-probability-density-estimation-class-b");
      },
      remove: () => {
        d3.selectAll(".media-1-x-axis-density-estimation").remove();
        d3.selectAll(".media-1-probability-density-estimation-class-a").remove();
        d3.selectAll(".media-1-probability-density-estimation-class-b").remove();
      },
      called: false,
    },
  ]).current;

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }

  function plotThreshold(g, threshold) {
    const y = d3.range(0, 0.35, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(threshold))
      .y((d) => yScale(d));

    const path = g.append("path").datum(y).attr("d", line).attr("class", "media-1-threshold");
    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", function () {
        d3.select(this).attr("stroke-dasharray", "9");
      });
  }

  function plotDecisionArrows(g, threshold) {
    const arrowData = [
      {
        x1: xScale(threshold - 0.25),
        y1: yScale(-0.05),
        x2: xScale(0),
        y2: yScale(-0.05),
        className: "media-1-arrow-left",
      },
      {
        x1: xScale(threshold + 0.25),
        y1: yScale(-0.05),
        x2: xScale(10),
        y2: yScale(-0.05),
        className: "media-1-arrow-right",
      },
    ];

    arrowData.forEach((arrow) => {
      g.append("defs")
        .append("marker")
        .attr("id", arrow.className)
        .attr("viewBox", "0 0 10 10")
        .attr("refX", "5")
        .attr("refY", "5")
        .attr("markerWidth", "6")
        .attr("markerHeight", "6")
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("class", arrow.className);
    });

    g.selectAll(".media-1-arrow")
      .data(arrowData)
      .enter()
      .append("line")
      .attr("x1", (d) => d.x1)
      .attr("y1", (d) => d.y1)
      .attr("x2", (d) => d.x1)
      .attr("y2", (d) => d.y2)
      .attr("class", (d) => d.className)
      .attr("marker-end", (d) => "url(#" + d.className + ")")
      .transition()
      .duration(400)
      .attr("x2", (d) => d.x2);
  }

  function plotPosteriors(g, mean, variance, prior, className) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1] - 0.2, 0.1);
    const priorA = 0.75;
    const priorB = 0.25;
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) =>
        yScale(
          0.2 *
            ((univariateGaussian(d, mean, variance) * prior) /
              (univariateGaussian(d, 4, 2) * priorA + univariateGaussian(d, 7, 1) * priorB))
        )
      );

    const path = g.append("path").datum(x).attr("d", line).attr("class", className);
    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  function drawProbabilityDensityEstimation(mean, variance, className) {
    const x = d3.range(0, 10, 0.01);
    const y = x.map((xi) => (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-((xi - mean) ** 2) / (2 * variance)));
    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const path = coordinateSystemRef.current.append("path").datum(x).attr("class", className).attr("d", line);

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  function plotPoints(g, states) {
    states[0].forEach((state) => {
      g.append("circle")
        .attr("id", state.id)
        .attr("cx", xScale(state.x))
        .attr("cy", yScale(state.y))
        .attr("r", 0)
        .transition()
        .ease(d3.easeElastic)
        .duration(2000)
        .attr("r", state.radius)
        .attr("class", state.class);
    });
  }

  function drawCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, showAxis = true) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    if (showAxis) {
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
