import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-bayes.scss";

export default function IntroductionCardBayesDecisionTheory() {
  const svgRef = useRef();

  function univariateGaussian(x, m, v) {
    return (1 / Math.sqrt(2 * Math.PI * v)) * Math.exp((-0.5 * Math.pow(x - m, 2)) / v);
  }

  function plotProbabilityFunction(svg, plot, m1, v1, p1, m2, v2, p2, className) {
    const xValues = d3.range(-10, 10, 0.1);

    const data = xValues.map((x) => {
      const likelihood1 = univariateGaussian(x, m1, v1);
      const likelihood2 = univariateGaussian(x, m2, v2);
      let y;
      if (plot === "likelihood") {
        y = likelihood1;
      } else if (plot === "likelihoodXPrior") {
        y = likelihood1 * p1;
      } else {
        y = (likelihood1 * p1) / (likelihood1 * p1 + likelihood2 * p2);
      }
      return { x, y };
    });

    const xScale = d3.scaleLinear().domain([-10, 10]).range([0, 100]);
    const yScale = d3.scaleLinear().domain([0, 1.1]).range([30, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg
      .selectAll(`.${className}`)
      .data([data])
      .join(
        (enter) => enter.append("path").attr("class", className).attr("d", line),
        (update) => update.transition().duration(5000).attr("d", line),
        (exit) => exit.remove()
      );
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const plots = ["likelihood", "likelihoodXPrior", "posterior"];
    let currentIndex = 0;

    const updateAndPlot = () => {
      plotProbabilityFunction(
        svg,
        plots[currentIndex],
        -1,
        2,
        0.75,
        5,
        1,
        0.5,
        "bayes-intro-probability-plot-1"
      );
      plotProbabilityFunction(
        svg,
        plots[currentIndex],
        5,
        1,
        0.5,
        -1,
        2,
        0.75,
        "bayes-intro-probability-plot-2"
      );
      currentIndex = (currentIndex + 1) % plots.length;
    };

    // Initial plot rendering without delay
    updateAndPlot();

    // Schedule subsequent updates
    const interval = setInterval(updateAndPlot, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Bayes Decision Theory</div>
    </div>
  );
}
