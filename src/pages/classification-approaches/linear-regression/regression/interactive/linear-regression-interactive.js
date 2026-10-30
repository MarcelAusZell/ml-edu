import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./linear-regression-interactive.scss";
import numeric, { max } from "numeric";

export default function LinearRegressionInteractive() {
  const svgRef = useRef();
  const coordinateSystemRef = useRef();

  const maxPoints = 30;
  const [dataPoints, setDataPoints] = useState([
    {
      x: 1.09,
      y: 1.5,
    },
    {
      x: 4.26,
      y: 6.91,
    },
    {
      x: 8.03,
      y: 4.77,
    },
  ]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([5, 1000]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([495, 0]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 495, 5, coordinateSystemRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
    plotLinearRegression();
  }, [dataPoints]);

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
      .attr("opacity", 0.5);

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
      .attr("opacity", 0.5);
  }

  function clickToAddPoints() {
    const svg = d3.select(svgRef.current);

    svg.on("mousemove", (event) => {
      if (dataPoints.length >= maxPoints) {
        svg.style("cursor", "not-allowed");
      } else {
        svg.style("cursor", "pointer");
      }
    });

    svg.on("click", (event) => {
      setDataPoints((prev) => {
        if (prev.length >= maxPoints) {
          return prev;
        }
        const [clickX, clickY] = d3.pointer(event, svg.node());
        const xValue = xScale.invert(clickX);
        const yValue = yScale.invert(clickY);
        return [...prev, { x: xValue, y: yValue }];
      });
    });
  }

  function plotPointOnAxis() {
    const points = coordinateSystemRef.current.selectAll("circle").data(dataPoints, (d) => `${d.x},${d.y}`);

    points.exit().remove();

    points
      .enter()
      .append("circle")
      .merge(points)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", "linear-regression-point")
      .attr("r", 10);
  }

  function plotLinearRegression() {
    if (dataPoints.length < 2) return;

    const { m, b } = calculateRegressionLine(dataPoints);

    updateRegressionLine(m, b);
    updateVerticalLinesToRegression(dataPoints, m, b);
  }

  function calculateRegressionLine(dataPoints) {
    const X = dataPoints.map(({ x }) => [x, 1]);
    const t = dataPoints.map(({ y }) => [y]);

    const XT = numeric.transpose(X);
    const XTX = numeric.dot(XT, X);
    const pseudoInverse = numeric.dot(numeric.inv(XTX), XT);
    const weights = numeric.dot(pseudoInverse, t);

    return { m: weights[0][0], b: weights[1][0] };
  }

  function updateRegressionLine(m, b) {
    const linearRegressionLine = (x) => m * x + b;

    let line = coordinateSystemRef.current.select("line.linear-regression-line");

    if (line.empty()) {
      line = coordinateSystemRef.current
        .append("line")
        .attr("class", "linear-regression-line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(linearRegressionLine(0)))
        .attr("x2", xScale(10))
        .attr("y2", yScale(linearRegressionLine(10)));
    } else {
      line
        .transition()
        .ease(d3.easeBackOut)
        .duration(200)
        .attr("x1", xScale(0))
        .attr("y1", yScale(linearRegressionLine(0)))
        .attr("x2", xScale(10))
        .attr("y2", yScale(linearRegressionLine(10)));
    }
  }

  function updateVerticalLinesToRegression(dataPoints, m, b) {
    const linearRegressionLine = (x) => m * x + b;

    const verticalLines = coordinateSystemRef.current
      .selectAll(".vertical-line-to-linear-regression-line")
      .data(dataPoints, (d) => `${d.x},${d.y}`);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-line-to-linear-regression-line")
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(linearRegressionLine(d.x)))
      .merge(verticalLines)
      .each(function (d) {
        d3.select(this)
          .transition()
          .ease(d3.easeBackOut)
          .duration(200)
          .attr("x1", xScale(d.x))
          .attr("y1", yScale(d.y))
          .attr("x2", xScale(d.x))
          .attr("y2", yScale(linearRegressionLine(d.x)));
      });

    verticalLines.exit().remove();
  }

  function clear() {
    setDataPoints([]);
    coordinateSystemRef.current.selectAll("circle").remove();
    coordinateSystemRef.current.selectAll("line.linear-regression-line").remove();
    coordinateSystemRef.current.selectAll(".vertical-line-to-linear-regression-line").remove();
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="setting-changer">
        <div className="clear-button">
          <svg
            width="40"
            height="40"
            onClick={clear}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <line x1="10" y1="10" x2="30" y2="30" stroke="red" strokeWidth="4" />
            <line x1="10" y1="30" x2="30" y2="10" stroke="red" strokeWidth="4" />
          </svg>
          <strong>Clear</strong>
        </div>
      </div>
    </>
  );
}
