import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./sgd-interactive.scss";

// Other option for the surface function: x**2 + y**2

// const surfaceFunction = (x, y) => x**2 + y**2;
// const GradSurfaceFunction = (X, Y) => {
//   const grad_x = 2 * X;
//   const grad_y = 2 * Y;
//   return [grad_x, grad_y];
// };

const surfaceFunction = (x, y) => 2 * x ** 2 - 1.05 * x ** 4 + x ** 6 / 6 + x * y + y ** 2;

const GradSurfaceFunction = (X, Y) => {
  const grad_x = 4 * X - 4.2 * X ** 3 + X ** 5 + Y;
  const grad_y = X + 2 * Y;
  return [grad_x, grad_y];
};

const GradientDescent = (startingPoint, learningRate, numIterations) => {
  let point = startingPoint.slice();
  let trajectory = [point];
  for (let i = 0; i < numIterations; i++) {
    const [grad_x, grad_y] = GradSurfaceFunction(point[0], point[1]);
    point = [point[0] - learningRate * grad_x, point[1] - learningRate * grad_y];
    trajectory.push(point);
  }
  return trajectory;
};

const StochasticGradientDescent = (startingPoint, learningRate, numIterations) => {
  let point = startingPoint.slice();
  let trajectory = [point];
  for (let i = 0; i < numIterations; i++) {
    const [grad_x, grad_y] = GradSurfaceFunction(point[0], point[1]);
    const noise = [d3.randomNormal(0, 0.6)(), d3.randomNormal(0, 0.6)()];
    point = [point[0] - learningRate * (grad_x + noise[0]), point[1] - learningRate * (grad_y + noise[1])];
    trajectory.push(point);
  }
  return trajectory;
};

