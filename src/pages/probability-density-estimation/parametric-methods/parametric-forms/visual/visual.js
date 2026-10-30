import { useEffect, useRef } from "react";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 0.5]).range([600, 50]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const coordinateSystemRef = useRef();
  const pathRef = useRef([]);

  const actions = useRef([
    {
      start: 1,
      end: 3,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 600, 50, coordinateSystemRef);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        calculateNormalDistributionPath(5, 2);
        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        calculateExponentialDistributionPath(0.5);

        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        calculateGammaDistributionPath(2, 1);
        plotPath(coordinateSystemRef.current);
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
      .attr("stroke-opacity", 0.3);

    latexOntoSvg(svg, "x", 500, 620, "latex-label-univariate-gaussian", "", "25");
  }

  function calculateNormalDistributionPath(mean, variance) {
    const x = d3.range(0, 9.9, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale((1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(d - mean, 2) / (2 * variance))));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
  }

  function calculateExponentialDistributionPath(lambda) {
    const x = d3.range(0, 9.9, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale(lambda * Math.exp(-lambda * d)));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
  }

  function calculateGammaDistributionPath(alpha, beta) {
    const gamma = (n) => {
      if (n === 0) {
        return 1;
      } else {
        return n * gamma(n - 1);
      }
    };

    const x = d3.range(0, 9.9, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale((Math.pow(beta, alpha) / gamma(alpha)) * Math.pow(d, alpha - 1) * Math.exp(-beta * d)));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
  }

  function plotPath(g) {
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      g.selectAll(".media-2-distribution-path")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "media-2-distribution-path"),
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
