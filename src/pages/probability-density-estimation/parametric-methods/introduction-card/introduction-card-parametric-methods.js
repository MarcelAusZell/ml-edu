import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-parametric-methods.scss";

export default function IntroductionCardParametricMethods() {
  const svgRef = useRef();
  const xScale = d3.scaleLinear().domain([-3, 3]).range([0, 100]);
  const yScale = d3.scaleLinear().domain([0, 1.5]).range([25, 0]);

  function updateGausssian(svg, mean, variance) {
    const xValues = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const yValues = xValues.map((x) => {
      return Math.exp(-((x - mean) ** 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance);
    });

    const line = d3
      .line()
      .x((d, i) => xScale(xValues[i]))
      .y((d) => yScale(d));

    svg
      .selectAll("path")
      .data([yValues])
      .join(
        (enter) =>
          enter.append("path").attr("d", line).attr("class", "parametric-methods-introduction-gaussian"),
        (update) => update.transition().duration(2000).attr("d", line)
      );
  }

  function updatePoints(data) {
    const circles = d3.select(svgRef.current).selectAll("circle").data(data);

    circles.join(
      (enter) =>
        enter
          .append("circle")
          .attr("cx", (d) => xScale(d))
          .attr("cy", 25)
          .attr("r", 1)
          .attr("class", "parametric-methods-introduction-point"),
      (update) =>
        update
          .transition()
          .duration(2000)
          .attr("cx", (d) => xScale(d))
          .attr("cy", 25)
          .attr("r", 1)
    );
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let currentIndex = 0;

    const updateAndPlot = () => {
      const data = d3.range(10).map(() => d3.randomUniform(-1, 1)());
      const mean = d3.mean(data);
      const variance = d3.variance(data);
      updatePoints(data);
      updateGausssian(svg, mean, variance);
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
      <div className="centered-text">Parametric Methods</div>
    </div>
  );
}
