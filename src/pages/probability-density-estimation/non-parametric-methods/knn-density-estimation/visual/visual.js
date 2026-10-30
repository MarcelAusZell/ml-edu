import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 20]).range([100, 900]);
const yScale = d3.scaleLinear().domain([0, 0.5]).range([900, 100]);
const xScale2D = d3.scaleLinear().domain([0, 10]).range([100, 900]);
const yScale2D = d3.scaleLinear().domain([2, 10]).range([900, 100]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axisRef = useRef();
  const coordinateSystemRef = useRef();
  const pathRef = useRef([]);

  const dataPoints = [
    { id: "data-point-1", x: 4 },
    { id: "data-point-2", x: 7.5 },
    { id: "data-point-3", x: 8 },
    { id: "data-point-5", x: 9 },
    { id: "data-point-6", x: 10 },
    { id: "data-point-7", x: 14 },
    { id: "data-point-8", x: 16 },
    { id: "data-point-9", x: 18 },
  ];

  const dataPoints2D = [
    { x: 1, y: 5 },
    { x: 3, y: 7 },
    { x: 3, y: 5 },
    { x: 6, y: 5 },
    { x: 4, y: 3 },
    { x: 6, y: 4 },
    { x: 7, y: 7 },
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 9,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 900, 900, axisRef);
        drawPoints(axisRef.current);
      },
      remove: () => {
        d3.selectAll(axisRef.current).remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        axisRef.current
          .append("circle")
          .attr("class", "knn-visual-center-point")
          .attr("cx", xScale(12.5))
          .attr("cy", yScale(0))
          .attr("r", 18);
      },
      remove: () => {
        d3.selectAll(".knn-visual-center-point").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        shouldAnimate = true;
        d3.selectAll(".knn-visual-hull-line").remove();
        d3.selectAll(".knn-visual-data-point-in-hull").attr("class", "kde-visual-data-point");
        drawLineHull(axisRef.current, 3, 12.5);
      },
      remove: () => {
        shouldAnimate = false;
        d3.selectAll(".knn-visual-line-text-label").remove();
        d3.selectAll(".knn-visual-hull-line").interrupt();
        d3.selectAll(".knn-visual-hull-line").remove();
        d3.selectAll(".knn-visual-data-point-in-hull").attr("class", "kde-visual-data-point");
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        drawKNNEstimate(axisRef.current, 3, 12.5);
      },
      remove: () => {
        d3.selectAll(".knn-visual-estimate-circle").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {},
      remove: () => {
        d3.selectAll(".knn-visual-hull-line-center").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        plotRadiusArrow(axisRef.current, 12.5, 3.5);
      },
      remove: () => {
        d3.selectAll(".visual-radius-arrow").remove();
        d3.selectAll(".visual-radius-arrow-text").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        plotKNNDensityEstimationAnimated(axisRef.current, 3);
      },
      remove: () => {
        d3.selectAll(".kde-visual-point-estimate-animated").remove();
        d3.selectAll(".knn-visual-hull-line-animated").remove();
        d3.selectAll(".knn-visual-hull-line-center-animated").remove();
        d3.selectAll(".knn-visual-data-point-in-hull").attr("class", "kde-visual-data-point");

        if (animatedKNNInterval) {
          clearInterval(animatedKNNInterval);
        }
      },
      called: false,
    },
    {
      start: 7,
      end: 9,
      action: () => {},
      remove: () => {
        d3.selectAll(".knn-visual-knn-path").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        plotKNNDensityEstimation(3);
        plotPathKNNDensityEstimation(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        plotKNNDensityEstimation(8);
        plotPathKNNDensityEstimation(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        plotKNNDensityEstimation(2);
        plotPathKNNDensityEstimation(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 11,
      action: () => {
        drawCoordSystem(svgRef, xScale2D, yScale2D, 900, 900, coordinateSystemRef, false);
        drawCircles(coordinateSystemRef.current);
      },
      remove: () => {
        d3.selectAll(coordinateSystemRef.current).remove();
        d3.selectAll(".knn-visual-data-point-in-hull").remove();
      },
      called: false,
    },
    {
      start: 11,
      end: 11,
      action: () => {
        drawCircleHull(coordinateSystemRef.current, 3);
      },
      remove: () => {
        d3.selectAll(".knn-visual-circle-text-label").remove();
        d3.selectAll(".knn-visual-hull-circle").remove();
        d3.selectAll(".knn-visual-center-circle").remove();
      },
      called: false,
    },
  ]).current;

  function plotKNNDensityEstimation(k) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map((d) => calulateKNNDensityEstimate(k, d));

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const pathData = line(y);
    pathRef.current.push({ data: pathData });
  }

  function calulateKNNDensityEstimate(k, center) {
    const distances = dataPoints.map((d) => ({
      distance: Math.abs(d.x - center),
      point: d,
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const V = distances.slice(0, k).map((d) => d.distance)[k - 1];
    const N = dataPoints.length;
    return k / (2 * V * N);
  }

  function plotPathKNNDensityEstimation(g) {
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      g.selectAll(".knn-visual-knn-path")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "knn-visual-knn-path"),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function drawNeigbours(g, k, center) {
    g.selectAll(".knn-visual-hull-line-animated").remove();
    g.selectAll(".knn-visual-data-point-in-hull").attr("class", "kde-visual-data-point");
    g.selectAll(".knn-visual-hull-line-center-animated").remove();

    const distances = dataPoints.map((d) => ({
      distance: Math.abs(d.x - center),
      point: d,
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const pointsInHull = distances.slice(0, k);
    const maxDistance = distances[k - 1].distance;

    pointsInHull.forEach(({ point }) => {
      g.append("line")
        .attr("class", "knn-visual-hull-line-animated")
        .attr("x1", xScale(center - maxDistance))
        .attr("y1", yScale(0) + 30)
        .attr("x2", xScale(center + maxDistance))
        .attr("y2", yScale(0) + 30);

      d3.select(`#${point.id}`).attr("class", "knn-visual-data-point-in-hull");
      d3.select(this).attr("class", "knn-visual-hull-line-in-hull-animated");
    });

    g.append("circle")
      .attr("class", "knn-visual-hull-line-center-animated")
      .attr("cx", xScale(center))
      .attr("cy", yScale(0) + 30)
      .attr("r", 12);
  }

  let animatedKNNInterval = null;

  function plotKNNDensityEstimationAnimated(g, k) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.015);
    let yValue = 0;
    let i = 0;
    animatedKNNInterval = setInterval(() => {
      if (i >= x.length) {
        clearInterval(animatedKNNInterval);
        return;
      }
      const xValue = x[i];

      drawNeigbours(g, k, xValue);

      const y = calulateKNNDensityEstimate(k, xValue);

      axisRef.current
        .append("circle")
        .attr("cx", xScale(xValue))
        .attr("cy", yScale(y))
        .attr("r", 5)
        .attr("class", "kde-visual-point-estimate-animated");
      i++;
    }, 1);
  }

  function calulateKNNDensityEstimate(k, center) {
    const distances = dataPoints.map((d) => ({
      distance: Math.abs(d.x - center),
      point: d,
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const V = distances.slice(0, k).map((d) => d.distance)[k - 1];
    const N = dataPoints.length;
    return k / (2 * V * N);
  }

  function drawKNNEstimate(g, k, center) {
    const distances = dataPoints.map((d) => ({
      distance: Math.abs(d.x - center),
      point: d,
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const V = distances.slice(0, k).map((d) => d.distance)[k - 1];
    const N = dataPoints.length;
    const KNNDensityEstimateValue = k / (2 * V * N);

    g.append("circle")
      .attr("class", "knn-visual-estimate-circle")
      .attr("cx", xScale(center))
      .attr("cy", yScale(KNNDensityEstimateValue))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", 9);
  }

  function drawPoints(g) {
    g.selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "kde-visual-data-point")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(0))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", 18);
  }

  function drawCircles(g) {
    g.selectAll("circle")
      .data(dataPoints2D)
      .enter()
      .append("circle")
      .attr("class", "knn-visual-data-circle")
      .attr("id", (d) => d.id)
      .attr("cx", (d) => xScale2D(d.x))
      .attr("cy", (d) => yScale2D(d.y))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", 18);
  }

  let shouldAnimate = true;

  function drawLineHull(g, k, center) {
    const distances = dataPoints.map((d) => ({
      distance: Math.abs(d.x - center),
      point: d,
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const pointsInHull = distances.slice(0, k);
    const hullLineText = g
      .append("text")
      .attr("x", xScale(center))
      .attr("y", yScale(0) + 60)
      .attr("class", "knn-visual-line-text-label")
      .text(`k = 0`);

    let kCounter = 0;

    pointsInHull.forEach(({ point, distance }, index) => {
      g.append("line")
        .attr("class", "knn-visual-hull-line")
        .attr("x1", xScale(center))
        .attr("y1", yScale(0) + 30)
        .attr("x2", xScale(center))
        .attr("y2", yScale(0) + 30)
        .transition()
        .duration(400)
        .delay(400 * kCounter)
        .attr("x1", xScale(center - distance))
        .attr("x2", xScale(center + distance))
        .attr("y1", yScale(0) + 30)
        .attr("y2", yScale(0) + 30)

        .on("end", () => {
          if (shouldAnimate) {
            d3.select(`#${point.id}`).attr("class", "knn-visual-data-point-in-hull");
            d3.select(this).attr("class", "knn-visual-hull-line-in-hull");
            hullLineText.text(`k = ${index + 1}`);
          }
        });

      kCounter++;
    });
  }

  function drawCircleHull(g, k) {
    const centerX = 5;
    const centerY = 5;

    g.append("circle")
      .attr("class", "knn-visual-center-circle")
      .attr("cx", xScale2D(centerX))
      .attr("cy", yScale2D(centerY))
      .attr("r", 12);

    const hullCircle = g
      .append("circle")
      .attr("class", "knn-visual-hull-circle")
      .attr("cx", xScale2D(centerX))
      .attr("cy", yScale2D(centerY))
      .attr("r", 12);

    const hullCircleText = g
      .append("text")
      .attr("x", xScale2D(centerX))
      .attr("y", yScale2D(centerY + 0.5))
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("class", "knn-visual-circle-text-label")
      .text(`k = 0`)
      .style("font-size", "30px");

    const pointsInHull = [
      { x: 6, y: 5, distance: 0.05 },
      { x: 6, y: 4, distance: 1.25 },
      { x: 3, y: 5, distance: 2 },
    ];

    let kCounter = 0;
    let previousTransition = hullCircle;

    pointsInHull.forEach(({ distance }) => {
      previousTransition = previousTransition
        .transition()
        .duration(800)
        .attr("r", xScale(distance))
        .on("end", () => {
          hullCircleText.text(`k = ${++kCounter}`);
        });
    });
  }
  function plotRadiusArrow(g, center, radius) {
    let arrow = {
      x1: xScale(center),
      y1: yScale(0) + 75,
      x2: xScale(center - radius) + 7,
      y2: yScale(0) + 75,
      className: "visual-radius-arrow",
    };

    g.select("defs").remove();

    g.append("defs")
      .append("marker")
      .attr("id", arrow.className)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", "5")
      .attr("refY", "5")
      .attr("markerWidth", "6")
      .attr("markerHeight", "6")
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("class", arrow.className);

    g.selectAll(".arrow")
      .data([arrow])
      .enter()
      .append("line")
      .attr("x1", (d) => d.x1)
      .attr("y1", (d) => d.y1)
      .attr("x2", (d) => d.x1)
      .attr("y2", (d) => d.y2)
      .attr("class", (d) => d.className)
      .attr("marker-end", (d) => "url(#" + d.className + ")")
      .transition()
      .duration(400)
      .attr("x2", (d) => d.x2);

    g.append("text")
      .attr("class", "visual-radius-arrow-text")
      .attr("x", arrow.x1 - 75)
      .attr("y", arrow.y1 + 15)
      .text("Rₖ(x)");
  }

  function drawCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, showAxis = true) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    if (showAxis) {
      coordSystem
        .append("g")
        .attr("transform", `translate(0,${xTransform})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat((d) => "")
            .tickSize(0)
        )
        .attr("stroke-width", 5)
        .attr("stroke-opacity", 0.5)
        .style("font-size", "20px");
    }
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
