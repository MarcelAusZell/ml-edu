import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import latexFormula from "../../../../../utils/latex-formula";
import "./histograms-interactive.scss";

export default function HistogramsInteractive({ svgWidth, svgHeight }) {
  const [dataPoints, setDataPoints] = useState([
    {
      x: 2.42,
      y: 0,
    },
    {
      x: 2.14,
      y: 0,
    },
    {
      x: 3.54,
      y: 0,
    },
    {
      x: 2.2,
      y: 0,
    },
    {
      x: 2.4,
      y: 0,
    },
    {
      x: 2.26,
      y: 0,
    },
    {
      x: 3.48,
      y: 0,
    },
    {
      x: 3.64,
      y: 0,
    },

    {
      x: 9.68,
      y: 0,
    },
    {
      x: 9.29,
      y: 0,
    },
    {
      x: 6.62,
      y: 0,
    },
    {
      x: 8.89,
      y: 0,
    },
    {
      x: 7.7,
      y: 0,
    },
    {
      x: 6.15,
      y: 0,
    },
    {
      x: 9.38,
      y: 0,
    },
    {
      x: 7.17,
      y: 0,
    },
  ]);
  const [binSize, setBinSize] = useState(1);

  const svgRef = useRef();
  const axisRef = useRef();

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([450, 50]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 450, 50, axisRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
  }, [dataPoints]);

  useEffect(() => {
    plotHistogram();
  }, [dataPoints, binSize]);

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
          .tickFormat((d) => d3.format("d")(d))
          .tickSize(0)
          .tickPadding(5)
          .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9])
      )
      .attr("stroke-width", 5)
      .style("font-size", "15px")
      .style("opacity", 0.5);
  }

  let histogramRef = [];

  function plotHistogram() {
    const histogram = d3.histogram().domain([0, 10]).thresholds(d3.range(0, 10, binSize));
    const bins = histogram(dataPoints.map((d) => d.x));
    const bar = axisRef.current.selectAll(".histogram-bar").data(bins);
    const N = dataPoints.length;
    const barGap = 2;

    bar.exit().remove();

    if (dataPoints.length > 0) {
      const barEnter = bar
        .enter()
        .append("rect")
        .attr("class", "histogram-bar")
        .attr("x", (d) => Math.abs(xScale(d.x0) + barGap))
        .attr("y", Math.abs(450))
        .attr("width", (d) => Math.abs(Math.max(0, xScale(d.x1) - xScale(d.x0) - barGap)))
        .attr("height", 0);

      barEnter
        .merge(bar)
        .transition()
        .ease(d3.easeExpOut)
        .duration(300)
        .attr("x", (d) => Math.abs(xScale(d.x0) + barGap))
        .attr("y", (d) => Math.abs(yScale(d.length / N)))
        .attr("width", (d) => Math.abs(Math.max(0, xScale(d.x1) - xScale(d.x0) - barGap)))
        .attr("height", (d) => Math.abs(450 - yScale(d.length / N)));

      // Save the current bins to the histogramRef for future reference
      histogramRef = bins.map((bin) => ({ ...bin })); // Copy bins to avoid mutation issues
    }
  }

  function clickToAddPoints() {
    const svg = d3.select(svgRef.current);
    svg.on("click", (event) => {
      const [clickX, clickY] = d3.pointer(event, svg.node());
      const xValue = xScale.invert(clickX);
      const yValue = yScale.invert(clickY);
      setDataPoints((prev) => [...prev, { x: xValue, y: yValue }]);
    });
  }

  function plotPointOnAxis() {
    axisRef.current
      .selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", "histogram-data-point")
      .attr("r", 10)
      .transition()
      .ease(d3.easeBounceOut)
      .duration(400)
      .attr("cy", yScale(0));
  }

  function clear() {
    d3.selectAll(".histogram-bar").remove();
    d3.selectAll(".histogram-data-point").remove();
    setDataPoints([]);
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} height={500} width={1000} viewBox={`0 0 1000 500`} />
      </div>
      {latexFormula(`$\\Delta_i =  ${binSize !== null ? binSize.toFixed(2) : "-"}$`)}
      <div className="setting-container-slider">
        <input
          className="form-range"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={binSize}
          onChange={(e) => setBinSize(parseFloat(e.target.value))}
        />{" "}
        <div className="clear-button" style={{ marginTop: "20px" }}>
          <svg
            width="40"
            height="40"
            onClick={() => clear()}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <line x1="10" y1="10" x2="30" y2="30" stroke="red" strokeWidth="4" />
            <line x1="10" y1="30" x2="30" y2="10" stroke="red" strokeWidth="4" />
          </svg>
          <strong>Clear</strong>
        </div>{" "}
      </div>
    </>
  );
}
