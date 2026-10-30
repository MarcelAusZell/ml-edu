import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import latexFormula from "../../../../../utils/latex-formula";
import "./univariate-gaussian.scss";

export default function UnivariateGaussian() {
  const svgRef = useRef();
  const axisRef = useRef();

  const xScale = d3.scaleLinear().domain([-10, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([480, 50]);

  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(1);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 480, 50, axisRef);
  }, []);

  useEffect(() => {
    plotUnivariateGaussian(axisRef.current, mean, variance);
  }, [mean, variance]);

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
          .tickValues([-5, 0, 5])
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "15px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(d3.axisLeft(yScale).tickValues([0.5]).tickSize(0))
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "15px");

    latexOntoSvg(
      svg,
      "f(x) = \\mathcal{N}(x \\mid \\mu, \\sigma^2) = \\frac{1}{\\sqrt{2\\pi}\\sigma}\\text{exp}(-\\frac{(x - \\mu)^2}{2\\sigma^2})",
      500,
      50,
      "",
      "",
      "15"
    );
  }


  function plotUnivariateGaussian(g, mean, variance) {
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    const xValues = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const univariateGaussian = (x) => Math.sqrt(1 / (2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    const data = xValues.map((x) => ({ x: x, y: univariateGaussian(x, mean, variance) }));

    g.selectAll(".univariate-gaussian-line")
      .data([data])
      .join(
        (enter) => enter.append("path").attr("class", "univariate-gaussian-line").attr("d", line),
        (update) => update.attr("d", line),
        (exit) => exit.remove()
      );
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox="0 0 1000 500" width="1000" height="500"></svg>{" "}
      </div>

      <div className="setting-container-slider">
        {latexFormula(`$\\mu = ${Number(mean).toFixed(2)}$`)}
        <input
          type="range"
          className="form-range"
          min="-10"
          max="10"
          step="0.01"
          value={mean}
          onChange={(e) => setMean(e.target.value)}
        ></input>
        {latexFormula(`$\\sigma = ${Number(variance).toFixed(2)}$`)}

        <input
          type="range"
          className="form-range"
          min="0.2"
          max="10"
          step="0.01"
          value={variance}
          onChange={(e) => setVariance(e.target.value)}
        ></input>
      </div>
    </>
  );
}
