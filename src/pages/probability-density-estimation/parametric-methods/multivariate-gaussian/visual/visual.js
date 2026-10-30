import { useEffect, useRef } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

export default function Media1({ currentStep, currentInnerStep }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const coordinateSystemRef = useRef();
  const prevParamsRef = useRef({
    mean: [5, 5],
    covariance: [
      [1, 0],
      [0, 1],
    ],
  });

  const actions = useRef([
    {
      start: 1,
      end: 5,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 950, 50, coordinateSystemRef);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        smoothTransitionToNewGaussian(
          [5, 5],
          [
            [1, 0],
            [0, 1],
          ]
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        smoothTransitionToNewGaussian(
          [2.5, 7.5],
          [
            [1, 0],
            [0, 1],
          ]
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        smoothTransitionToNewGaussian(
          [5, 5],
          [
            [1, 0],
            [0, 1],
          ]
        );
      },
      remove: () => {},
      called: false,
    },

    {
      start: 4,
      end: 4,
      action: () => {
        smoothTransitionToNewGaussian(
          [5, 5],
          [
            [1, 0],
            [0, 0.25],
          ]
        );
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        smoothTransitionToNewGaussian(
          [5, 5],
          [
            [1, 0.5],
            [0.5, 1],
          ]
        );
      },
      remove: () => {},
      called: false,
    },
  ]).current;

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

      latexOntoSvg(svg, "x_1", 500, 975, "latex-label-multivariate-gaussian", "", "25");
      latexOntoSvg(svg, "x_2", 25, 500, "latex-label-multivariate-gaussian", "", "25");


  }

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

  function drawIsocontour(g, points, covariance, threshold, className, transition) {
    const cx = d3.mean(points, (d) => d.x);
    const cy = d3.mean(points, (d) => d.y);

    const eigen = numeric.eig(covariance);
    const angle = Math.atan2(eigen.E.x[0][1], eigen.E.x[0][0]) * (180 / Math.PI);
    const scalingFactor = Math.sqrt(-2 * Math.log(threshold));
    const rx = scalingFactor * Math.sqrt(eigen.lambda.x[0]);
    const ry = scalingFactor * Math.sqrt(eigen.lambda.x[1]);

    g.append("ellipse")
      .attr("class", "ellipse")
      .attr("cx", xScale(cx))
      .attr("cy", yScale(cy))
      .attr("rx", Math.abs(xScale(rx) - xScale(0)))
      .attr("ry", Math.abs(yScale(ry) - yScale(0)))
      .attr("transform", `rotate(${angle}, ${xScale(cx)}, ${yScale(cy)})`)
      .style("fill-opacity", threshold ** 4 + 0.1);
  }

  function smoothTransitionToNewGaussian(mean, covariance) {
    const prevParams = prevParamsRef.current;
    const transition = d3.transition().duration(400).ease(d3.easeBackOut);

    const interpMean = d3.interpolate(prevParams.mean, mean);
    const interpCovariance = d3.interpolate(prevParams.covariance, covariance);

    transition.tween("params", () => (t) => {
      const currentMean = interpMean(t);
      const currentCovariance = interpCovariance(t);

      coordinateSystemRef.current.selectAll(".ellipse").remove();

      plotMultivariateGaussian(
        coordinateSystemRef.current,
        currentMean,
        currentCovariance,
        "media-1-distribution-path"
      );
    });

    prevParamsRef.current = { mean, covariance };
  }

  function plotMultivariateGaussian(g, mean, covariance, className) {
    const pdf = multivariateGaussian(mean, covariance);
    const thresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

    thresholds.forEach((threshold) => {
      const points = samplePointsForThreshold(pdf, threshold, mean);
      if (points) {
        drawIsocontour(g, points, covariance, threshold, className);
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