export default function StochasticGradientDescentInteractive() {
  const svgRef = useRef();
  const [startingPoint, setStartingPoint] = useState([-1.9, -0.9]);
  const [learningRate, setLearningRate] = useState(0.15);
  const [numIterations, setNumIterations] = useState(50);

  const coordSystemGDRef = useRef();
  const xScaleGD = d3.scaleLinear().domain([-2, 2]).range([50, 950]);
  const yScaleGD = d3.scaleLinear().domain([-1, 1]).range([450, 50]);

  const coordSystemSGDRef = useRef();
  const xScaleSGD = d3.scaleLinear().domain([-2, 2]).range([50, 950]);
  const yScaleSGD = d3.scaleLinear().domain([-1, 1]).range([950, 550]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScaleGD, yScaleGD, 450, 50, coordSystemGDRef);
    drawCoordSystem(svgRef, xScaleSGD, yScaleSGD, 950, 50, coordSystemSGDRef);
    draw2DSurface(coordSystemGDRef.current, xScaleGD, yScaleGD);
    draw2DSurface(coordSystemSGDRef.current, xScaleSGD, yScaleSGD);
    drawGlobalMinimum(coordSystemGDRef.current, xScaleGD, yScaleGD);
    drawGlobalMinimum(coordSystemSGDRef.current, xScaleSGD, yScaleSGD);
    addCoordSystemLabels();
  }, []);

  useEffect(() => {
    drawTrajectories();
  }, [startingPoint, learningRate, numIterations]);

  const drawTrajectories = () => {
    const gdTrajectory = GradientDescent(startingPoint, learningRate, numIterations);
    const sgdTrajectory = StochasticGradientDescent(startingPoint, learningRate, numIterations);

    drawTrajectory(coordSystemGDRef.current, gdTrajectory, xScaleGD, yScaleGD, "white");
    drawTrajectory(coordSystemSGDRef.current, sgdTrajectory, xScaleSGD, yScaleSGD, "white");
  };

  const drawTrajectory = (coordSystem, trajectory, xScale, yScale, color) => {
    coordSystem.selectAll(".trajectory").remove();
    coordSystem.selectAll(".start-end-circles").remove();

    // Trajectory line
    coordSystem
      .append("path")
      .datum(trajectory)
      .attr("class", "trajectory")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
      );

    // Draw start and end circles
    coordSystem
      .append("circle")
      .attr("class", "start-end-circles")
      .attr("cx", xScale(trajectory[0][0]))
      .attr("cy", yScale(trajectory[0][1]))
      .attr("r", 8)
      .attr("fill", "limegreen")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    coordSystem
      .append("circle")
      .attr("class", "start-end-circles")
      .attr("cx", xScale(trajectory[trajectory.length - 1][0]))
      .attr("cy", yScale(trajectory[trajectory.length - 1][1]))
      .attr("r", 8)
      .attr("fill", "red")
      .attr("stroke", "black")
      .attr("stroke-width", 2);
  };

  const draw2DSurface = (coordSystem, xScale, yScale) => {
    const rectSize = 0.1;
    const startX = xScale.domain()[0];
    const endX = xScale.domain()[1];
    const startY = yScale.domain()[0];
    const endY = yScale.domain()[1];

    const x = d3.range(startX, endX, rectSize);
    const y = d3.range(startY, endY, rectSize);
    const surface = [];
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        surface.push({ x: x[i], y: y[j], z: surfaceFunction(x[i], y[j]) });
      }
    }
    const min = d3.min(surface, (d) => d.z);
    const max = d3.max(surface, (d) => d.z);

    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([min, max]);
    const rectWidth = xScale(rectSize) - xScale(0);
    const rectHeight = yScale(0) - yScale(rectSize);

    coordSystem
      .selectAll("rect")
      .data(surface)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("stroke", (d) => colorScale(d.z))
      .attr("fill", (d) => colorScale(d.z));
  };

  const drawCoordSystem = (svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) => {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    coordSystem
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(d3.axisBottom(xScale).tickValues([0, -1, 1]).tickFormat(d3.format("d")).tickPadding(10).tickSize(0))
      .attr("stroke-width", 7)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([0])
          .tickFormat(d3.format("d"))
          .tickPadding(10)

          .tickSize(0)
      )
      .attr("stroke-width", 7)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");
  };

  const drawDebugGrid = () => {
    const svg = d3.select(svgRef.current);

    const g = svg.append("g");
    g.attr("stroke", "black").attr("stroke-width", 5).attr("stroke-opacity", 0.1);

    for (let i = 0; i <= 1000; i += 100) {
      g.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", 1000);
    }
    for (let i = 0; i <= 1000; i += 100) {
      g.append("line").attr("x1", 0).attr("y1", i).attr("x2", 1000).attr("y2", i);
    }
  };

  function drawGlobalMinimum(coordSystem, xScale, yScale) {
    const symbolGenerator = d3.symbol().type(d3.symbolStar).size(100);
    const pathData = symbolGenerator();
    const symbol = coordSystem
      .append("path")
      .attr("d", pathData)
      .attr("transform", `translate(${xScale(0)}, ${yScale(0)})`)
      .attr("fill", "yellow");

    symbol
      .transition()
      .duration(1000)
      .attr("transform", `translate(${xScale(0)}, ${yScale(0)}) scale(1.5)`)
      .transition()
      .duration(1000)
      .attr("transform", `translate(${xScale(0)}, ${yScale(0)}) scale(1)`)
      .on("end", function repeat() {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("transform", `translate(${xScale(0)}, ${yScale(0)}) scale(1.5)`)
          .transition()
          .duration(1000)
          .attr("transform", `translate(${xScale(0)}, ${yScale(0)}) scale(1)`)
          .on("end", repeat);
      });
  }

  function addCoordSystemLabels() {
    const svg = d3.select(svgRef.current);

    const labels = [
      { x: 500, y: 40, text: "Gradient Descent" },
      { x: 500, y: 540, text: "Stochastic Gradient Descent" },
    ];

    labels.forEach((label) => {
      svg
        .append("text")
        .attr("x", label.x)
        .attr("y", label.y)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .attr("class", "sgd-interactive-label")
        .text(label.text);
    });
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} height={500} viewBox="0 0 1000 1000" />
      </div>

      <div className="sgd-interactive-setting-container">
        <div className="interactive-slider-container">
          <label>
            <span>Learning Rate: {learningRate}</span>
            <input
              className="form-range"
              type="range"
              min="0.001"
              max="0.2"
              step="0.001"
              value={learningRate}
              onChange={(e) => setLearningRate(+e.target.value)}
            />
          </label>
        </div>
        <div className="interactive-slider-container">
          <label>
            <span>Iterations: {numIterations}</span>
            <input
              className="form-range"
              type="range"
              min="0"
              max="1000"
              step="1"
              value={numIterations}
              onChange={(e) => setNumIterations(+e.target.value)}
            />
          </label>
        </div>
      </div>
    </>
  );
}
