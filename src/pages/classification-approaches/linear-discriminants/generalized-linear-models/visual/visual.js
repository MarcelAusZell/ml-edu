import { useRef, useEffect } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);
const xScaleActivationFunction = d3.scaleLinear().domain([-6, 6]).range([50, 950]);
const yScaleActivationFunction = d3.scaleLinear().domain([-1, 1]).range([950, 50]);
const xScaleError = d3.scaleLinear().domain([-3, 3]).range([50, 950]);
const yScaleError = d3.scaleLinear().domain([0, 6]).range([900, 50]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axesRef = useRef();
  const decisionBoundaryRef = useRef([]);
  const pathRef = useRef([]);

  const dataPoints = [
    { x: 0.9, y: 7, t: 1, error: 0 },
    { x: 1, y: 8, t: 1, error: 0 },
    { x: 1.3, y: 8.4, t: 1, error: 0 },
    { x: 1.5, y: 6.5, t: 1, error: 0 },
    { x: 2, y: 7.5, t: 1, error: 0 },
    { x: 2.5, y: 8, t: 1, error: 0 },
    { x: 3, y: 5.5, t: -1, error: 0 },
    { x: 2.5, y: 6, t: -1, error: 0 },
    { x: 4, y: 6.3, t: -1, error: 0 },
    { x: 3.5, y: 7, t: -1, error: 0 },
    { x: 3.1, y: 6.5, t: -1, error: 0 },
    { x: 10, y: 1, t: -1, error: 0 },
    { x: 9.4, y: 1.2, t: -1, error: 0 },
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 2,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 50, axesRef, "least-squares-coord-system");
        drawPoints(dataPoints, "least-squares-data-point");
      },
      remove: () => {
        d3.selectAll(".least-square-activated-comparison-label").remove();
        d3.selectAll(".least-squares-data-point").remove();
        d3.selectAll(".least-squares-coord-system").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        const start = [0, 0.98];
        const end = [10, 18.31];
        updateLine(axesRef.current, start, end, "least-squares-decision-boundary");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        const start = [0, 0.13];
        const end = [10, 27.57];
        updateLine(axesRef.current, start, end, "least-squares-decision-boundary");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 7,
      action: () => {
        drawCoordSystemActivation(
          svgRef,
          xScaleActivationFunction,
          yScaleActivationFunction,
          500,
          500,
          axesRef,
          "least-squares-activation-coord-system"
        );
      },
      remove: () => {
        d3.selectAll(".least-squares-activation-coord-system").remove();
        d3.selectAll(".least-squares-activation-function").remove();
        d3.selectAll(".axes-activation-function").remove();
        d3.selectAll(".least-square-activated-label").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 6,
      action: () => {
        const x = d3.range(xScaleActivationFunction.domain()[0], xScaleActivationFunction.domain()[1], 0.01);
        const y = x.map((d) => 1 / (1 + Math.exp(-d)));
        const line = d3
          .line()
          .x((d, i) => xScaleActivationFunction(x[i]))
          .y((d, i) => yScaleActivationFunction(y[i]));

        const pathData = line(x);
        updatePath(axesRef.current, pathData, "least-squares-activation-function");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 6,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".highlight-rect").remove();
        svg.current.selectAll(".highlighted-path").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        highlightInterval(
          -2,
          2,
          1 / (1 + Math.exp(-(-2))),
          1 / (1 + Math.exp(-2)),
          xScaleActivationFunction,
          yScaleActivationFunction
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        highlightInterval(
          -6,
          -2,
          1 / (1 + Math.exp(6)),
          1 / (1 + Math.exp(2)),
          xScaleActivationFunction,
          yScaleActivationFunction
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        highlightInterval(
          2,
          6,
          1 / (1 + Math.exp(-2)),
          1 / (1 + Math.exp(-6)),
          xScaleActivationFunction,
          yScaleActivationFunction
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        const x = d3.range(xScaleActivationFunction.domain()[0], xScaleActivationFunction.domain()[1], 0.01);
        const y = x.map((d) => Math.tanh(d));
        const line = d3
          .line()
          .x((d, i) => xScaleActivationFunction(x[i]))
          .y((d, i) => yScaleActivationFunction(y[i]));

        const pathData = line(x);
        updatePath(axesRef.current, pathData, "least-squares-activation-function");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 10,
      action: () => {
        drawCoordSystemErrorContribution(
          svgRef,
          xScaleError,
          yScaleError,
          900,
          500,
          axesRef,
          "error-contribution-coord-system"
        );
        plotLeastSqauresErrorContribution();
        plotIdealMissClassificationError();
        plotActivatedLeastSquaresErrorContribution();
      },
      remove: () => {
        d3.selectAll(".error-contribution-coord-system").remove();
        d3.selectAll(".other-error-contribution-functions").remove();
        d3.selectAll(".least-squares-tanh-error-contribution").remove();
        d3.selectAll(".error-contribution-axis-label-gls").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 10,
      action: () => {},
      remove: () => {
        svg.current.selectAll(".highlight-rect").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        highlightInterval(1.5, 3, -0.5, 0.5, xScaleError, yScaleError);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 10,
      action: () => {
        highlightInterval(-3, -2, 5.5, 6, xScaleError, yScaleError);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  /* -------------------------------- Coordsystem Least Square  -------------------------------- */
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

    latexOntoSvg(svg, "x_1", xScale(0), 30, "least-square-activated-comparison-label", "", 25);
    latexOntoSvg(svg, "x_2", 970, yScale(0), "least-square-activated-comparison-label", "", 25);
  }

  /* -------------------------------- Coordsystem Activation  -------------------------------- */
  function drawCoordSystemActivation(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", className);
    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.format(""))
          .tickPadding(10)
          .tickSize(0)
          .tickValues(d3.range(-6, 6, 1).filter((d) => d !== 0))
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(d3.axisLeft(yScale).tickValues([-1, -0.5, 0.5, 1]).tickFormat(d3.format("")).tickPadding(10).tickSize(0))

      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSvg(svg, "x", xScale(6.2), yScale(0), "least-square-activated-label", "", 20);
  }
  /* -------------------------------- Coordsystem Error  -------------------------------- */
  function drawCoordSystemErrorContribution(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, className) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", className);
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

    latexOntoSvg(svg, "E(z_n)", xScaleError(0), 30, "error-contribution-axis-label-gls", "", 20);
    latexOntoSvg(
      svg,
      "z_n = t_n y(x_n) \\quad t_n \\in \\{-1, 1\\}",
      xScaleError(2),
      yScaleError(-0.25),
      "error-contribution-axis-label-gls",
      "",
      20
    );
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
              .duration(1600)
              .attr("x2", (d) => xScale(d.end[0]))
              .attr("y2", (d) => yScale(d.end[1]))
              .attr("class", className),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(800)
                .attr("x1", (d) => xScale(d.start[0]))
                .attr("y1", (d) => yScale(d.start[1]))
                .attr("x2", (d) => xScale(d.end[0]))
                .attr("y2", (d) => yScale(d.end[1]))
            )
        );
    }
  }

  function drawPoints(points, className) {
    const svg = d3.select(svgRef.current);

    svg
      .selectAll(`.${className}`)
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 0)
      .transition()
      .ease(d3.easeBackOut)
      .duration(250)
      .attr("r", 18)
      .attr("class", className)
      .attr("fill", (d) => (d.t === 1 ? "steelblue" : "orange"));
  }

  function highlightInterval(a, b, rectHeightStart, rectHeightEnd, xScale, yScale) {
    const svg = d3.select(svgRef.current);
    const coordSys = svg.select("g");

    const rectHeight = Math.abs(yScale(rectHeightEnd) - yScale(rectHeightStart));
    const rect = coordSys.selectAll(".highlight-rect").data([null]);

    rect
      .enter()
      .append("rect")
      .attr("class", "highlight-rect")
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

  function updatePath(g, pathData, className) {
    pathRef.current = [{ data: pathData }];
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      g.selectAll(`.${className}`)
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", className),

          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function plotLeastSqauresErrorContribution() {
    const x = d3.range(-2.7, 3, 0.1);
    const line = d3
      .line()
      .x((d) => xScaleError(d))
      .y((d) => yScaleError(Math.pow(d - 1, 2)));

    const svg = d3.select(svgRef.current);
    const coordSys = svg.select("g");

    coordSys.append("path").datum(x).attr("d", line).attr("class", "other-error-contribution-functions");
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

    axesRef.current.append("path").attr("class", "other-error-contribution-functions").datum(data).attr("d", line);
  }

  function plotActivatedLeastSquaresErrorContribution() {
    const x = d3.range(-3, 3, 0.1);
    const line = d3
      .line()
      .x((d) => xScaleError(d))
      .y((d) => yScaleError(-3 * Math.tanh(d + 0.8) + 3));

    const svg = d3.select(svgRef.current);
    const coordSys = svg.select("g");

    coordSys.append("path").datum(x).attr("d", line).attr("class", "least-squares-tanh-error-contribution");
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
