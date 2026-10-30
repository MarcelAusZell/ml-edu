import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-non-parametric-methods.scss";

export default function IntroductionCardNonParametricMethods() {
  const svgRef = useRef();
  const xScale = d3.scaleLinear().domain([-3, 3]).range([0, 100]);
  const yScale = d3.scaleLinear().domain([0, 3]).range([25, 0]); // Adjusted domain

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

  function plotKernelDensityEstimation(dataPoints, bandwidth) {
    const xValues = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const yValues = xValues.map((d) => kernelDensityEstimation(d, dataPoints, bandwidth));

    const line = d3
      .line()
      .x((d, i) => xScale(xValues[i]))
      .y((d) => yScale(d));

    const svg = d3.select(svgRef.current);

    svg
      .selectAll("path")
      .data([yValues])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("d", line)
            .attr("class", "parametric-methods-introduction-gaussian")
            .attr("stroke", "black")
            .attr("fill", "none"),
        (update) => update.transition().duration(2000).attr("d", line)
      );
  }

  function updatePoints(data) {
    const circles = d3.select(svgRef.current).selectAll("circle").data(data);

    circles.join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", 25)
          .attr("r", 1)
          .attr("class", "parametric-methods-introduction-point"),
      (update) =>
        update
          .transition()
          .duration(2000)
          .attr("cx", (d) => xScale(d.x))
          .attr("cy", 25)
          .attr("r", 1)
    );
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let currentIndex = 0;

    const updateAndPlot = () => {
      const data = d3.range(10).map(() => ({ x: d3.randomUniform(-3, 3)() }));

      updatePoints(data);


      plotKernelDensityEstimation(data, 0.5);
      currentIndex = currentIndex + 1;
    };

    updateAndPlot();

    const interval = setInterval(updateAndPlot, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Nonparametric Methods</div>
    </div>
  );
}
