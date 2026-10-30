import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-linear-discriminants.scss";

export default function IntroductionCardLinearDiscriminants() {
  const svgRef = useRef();

  const dataPoints0 = [
    { x: 40, y: 13, label: -1 },
    { x: 35, y: 10, label: -1 },
    { x: 55, y: 14, label: -1 },
    { x: 45, y: 13, label: -1 },
    { x: 25, y: 7, label: -1 },
    { x: 32, y: 5, label: -1 },
    { x: 40, y: 8, label: -1 },
    { x: 50, y: 10, label: -1 },
    { x: 60, y: 12, label: -1 },
    { x: 30, y: 22, label: 1 },
    { x: 38, y: 24, label: 1 },
    { x: 45, y: 25, label: 1 },
    { x: 50, y: 28, label: 1 },
    { x: 60, y: 24, label: 1 },
    { x: 55, y: 26, label: 1 },
    { x: 32, y: 28, label: 1 },
    { x: 41, y: 27.5, label: 1 },
  ];

  const dataPoints1 = [
    { x: 10, y: 10, label: -1 },
    { x: 11, y: 18, label: -1 },
    { x: 12, y: 25, label: -1 },
    { x: 15, y: 12, label: -1 },
    { x: 18, y: 18, label: -1 },
    { x: 20, y: 7, label: -1 },
    { x: 23, y: 13, label: -1 },
    { x: 25, y: 20, label: -1 },
    { x: 25, y: 20, label: -1 },
    { x: 35, y: 25, label: 1 },
    { x: 39, y: 22, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
  ];

  const dataPoints2 = [
    { x: 10, y: 10, label: -1 },
    { x: 11, y: 18, label: -1 },
    { x: 12, y: 25, label: -1 },
    { x: 15, y: 12, label: -1 },
    { x: 18, y: 18, label: -1 },
    { x: 20, y: 7, label: -1 },
    { x: 23, y: 13, label: -1 },
    { x: 25, y: 20, label: -1 },
    { x: 25, y: 20, label: -1 },
    { x: 35, y: 25, label: 1 },
    { x: 39, y: 22, label: 1 },
    { x: 40, y: 28, label: 1 },
    { x: 50, y: 23, label: 1 },
    { x: 45, y: 24, label: 1 },
    { x: 80, y: 26, label: 1 },
    { x: 85, y: 23, label: 1 },
    { x: 88, y: 27, label: 1 },
  ];

  const dataSets = [dataPoints0, dataPoints1, dataPoints2];
  let currentIndex = 0;

  useEffect(() => {
    const updateAndPlot = () => {
      currentIndex = (currentIndex + 1) % dataSets.length;
      const currentData = dataSets[currentIndex];
      updateDataPoints(currentData);
      plotLeastSquaresClassification(currentIndex);
    };
    updateAndPlot();
    const interval = setInterval(updateAndPlot, 15000);
    return () => clearInterval(interval);
  }, []);

  function updateDataPoints(data) {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 2)
            .attr("fill", (d) => (d.label === -1 ? "orange" : "steelblue")),

        (update) =>
          update
            .transition()
            .duration(5000)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 2)
            .attr("fill", (d) => (d.label === -1 ? "orange" : "steelblue")),
        (exit) => exit.remove().transition().duration(5000).attr("r", 0).attr("fill", "red").remove()
      );
  }
  function plotLeastSquaresClassification(index) {
    const lines = [
      [13.034, 24.379],
      [69.033, -91.082],
      [34.088, -1.759],
    ];

    const [y1, y2] = lines[index];

    const svg = d3.select(svgRef.current);

    const line = svg.selectAll("line").data([null]);

    line.join(
      (enter) =>
        enter
          .append("line")
          .attr("class", "linear-discriminants-line-introduction-card")
          .attr("x1", 0)
          .attr("y1", y1)
          .attr("x2", 100)
          .attr("y2", y2),
      (update) =>
        update.transition().duration(5000).attr("x1", 0).attr("y1", y1).attr("x2", 100).attr("y2", y2)
    );
  }

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Linear Discriminants</div>
    </div>
  );
}
