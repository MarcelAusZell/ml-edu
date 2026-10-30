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
  const meanLineRef = useRef([]);
  const stddevLinesRef = useRef([]);

  const actions = useRef([
    {
      start: 1,
      end: 5,
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
        calculateNormalDistributionPath(4, 2);

        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        calculateNormalDistributionPath(3, 2);
        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        calculateNormalDistributionPath(5, 2);
        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        calculateNormalDistributionPath(5, 0.75);
        plotPath(coordinateSystemRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        calculateNormalDistributionPath(5, 3);
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
      .attr("stroke-opacity", 0.3)

      latexOntoSvg(svg, "x", 500, 620, "latex-label-univariate-gaussian", "", "25");
  }

  function calculateNormalDistributionPath(mean, variance) {
    const stddev = Math.sqrt(variance);
    const x = d3.range(0, 9.9, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale((1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(d - mean, 2) / (2 * variance))));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
    meanLineRef.current.push({ mean, stddev });
    stddevLinesRef.current.push({ mean, stddev });
  }

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }

  function plotPath(g) {
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      const lastMean = meanLineRef.current[meanLineRef.current.length - 1];
      const lastStddev = stddevLinesRef.current[stddevLinesRef.current.length - 1];

      // Distribution path
      g.selectAll(".media-3-distribution-path")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "media-3-distribution-path"),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );

      // Vertical line for mean
      g.selectAll(".media-3-mean-line")
        .data([lastMean])
        .join(
          (enter) =>
            enter
              .append("line")
              .attr("class", "media-3-mean-line")
              .attr("x1", (d) => xScale(d.mean))
              .attr("y1", yScale(0))
              .attr("x2", (d) => xScale(d.mean))
              .attr("y2", (d) => yScale(1 / (Math.sqrt(2 * Math.PI) * d.stddev))),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("x1", (d) => xScale(d.mean))
                .attr("x2", (d) => xScale(d.mean))
                .attr("y2", (d) => yScale(1 / (Math.sqrt(2 * Math.PI) * d.stddev)))
            )
        );

      // Horizontal line for standard deviations
      g.selectAll(".media-3-stddev-line")
        .data([lastStddev])
        .join(
          (enter) => {
            const gEnter = enter.append("g");
            gEnter
              .append("line")
              .attr("class", "media-3-stddev-line")
              .attr("x1", (d) => xScale(d.mean - d.stddev))
              .attr("y1", (d) => yScale(univariateGaussian(d.mean - d.stddev, d.mean, d.stddev)))
              .attr("x2", (d) => xScale(d.mean + d.stddev))
              .attr("y2", (d) => yScale(univariateGaussian(d.mean + d.stddev, d.mean, d.stddev)));
          },
          (update) =>
            update.call((update) => {
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("x1", (d) => xScale(d.mean - d.stddev))
                .attr("y1", (d) => yScale(univariateGaussian(d.mean - d.stddev, d.mean, d.stddev)))
                .attr("x2", (d) => xScale(d.mean + d.stddev))
                .attr("y2", (d) => yScale(univariateGaussian(d.mean + d.stddev, d.mean, d.stddev)));
            })
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
