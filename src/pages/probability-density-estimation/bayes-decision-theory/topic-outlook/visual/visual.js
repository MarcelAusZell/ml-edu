import numeric from "numeric";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

  const circles = Array.from({ length: 13 }, (_, i) => ({
    className: "circle",
    id: `media5-c${i + 1}`,
  }));

  const states = [
    [
      { id: "media5-c1", x: 1, y: -1, radius: 16, color: "orange" },
      { id: "media5-c2", x: 2, y: -1, radius: 16, color: "orange" },
      { id: "media5-c3", x: 2, y: -1, radius: 16, color: "orange" },
      { id: "media5-c4", x: 2, y: -1, radius: 16, color: "orange" },
      { id: "media5-c5", x: 2.5, y: -1, radius: 16, color: "orange" },
      { id: "media5-c6", x: 3, y: -1, radius: 16, color: "orange" },
      { id: "media5-c7", x: 4, y: -1, radius: 16, color: "orange" },
      { id: "media5-c8", x: 6, y: 11, radius: 16, color: "steelblue" },
      { id: "media5-c9", x: 7, y: 11, radius: 16, color: "steelblue" },
      { id: "media5-c10", x: 7.5, y: 11, radius: 16, color: "steelblue" },
      { id: "media5-c11", x: 8, y: 11, radius: 16, color: "steelblue" },
      { id: "media5-c12", x: 8, y: 11, radius: 16, color: "steelblue" },
      { id: "media5-c13", x: 8, y: 11, radius: 16, color: "steelblue" },
    ],
    [
      { id: "media5-c1", x: 1, y: 2, radius: 16, color: "orange" },
      { id: "media5-c2", x: 2, y: 3, radius: 16, color: "orange" },
      { id: "media5-c3", x: 2, y: 1, radius: 16, color: "orange" },
      { id: "media5-c4", x: 2, y: 4, radius: 16, color: "orange" },
      { id: "media5-c5", x: 2.5, y: 3, radius: 16, color: "orange" },
      { id: "media5-c6", x: 3, y: 2, radius: 16, color: "orange" },
      { id: "media5-c7", x: 4, y: 4, radius: 16, color: "orange" },
      { id: "media5-c8", x: 6, y: 5, radius: 16, color: "steelblue" },
      { id: "media5-c9", x: 7, y: 4, radius: 16, color: "steelblue" },
      { id: "media5-c10", x: 7.5, y: 3.5, radius: 16, color: "steelblue" },
      { id: "media5-c11", x: 8, y: 2, radius: 16, color: "steelblue" },
      { id: "media5-c12", x: 8, y: 3, radius: 16, color: "steelblue" },
      { id: "media5-c13", x: 8.5, y: 4, radius: 16, color: "steelblue" },
    ],
  ];

  const meanXClass1 = states[1].reduce((acc, curr) => (curr.color === "orange" ? acc + curr.x : acc), 0) / 7;
  const meanYClass1 = states[1].reduce((acc, curr) => (curr.color === "orange" ? acc + curr.y : acc), 0) / 7;
  const meanVectorClass1 = [meanXClass1, meanYClass1];

  const meanXClass2 = states[1].reduce((acc, curr) => (curr.color === "steelblue" ? acc + curr.x : acc), 0) / 6;
  const meanYClass2 = states[1].reduce((acc, curr) => (curr.color === "steelblue" ? acc + curr.y : acc), 0) / 6;
  const meanVectorClass2 = [meanXClass2, meanYClass2];

  function covarianceMatrix(data, meanVector) {
    let covXX = 0;
    let conXY = 0;

    data.forEach((point) => {
      covXX += (point.x - meanVector[0]) ** 2;
      conXY += (point.x - meanVector[0]) * (point.y - meanVector[1]);
    });

    covXX /= data.length;
    conXY /= data.length;

    return [
      [covXX, conXY],
      [conXY, covXX],
    ];
  }

  const dataClass1 = states[1].filter((point) => point.color === "orange");
  const dataClass2 = states[1].filter((point) => point.color === "steelblue");

  const covMatrixClass1 = covarianceMatrix(dataClass1, meanVectorClass1);
  const covMatrixClass2 = covarianceMatrix(dataClass2, meanVectorClass2);

  const actions = useRef([
    {
      start: 1,
      end: 3,
      action: () => {
        updateCircles(svg.current, circles, states[0]);
        updateCircles(svg.current, circles, states[1]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        plotMultivariateGaussian(svg.current, meanVectorClass1, covMatrixClass1, xScale, yScale, "media-5-class-1");
        plotMultivariateGaussian(svg.current, meanVectorClass2, covMatrixClass2, xScale, yScale, "media-5-class-2");
      },
      remove: () => {
        d3.selectAll(".media-5-class-1").remove();
        d3.selectAll(".media-5-class-2").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        drawDecisionBoundary(svg.current);
      },
      remove: () => {
        d3.selectAll(".media-5-decision-boundary").remove();
      },
      called: false,
    },
  ]).current;

  function drawDecisionBoundary(g) {
    const decisionBoundary = g
      .append("line")
      .attr("class", "media-5-decision-boundary")
      .attr("x1", xScale(3.4))
      .attr("y1", yScale(7))
      .attr("x2", xScale(7.4))
      .attr("y2", yScale(0.5))
      .style("stroke-width", 4);

    const totalLength = decisionBoundary.node().getTotalLength();
    decisionBoundary
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .attr("stroke-dashoffset", 0);
  }

  function updateCircles(group, circles, state) {
    circles.forEach((circle) => {
      const existingCircle = group.select(`#${circle.id}`);
      const circleState = state.find((item) => item.id === circle.id);

      if (!existingCircle.empty()) {
        existingCircle
          .transition()
          .duration(300)
          .attr("cx", xScale(circleState.x))
          .attr("cy", yScale(circleState.y))
          .attr("r", circleState.radius)
          .style("fill", circleState.color)
          .style("opacity", circleState.radius);
      } else {
        group
          .append("circle")
          .attr("class", circle.className)
          .attr("id", circle.id)
          .attr("cx", xScale(circleState.x))
          .attr("cy", yScale(circleState.y))
          .attr("r", circleState.radius)
          .style("fill", circleState.color);
      }
    });
  }

  /* ---------------------------------------------------------------------------------------------------------------- */
  function multivariateGaussian(mean, covariance) {
    const size = mean.length;
    const det = numeric.det(covariance);
    const inv = numeric.inv(covariance);
    const coefficient = 1 / (Math.pow(2 * Math.PI, size / 2) * Math.sqrt(Math.abs(det)));
    return function (x) {
      const diff = numeric.sub(x, mean);
      const diffInv = numeric.dot(diff, inv);
      const exponent = -0.5 * numeric.dot(diffInv, diff);
      return coefficient * Math.exp(exponent);
    };
  }

  function samplePointsForThreshold(pdf, threshold, mean) {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const points = directions.map((dir) => {
      let step = 0.1;
      let [dx, dy] = dir;
      let x = mean[0] + dx * step;
      let y = mean[1] + dy * step;
      let value = pdf([x, y]);

      while (value > threshold) {
        step += 0.1;
        x = mean[0] + dx * step;
        y = mean[1] + dy * step;
        value = pdf([x, y]);
      }
      return { x, y };
    });

    return points;
  }

  function drawIsocontour(g, points, covariance, threshold, xScale, yScale, className) {
    const cx = d3.mean(points, (d) => d.x);
    const cy = d3.mean(points, (d) => d.y);

    const eigen = numeric.eig(covariance);
    const angle = Math.atan2(eigen.E.x[0][1], eigen.E.x[0][0]) * (180 / Math.PI);
    const scalingFactor = Math.sqrt(-2 * Math.log(threshold));
    const rx = scalingFactor * Math.sqrt(eigen.lambda.x[0]);
    const ry = scalingFactor * Math.sqrt(eigen.lambda.x[1]);

    g.append("ellipse")
      .attr("class", className)
      .attr("cx", xScale(cx))
      .attr("cy", yScale(cy))
      .attr("rx", Math.abs(xScale(rx) - xScale(0)))
      .attr("ry", Math.abs(yScale(ry) - yScale(0)))
      .style("fill-opacity", 0)

      .attr("transform", `rotate(${angle}, ${xScale(cx)}, ${yScale(cy)})`)
      .transition()
      .duration(threshold * 1000)
      .style("fill-opacity", threshold ** 4 + 0.1);
  }

  function plotMultivariateGaussian(g, mean, covariance, xScale, yScale, className) {
    const pdf = multivariateGaussian(mean, covariance);
    const thresholds = [0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8];
    thresholds.forEach((threshold) => {
      const points = samplePointsForThreshold(pdf, threshold, mean);
      if (points) {
        drawIsocontour(g, points, covariance, threshold, xScale, yScale, className);
      }
    });
  }

  useEffect(() => {
    if (currentStep === null) {
      d3.select(svgRef.current).selectAll("*").remove();
      actions.forEach((action) => {
        action.called = false;
      });
    }
    actions.forEach((action) => {
      const inRange = currentStep >= action.start && currentStep <= action.end;
      if (inRange && !action.called) {
        action.action();
        action.called = true;
      } else if (!inRange && action.called) {
        action.remove();
        action.called = false;
      }
    });
  }, [currentStep]);

  return <svg ref={svgRef} viewBox="0 0 1000 1000" />;
}
