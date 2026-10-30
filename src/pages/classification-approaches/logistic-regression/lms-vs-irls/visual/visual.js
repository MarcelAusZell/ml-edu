import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svg = useRef();
  const svgRef = useRef();
  const coordSystemLMS = useRef();
  const coordSystemIRLS = useRef();
  const xScaleLMS = d3.scaleLinear().domain([0, 10]).range([5, 95]);
  const yScaleLMS = d3.scaleLinear().domain([0, 10]).range([45, 5]);
  const xScaleIRLS = d3.scaleLinear().domain([0, 10]).range([5, 95]);
  const yScaleIRLS = d3.scaleLinear().domain([0, 10]).range([95, 55]);

  const dataPoints = [
    { x: 1, y: 1, t: 0 },
    { x: 2, y: 2, t: 0 },
    { x: 3, y: 0.5, t: 0 },
    { x: 3.4, y: 3.25, t: 0 },
    { x: 4.2, y: 1.2, t: 0 },
    { x: 4.6, y: 3.2, t: 0 },
    { x: 5, y: 1.5, t: 0 },
    { x: 7, y: 5.5, t: 1 },
    { x: 6.5, y: 7.3, t: 1 },
    { x: 7, y: 7.8, t: 1 },
    { x: 7.5, y: 6, t: 1 },
    { x: 8, y: 7.5, t: 1 },
    { x: 7.7, y: 9, t: 1 },
    { x: 8.3, y: 5, t: 1 },
    { x: 9, y: 6.5, t: 1 },
    { x: 8.75, y: 8, t: 1 },
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 10,
      action: () => {
        drawCoordSystem(svgRef, xScaleLMS, yScaleLMS, 45, 5, coordSystemLMS);
        drawCoordSystem(svgRef, xScaleIRLS, yScaleIRLS, 95, 5, coordSystemIRLS);
        plotPoints(coordSystemLMS, dataPoints, xScaleLMS, yScaleLMS, 1.5);
        plotPoints(coordSystemIRLS, dataPoints, xScaleIRLS, yScaleIRLS, 1.5);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        plotFirstOrderLogisticRegression(1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        plotFirstOrderLogisticRegression(100);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        plotFirstOrderLogisticRegression(500);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 7,
      action: () => {
        plotFirstOrderLogisticRegression(1000);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 7,
      action: () => {},
      remove: () => {
        d3.select(svgRef.current).selectAll(".irls-decision-boundary").remove();
        d3.select(svgRef.current).selectAll(".irls-error-text").remove();
        d3.select(svgRef.current).selectAll(".irls-step-text").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        plotSecondOrderLogisticRegression(1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        plotSecondOrderLogisticRegression(2);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        plotSecondOrderLogisticRegression(10);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  function plotPoints(coordSystem, points, xScale, yScale, radius) {
    coordSystem.current
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "lms-vs-irls-data-point-visual")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("fill", (d) => (d.t === 1 ? "orange" : "steelblue"))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElasticOut)
      .duration(1000)
      .attr("r", radius);
  }

  function logisticSigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function binaryCrossEntropyError(weights, dataPoints) {
    let error = 0;
    const epsilon = 1e-15;

    dataPoints.forEach(({ x, y, t }) => {
      const y_n = logisticSigmoid(weights[0] + weights[1] * x + weights[2] * y);
      const y_n_clamped = Math.max(epsilon, Math.min(1 - epsilon, y_n));
      error += t * Math.log(y_n_clamped) + (1 - t) * Math.log(1 - y_n_clamped);
    });

    return -error;
  }

  function plotFirstOrderLogisticRegression(steps) {
    let w = [0.1, 0.1, 0.1];
    const learningRate = 0.1;

    for (let step = 0; step < steps; step++) {
      const gradient = [0, 0, 0];

      dataPoints.forEach(({ x, y, t }) => {
        const y_n = logisticSigmoid(w[0] + w[1] * x + w[2] * y);
        gradient[0] += y_n - t;
        gradient[1] += (y_n - t) * x;
        gradient[2] += (y_n - t) * y;
      });

      w[0] -= learningRate * gradient[0];
      w[1] -= learningRate * gradient[1];
      w[2] -= learningRate * gradient[2];
    }
    updateDecisionBoundary(coordSystemLMS, w, xScaleLMS, yScaleLMS, "lms-decision-boundary");
    updateConvergenceText(coordSystemLMS, xScaleLMS, yScaleLMS, steps, binaryCrossEntropyError(w, dataPoints), "lms");
  }

  function plotSecondOrderLogisticRegression(steps) {
    let w = [0.1, 0.1, 0.1];

    for (let step = 0; step < steps; step++) {
      const gradient = [0, 0, 0];
      const hessian = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      dataPoints.forEach(({ x, y, t }) => {
        const y_n = logisticSigmoid(w[0] + w[1] * x + w[2] * y);
        const r_n = y_n * (1 - y_n);

        gradient[0] += y_n - t;
        gradient[1] += (y_n - t) * x;
        gradient[2] += (y_n - t) * y;

        hessian[0][0] += r_n;
        hessian[0][1] += r_n * x;
        hessian[0][2] += r_n * y;
        hessian[1][0] += r_n * x;
        hessian[1][1] += r_n * x * x;
        hessian[1][2] += r_n * x * y;
        hessian[2][0] += r_n * y;
        hessian[2][1] += r_n * y * x;
        hessian[2][2] += r_n * y * y;
      });

      const hessianInv = numeric.inv(hessian);
      const deltaW = numeric.dot(hessianInv, gradient);

      w[0] -= deltaW[0];
      w[1] -= deltaW[1];
      w[2] -= deltaW[2];
    }
    updateDecisionBoundary(coordSystemIRLS, w, xScaleIRLS, yScaleIRLS, "irls-decision-boundary");
    updateConvergenceText(
      coordSystemIRLS,
      xScaleIRLS,
      yScaleIRLS,
      steps,
      binaryCrossEntropyError(w, dataPoints),
      "irls"
    );
  }

  function updateConvergenceText(coordSystem, xScale, yScale, steps, error, className) {
    const errorText = coordSystem.current.selectAll(`.${className}-error-text`).data([error]);

    errorText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", `${className}-error-text`)
          .attr("x", xScale(5))
          .attr("y", yScale(9))
          .attr("text-anchor", "middle")
          .attr("font-size", "2px")
          .text((d) => `E(w): ${d.toFixed(3)}`),
      (update) => update.text((d) => `E(w): ${d.toFixed(3)}`)
    );

    const stepText = coordSystem.current.selectAll(`.${className}-step-text`).data([steps]);

    stepText.join(
      (enter) =>
        enter
          .append("text")
          .attr("class", `${className}-step-text`)
          .attr("x", xScale(5))
          .attr("y", yScale(8))
          .attr("text-anchor", "middle")
          .attr("font-size", "2px")
          .attr("fill", "black")
          .text((d) => `Steps: ${d}`),
      (update) => update.text((d) => `Steps: ${d}`)
    );
  }

  function updateDecisionBoundary(coordSystem, w, xScale, yScale, className) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const rawLineData = [
      { x: 0, y: -w[0] / w[2] },
      { x: 10, y: -(w[0] + w[1] * 10) / w[2] },
    ];

    const lineData = rawLineData.map((point) => ({
      x: clamp(point.x, 0, 10),
      y: clamp(point.y, 0, 10),
    }));

    const boundary = coordSystem.current.selectAll(`.${className}`).data([lineData]);

    boundary
      .enter()
      .append("line")
      .attr("class", className)
      .attr("x1", (d) => xScale(d[0].x))
      .attr("y1", (d) => yScale(d[0].y))
      .attr("x2", (d) => xScale(d[1].x))
      .attr("y2", (d) => yScale(d[1].y))
      .merge(boundary)
      .transition()
      .ease(d3.easeBackOut)
      .duration(500)
      .attr("x1", (d) => xScale(d[0].x))
      .attr("y1", (d) => yScale(d[0].y))
      .attr("x2", (d) => xScale(d[1].x))
      .attr("y2", (d) => yScale(d[1].y));
  }

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
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 0.75)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "2px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 0.75)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "2px");
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

  return <svg ref={svgRef} viewBox="0 0 100 100" />;
}
