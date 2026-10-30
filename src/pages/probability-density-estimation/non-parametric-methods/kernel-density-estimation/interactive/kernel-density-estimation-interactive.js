import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import latexFormula from "../../../../../utils/latex-formula";
import "./kernel-density-estimation-interactive.scss";

export default function KernelDensityEstimationInteractive({ svgWidth, svgHeight }) {
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
  const [bandwidth, setBandwidth] = useState(0.5);

  const svgRef = useRef();
  const axisRef = useRef();
  const pathRef = useRef(null);

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 3]).range([450, 50]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 450, 50, axisRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
  }, [dataPoints]);

  useEffect(() => {
    if (dataPoints.length === 0) return;
    axisRef.current.selectAll(".kernel-density-estimation").remove();
    axisRef.current.selectAll(".gaussian-kernel").remove();
    plotKernelDensityEstimation();
  }, [bandwidth, dataPoints]);

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
      .attr("class", "kde-data-point")
      .attr("r", 10)
      .transition()
      .ease(d3.easeBounceOut)
      .duration(400)
      .attr("cy", yScale(0));
  }

  function kernelDensityEstimation(x, dataPoints, bandwidth) {
    const dataPointsX = dataPoints.map((point) => point.x);
    const n = dataPoints.length;
    const h = bandwidth;
    const factor = (1 / (n * h)) * Math.sqrt(2 * Math.PI);
    let sum = 0;
    dataPointsX.forEach((point) => {
      sum += Math.exp(-Math.pow(x - point, 2) / (2 * Math.pow(h, 2)));
    });
    return factor * sum;
  }

  function plotKernelDensityEstimation() {
    const x = d3.range(0, 10, 0.01);
    const y = x.map((d) => kernelDensityEstimation(d, dataPoints, bandwidth));

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    if (!pathRef.current) {
      pathRef.current = axisRef.current
        .append("path")
        .attr("class", "kernel-density-estimation-line")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("fill", "none");
    }
    pathRef.current.datum(y).transition().duration(400).ease(d3.easeBackOut).attr("d", line);
  }

  function clear() {
    d3.selectAll(".kde-data-point").remove();
    d3.selectAll(".kernel-density-estimation-line").remove();
    setDataPoints([]);
    pathRef.current = null;
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} height={500} width={1000} viewBox={`0 0 1000 500`} />
      </div>

      {latexFormula(`$h =  ${bandwidth !== null ? bandwidth : "-"}$`)}
      <div className="setting-container-slider">
        <input
          type="range"
          className="form-range"
          min="0.02"
          max="3"
          step="0.01"
          value={bandwidth}
          onChange={(e) => setBandwidth(e.target.value)}
        ></input>
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
        </div>
      </div>
    </>
  );
}
