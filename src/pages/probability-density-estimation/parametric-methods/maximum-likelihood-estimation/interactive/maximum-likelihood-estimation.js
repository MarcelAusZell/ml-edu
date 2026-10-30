import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexFormula from "../../../../../utils/latex-formula";
import "./maximum-likelihood-estimation.scss";

export default function MaximumLikelihoodEstimation({ svgWidth, svgHeight }) {
  const [dataPoints, setDataPoints] = useState([ { x: 3, y: 0 }, { x: 4, y: 0 } ]);
  const [mean, setMean] = useState(null);
  const [variance, setVariance] = useState(null);

  const svgRef = useRef();
  const axisRef = useRef();
  const pathRef = useRef(null);

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([450, 50]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 450, 50, axisRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
    if (dataPoints.length > 1) calculateMLE();
    if (mean !== null && variance !== null) plotProbabilityDensityEstimation();
  }, [mean, variance, dataPoints]);

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
      .attr("r", 12)
      .attr("class", "mle-point")
      .transition()
      .ease(d3.easeBounceOut)
      .duration(400)
      .attr("cy", yScale(0));
  }

  function calculateMLE() {
    let xValues = [];
    if (dataPoints.every((val, i, arr) => val.x === arr[0].x)) {
      xValues = [...new Set(dataPoints.map((d) => d.x))];
    } else {
      xValues = dataPoints.map((d) => d.x);
    }

    const negativeLogLikelihood = (params) => {
      const [mean, variance] = params;
      const n = xValues.length;
      const logLikelihood =
        -n * Math.log(Math.sqrt(2 * Math.PI * variance)) -
        xValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / (2 * variance);
      return -logLikelihood;
    };

    let initialGuessMean = d3.mean(xValues);
    let initialGuessVariance = d3.variance(xValues);
    if (isNaN(initialGuessVariance)) {
      initialGuessVariance = 0.001;
    }
    const initialGuess = [initialGuessMean, initialGuessVariance];

    const result = numeric.uncmin(negativeLogLikelihood, initialGuess);

    const [estimatedMean, estimatedVariance] = result.solution;
    setMean(estimatedMean);
    setVariance(estimatedVariance);
  }

  function plotProbabilityDensityEstimation() {
    if (mean === null || variance === null || dataPoints.length < 2) return;

    const univariateGaussian = (x, mean, variance) => {
      return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    };

    const x = d3.range(0, 10, 0.01);
    const y = x.map((d) => univariateGaussian(d, mean, variance));
    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    if (!pathRef.current) {
      pathRef.current = axisRef.current.append("path").attr("class", "mle-univariate-gaussian-line");
    }
    pathRef.current.datum(y).transition().duration(600).ease(d3.easeBackOut).attr("d", line);
  }

  function clear() {
    d3.selectAll(".mle-point").remove();
    d3.selectAll(".mle-univariate-gaussian-line").remove();
    setDataPoints([]);
    setMean(null);
    setVariance(null);
    pathRef.current = null;
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      {latexFormula(`$\\hat{\\mu} =  ${mean !== null ? mean.toFixed(2) : "-"}$`)}
      {latexFormula(`$\\hat{\\sigma}^2 =  ${variance !== null ? variance.toFixed(2) : "-"}$`)}

      <div className="setting-container">
        <div className="clear-button">
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
