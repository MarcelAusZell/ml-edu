import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./visual.scss";
import latexOntoSVG from "../../../../../utils/latex-onto-svg-viewbox";

const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
const yScale = d3.scaleLinear().domain([0, 0.75]).range([750, 50]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const coordinateSystem = useRef();
  const pathA = useRef([]);
  const pathB = useRef([]);

  const actions = useRef([
    {
      start: 1,
      end: 6,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 750, 50, coordinateSystem);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 3,
      action: () => {
        plotUnivariateGaussian(coordinateSystem.current, 4, 2, "media-4-path-a");
        plotUnivariateGaussian(coordinateSystem.current, 7, 1, "media-4-path-b");
        plotPathA(coordinateSystem.current);
        plotPathB(coordinateSystem.current);
      },
      remove: () => {
        d3.selectAll(".media-4-likelihood-label").remove();
        d3.selectAll(".media-4-likelihood-a-label").remove();
        d3.selectAll(".media-4-likelihood-b-label").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 3,
      action: () => {
        latexOntoSVG(svg.current, "\\text{Likelihood}", 500, 250, "media-4-likelihood-label", "", "35");
        latexOntoSVG(svg.current, "p(x \\mid a)", 75, 250, "media-4-likelihood-a-label", "", "30");
        latexOntoSVG(svg.current, "p(x \\mid b)", 75, 300, "media-4-likelihood-b-label", "", "30");
      },
      remove: () => {
        d3.selectAll(".media-4-likelihood-label").remove();
        d3.selectAll(".media-4-likelihood-a-label").remove();
        d3.selectAll(".media-4-likelihood-b-label").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        latexOntoSVG(
          svg.current,
          "\\pmb{\\uparrow}",
          xScale(4),
          yScale(-0.04),
          "media-4-first-class-question",
          "",
          "20"
        );
        latexOntoSVG(svg.current, "x = 10", xScale(3.95), yScale(-0.065), "media-4-first-class-question", "", "20");
      },
      remove: () => {
        d3.selectAll(".media-4-first-class-question").remove();
      },
      called: false,
    },

    {
      start: 2,
      end: 2,
      action: () => {
        latexOntoSVG(
          svg.current,
          "\\pmb{\\uparrow}",
          xScale(7),
          yScale(-0.04),
          "media-4-second-class-question",
          "",
          "20"
        );
        latexOntoSVG(svg.current, "x = 30", xScale(6.95), yScale(-0.065), "media-4-second-class-question", "", "20");
      },
      remove: () => {
        d3.selectAll(".media-4-second-class-question").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        latexOntoSVG(
          svg.current,
          "\\pmb{\\uparrow}",
          xScale(5.5),
          yScale(-0.04),
          "media-4-third-class-question",
          "",
          "20"
        );
        latexOntoSVG(svg.current, "x = 20", xScale(5.45), yScale(-0.065), "media-4-third-class-question", "", "20");
      },
      remove: () => {
        d3.selectAll(".media-4-third-class-question").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        plotLikelihoodXPrior(coordinateSystem.current, 4, 2, 0.75, "media-4-path-a");
        plotLikelihoodXPrior(coordinateSystem.current, 7, 1, 0.25, "media-4-path-b");
        plotPathA(coordinateSystem.current);
        plotPathB(coordinateSystem.current);
        latexOntoSVG(
          svg.current,
          "\\text{Likelihood} \\cdot \\text{Prior}",
          500,
          250,
          "media-4-likelihood-prior-label",
          "",
          "35"
        );
        latexOntoSVG(svg.current, "p(x \\mid a) \\; p(a)", 111, 250, "media-4-likelihood-prior-a-label", "", "30");
        latexOntoSVG(svg.current, "p(x \\mid b) \\; p(b)", 109, 300, "media-4-likelihood-prior-b-label", "", "30");
      },
      remove: () => {
        d3.selectAll(".media-4-likelihood-prior-label").remove();
        d3.selectAll(".media-4-likelihood-prior-a-label").remove();
        d3.selectAll(".media-4-likelihood-prior-b-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        plotPosteriors(coordinateSystem.current, 4, 2, 0.75, "media-4-path-a");
        plotPosteriors(coordinateSystem.current, 7, 1, 0.25, "media-4-path-b");
        plotPathA(coordinateSystem.current);
        plotPathB(coordinateSystem.current);
        latexOntoSVG(
          svg.current,
          "\\text{Posterior} = \\frac{\\text{Likelihood} \\cdot \\text{Prior}}{\\text{Normalization-Factor}}",
          500,
          250,
          "media-4-posterior-label",
          "",
          "35"
        );
        latexOntoSVG(svg.current, "p(a \\mid x)", 75, 250, "media-4-posterior-a-label", "", "30");
        latexOntoSVG(svg.current, "p(b \\mid x)", 75, 300, "media-4-posterior-b-label", "", "30");
      },
      remove: () => {
        d3.selectAll(".media-4-posterior-a-label").remove();
        d3.selectAll(".media-4-posterior-b-label").remove();
        d3.selectAll(".media-4-posterior-label").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        plotThreshold(coordinateSystem.current, 6.1);
        latexOntoSVG(svg.current, "\\theta", xScale(6.1), yScale(-0.045), "media-4-threshold-label", "", "25");
        plotDecisionArrows(coordinateSystem.current, 6.1);
        latexOntoSVG(
          svg.current,
          "\\text{Decide for } \\mathcal{C}_1 = a",
          xScale(3),
          yScale(-0.075),
          "media-4-decide-for-a-label",
          "",
          "20"
        );
        latexOntoSVG(
          svg.current,
          "\\text{Decide for } \\mathcal{C}_2 = b",
          xScale(8.2),
          yScale(-0.075),
          "media-4-decide-for-b-label",
          "",
          "20"
        );
      },
      remove: () => {
        d3.selectAll(".media-4-threshold").remove();
        d3.selectAll(".media-4-threshold-label").remove();
        d3.selectAll(".media-4-arrow-left").remove();
        d3.selectAll(".media-4-arrow-right").remove();
        d3.select("#media-4-arrow-left").remove();
        d3.select("#media-4-arrow-right").remove();
        d3.selectAll(".media-4-decide-for-a-label").remove();
        d3.selectAll(".media-4-decide-for-b-label").remove();
      },
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
      .attr("opacity", 0.5)
      .style("font-size", "20px");

    latexOntoSVG(svg, "x", 975, 750, "latex-label", "", "25");
  }

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }

  function plotUnivariateGaussian(g, mean, variance, className) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1] - 0.2, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale(univariateGaussian(d, mean, variance)));

    const pathData = line(x);
    className === "media-4-path-a"
      ? pathA.current.push({ data: pathData, className })
      : pathB.current.push({ data: pathData, className });
  }

  function plotLikelihoodXPrior(g, mean, variance, scaleFactor, className) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1] - 0.2, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale(scaleFactor * univariateGaussian(d, mean, variance)));

    const pathData = line(x);
    className === "media-4-path-a"
      ? pathA.current.push({ data: pathData, className })
      : pathB.current.push({ data: pathData, className });
  }

  function plotPosteriors(g, mean, variance, prior, className) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1] - 0.2, 0.1);
    const priorA = 0.75;
    const priorB = 0.25;
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) =>
        yScale(
          0.2 *
            ((univariateGaussian(d, mean, variance) * prior) /
              (univariateGaussian(d, 4, 2) * priorA + univariateGaussian(d, 7, 1) * priorB))
        )
      );

    const pathData = line(x);
    className === "media-4-path-a"
      ? pathA.current.push({ data: pathData, className })
      : pathB.current.push({ data: pathData, className });
  }

  function plotPathA(g) {
    if (pathA.current.length > 0) {
      const lastPath = pathA.current[pathA.current.length - 1];
      g.selectAll(".media-4-path-a")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => d.className),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function plotPathB(g) {
    if (pathB.current.length > 0) {
      const lastPath = pathB.current[pathB.current.length - 1];
      g.selectAll(".media-4-path-b")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => d.className),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function plotThreshold(g, threshold) {
    const y = d3.range(0, 0.35, 0.1);
    const line = d3
      .line()
      .x((d) => xScale(threshold))
      .y((d) => yScale(d));

    const path = g.append("path").datum(y).attr("d", line).attr("class", "media-4-threshold");
    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(400)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", function () {
        d3.select(this).attr("stroke-dasharray", "9");
      });
  }

  function plotDecisionArrows(g, threshold) {
    const arrowData = [
      {
        x1: xScale(threshold - 0.25),
        y1: yScale(-0.05),
        x2: xScale(0),
        y2: yScale(-0.05),
        className: "media-4-arrow-left",
      },
      {
        x1: xScale(threshold + 0.25),
        y1: yScale(-0.05),
        x2: xScale(10),
        y2: yScale(-0.05),
        className: "media-4-arrow-right",
      },
    ];

    arrowData.forEach((arrow) => {
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
    });

    g.selectAll(".media-4-arrow")
      .data(arrowData)
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
