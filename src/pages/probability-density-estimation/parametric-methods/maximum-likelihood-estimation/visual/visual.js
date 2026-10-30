import { useEffect, useRef } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import * as d3 from "d3";
import "./visual.scss";

const xScaleAxis = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScaleAxis = d3.scaleLinear().domain([0, 0.5]).range([600, 50]);

const xScaleCoordinateSystem = d3.scaleLinear().domain([1, 9]).range([50, 950]);
const yScaleCoordinateSystem = d3.scaleLinear().domain([1, 9]).range([950, 50]);

const xScaleAxisNew = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScaleAxisNew = d3.scaleLinear().domain([0, 0.5]).range([600, 50]);

const dataPoints = [1, 1.5, 2, 2.5, 3, 7, 7.5, 8, 8.5, 9];

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axisRef = useRef();
  const newAxisRef = useRef();
  const coordinateSystemRef = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 3,
      action: () => {
        drawCoordSystemComparison(svgRef, xScaleAxis, yScaleAxis, 600, 50, axisRef);
        plotPoints(axisRef.current, "media-1-data-points");
      },
      remove: () => {
        axisRef.current.selectAll("*").remove();
        d3.selectAll(".media-1-data-points").remove();
        d3.selectAll(".latex-label-ml-comparison").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updateFunction(
          (x) => univariateGaussian(x, 2, 1),
          "media-1-estimation-first",
          xScaleAxis,
          yScaleAxis,
          axisRef.current,
          "red"
        );

        latexOntoSvg(
          svg.current,
          "\\theta = (\\mu, \\sigma) = (2, 1)",
          500,
          100,
          "latex-label-ml-comparison",
          "latex-ml-comparison-label-1",
          "25"
        );
      },
      remove: () => {
        d3.select("#latex-ml-comparison-label-1").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updateFunction(
          (x) => univariateGaussian(x, 8, 1),
          "media-1-estimation-first",
          xScaleAxis,
          yScaleAxis,
          axisRef.current,
          "red"
        );

        latexOntoSvg(
          svg.current,
          "\\theta = (\\mu, \\sigma) = (8, 1)",
          500,
          100,
          "latex-label-ml-comparison",
          "latex-ml-comparison-label-2",
          "25"
        );
      },
      remove: () => {
        d3.select("#latex-ml-comparison-label-2").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        updateFunction(
          (x) => univariateGaussian(x, 5, 3),
          "media-1-estimation-first",
          xScaleAxis,
          yScaleAxis,
          axisRef.current,
          "green"
        );

        latexOntoSvg(
          svg.current,
          "\\theta = (\\mu, \\sigma) = (5, 3)",
          500,
          100,
          "latex-label-ml-comparison",
          "latex-ml-comparison-label-3",
          "25"
        );
      },
      remove: () => {
        d3.select("#latex-ml-comparison-label-3").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 6,
      action: () => {
        drawCoordSystemLikelihood(svgRef, xScaleCoordinateSystem, yScaleCoordinateSystem, 950, 50, coordinateSystemRef);
      },

      remove: () => {
        coordinateSystemRef.current.selectAll("*").remove();
        d3.selectAll(".latex-label-ml-x1").remove();
        d3.selectAll(".latex-label-ml-x2").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        plotLikelihood(coordinateSystemRef.current);
      },

      remove: () => {
        d3.selectAll(".media-1-rect").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        plotMaximumLikelihoodEstimate(coordinateSystemRef.current, "limegreen");
      },
      remove: () => {
        d3.selectAll(".media-1-ml-rect").remove();
      },
      called: false,
    },

    {
      start: 6,
      end: 6,
      action: () => {
        plotNegativeLogLikelihood(coordinateSystemRef.current);
      },
      remove: () => {
        d3.selectAll(".media-1-log-likelihood-rect").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 8,
      action: () => {
        drawCoordSystemMaximumLikelihood(svgRef, xScaleAxisNew, yScaleAxisNew, 600, 50, newAxisRef);
        plotPoints(newAxisRef.current, "media-1-data-points-new");
      },
      remove: () => {
        newAxisRef.current.selectAll("*").remove();
        d3.selectAll(".media-1-data-points-new").remove();

        d3.selectAll(".latex-label-ml-new").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        const meanEstimate = dataPoints.reduce((acc, curr) => acc + curr, 0) / dataPoints.length;
        const varianceEstimate =
          dataPoints.reduce((acc, curr) => acc + Math.pow(curr - meanEstimate, 2), 0) / dataPoints.length;
        updateFunction(
          (x) => univariateGaussian(x, meanEstimate, varianceEstimate ** 0.5),
          "media-1-estimation-new",
          xScaleAxisNew,
          yScaleAxisNew,
          newAxisRef.current,
          "red"
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        const meanEstimate = dataPoints.reduce((acc, curr) => acc + curr, 0) / dataPoints.length;
        const correctedVarianceEstimate =
          dataPoints.reduce((acc, curr) => acc + Math.pow(curr - meanEstimate, 2), 0) / (dataPoints.length - 1);
        updateFunction(
          (x) => univariateGaussian(x, meanEstimate, correctedVarianceEstimate ** 0.5),
          "media-1-estimation-new",
          xScaleAxisNew,
          yScaleAxisNew,
          newAxisRef.current,
          "green"
        );
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  function drawCoordSystemComparison(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
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
      .attr("stroke-width", 5)
      .attr("opacity", 0.3);

    latexOntoSvg(svg, "x", 500, 620, "latex-label-ml-comparison", "", "25");
  }

  function drawCoordSystemLikelihood(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
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
      .attr("stroke-width", 5)
      .attr("opacity", 0.3);

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(() => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.3);

    latexOntoSvg(svg, "\\mu", 500, 975, "latex-label-ml-x1", "", "25");
    latexOntoSvg(svg, "\\sigma", 25, 500, "latex-label-ml-x2", "", "25");
  }

  function updateFunction(funToPlot, className, xScale, yScale, coordSystem, color) {
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    const xValues = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const data = xValues.map((x) => ({ x: x, y: funToPlot(x) }));

    coordSystem
      .selectAll(`.${className}`)
      .data([data])
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", className)
            .attr("d", line)
            .attr("stroke", color)
            .attr("fill", "none")
            .attr("stroke-width", 6),
        (update) =>
          update.transition().ease(d3.easeBackOut.overshoot(0.2)).duration(500).attr("d", line).attr("stroke", color),
        (exit) => exit.remove()
      );
  }

  function drawCoordSystemMaximumLikelihood(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef) {
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
      .attr("stroke-width", 5)
      .attr("opacity", 0.3);

    latexOntoSvg(svg, "x", 500, 620, "latex-label-ml-new", "", "25");
  }

  function plotMaximumLikelihoodEstimate(g, color) {
    const rect = g
      .append("rect")
      .attr("class", "media-1-ml-rect")
      .attr("x", xScaleCoordinateSystem(5))
      .attr("y", yScaleCoordinateSystem(3.5))
      .attr("width", 28)
      .attr("height", 28)
      .attr("fill", color);

    pulse(rect);
  }

  function pulse(selection) {
    selection
      .transition()
      .duration(500)
      .attr("opacity", 0.1)
      .transition()
      .duration(500)
      .attr("opacity", 1)
      .on("end", () => pulse(selection));
  }

  function plotPoints(g, className) {
    g.selectAll(".point")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", className)
      .attr("cx", (d) => xScaleAxis(d))
      .attr("cy", yScaleAxis(0))
      .attr("r", 16);
  }

  function plotNormalDistribution(g, mean, variance, className, xScale, yScale) {
    const x = d3.range(0, 9.9, 0.001);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale((1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(d - mean, 2) / (2 * variance))));

    const path = g.append("path").datum(x).attr("class", className).attr("d", line);
    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  function univariateGaussian(x, mean, sigma) {
    const a = 1 / (sigma * Math.sqrt(2 * Math.PI));
    const b = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2)));
    return a * b;
  }

  function calculateLikelihood(mean, sigma) {
    let likelihood = 1;
    dataPoints.forEach((point) => {
      likelihood *= univariateGaussian(point, mean, sigma);
    });
    return likelihood;
  }

  function calculateNegativeLogLikelihood(mean, sigma) {
    let likelihood = 1;
    dataPoints.forEach((point) => {
      likelihood *= univariateGaussian(point, mean, sigma);
    });
    return -Math.log(likelihood);
  }
  function plotNegativeLogLikelihood(g) {
    const meanValues = d3.range(xScaleCoordinateSystem.domain()[0], xScaleCoordinateSystem.domain()[1], 0.25);
    const sigmaValues = d3.range(xScaleCoordinateSystem.domain()[0], xScaleCoordinateSystem.domain()[1], 0.25);
    const negativeLogLikelihoods = [];

    for (let i = 0; i < meanValues.length; i++) {
      for (let j = 0; j < sigmaValues.length; j++) {
        negativeLogLikelihoods.push({
          mean: meanValues[i],
          sigma: sigmaValues[j],
          negativeLogLikelihood: calculateNegativeLogLikelihood(meanValues[i], sigmaValues[j]),
        });
      }
    }

    const minNegativeLogLikelihood = d3.min(negativeLogLikelihoods, (d) =>
      isFinite(d.negativeLogLikelihood) ? d.negativeLogLikelihood : Infinity
    );
    const maxNegativeLogLikelihood = d3.max(negativeLogLikelihoods, (d) =>
      isFinite(d.negativeLogLikelihood) ? d.negativeLogLikelihood : -Infinity
    );

    const transformedNegativeLogLikelihoods = negativeLogLikelihoods.map((d) => ({
      ...d,
      negativeLogLikelihood: isFinite(d.negativeLogLikelihood)
        ? Math.log(d.negativeLogLikelihood - minNegativeLogLikelihood + 1)
        : Infinity,
    }));

    const transformedMaxNegativeLogLikelihood = Math.log(maxNegativeLogLikelihood - minNegativeLogLikelihood + 1);
    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, transformedMaxNegativeLogLikelihood]);

    const rectWidth = 950 / meanValues.length;
    const rectHeight = 950 / sigmaValues.length;

    g.selectAll(".media-1-log-likelihood-rect")
      .data(transformedNegativeLogLikelihoods)
      .enter()
      .append("rect")
      .attr("class", "media-1-log-likelihood-rect")
      .attr("x", (d) => xScaleCoordinateSystem(d.mean))
      .attr("y", (d) => yScaleCoordinateSystem(d.sigma) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("fill-opacity", "0")
      .transition()
      .duration((d) => 200 * d.negativeLogLikelihood)
      .attr("fill-opacity", "1")
      .attr("fill", (d) => (isFinite(d.negativeLogLikelihood) ? colorScale(d.negativeLogLikelihood) : "none"));

    plotMaximumLikelihoodEstimate(g, "crimson");
  }
  function plotLikelihood(g) {
    const meanValues = d3.range(xScaleCoordinateSystem.domain()[0], xScaleCoordinateSystem.domain()[1], 0.25);
    const sigmaValues = d3.range(xScaleCoordinateSystem.domain()[0], xScaleCoordinateSystem.domain()[1], 0.25);
    const likelihoods = [];

    for (let i = 0; i < meanValues.length; i++) {
      for (let j = 0; j < sigmaValues.length; j++) {
        likelihoods.push({
          mean: meanValues[i],
          sigma: sigmaValues[j],
          likelihood: calculateLikelihood(meanValues[i], sigmaValues[j]),
        });
      }
    }

    const maxLikelihood = d3.max(likelihoods, (d) => d.likelihood);
    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, maxLikelihood]);
    const rectWidth = 950 / meanValues.length;
    const rectHeight = 950 / sigmaValues.length;

    g.selectAll(".media-1-heatmap")
      .data(likelihoods)
      .enter()
      .append("rect")
      .attr("x", (d) => xScaleCoordinateSystem(d.mean))
      .attr("y", (d) => yScaleCoordinateSystem(d.sigma) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("class", "media-1-rect")
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("fill", "black")
      .transition()
      .duration(400)
      .attr("fill", (d) => colorScale(d.likelihood));
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
