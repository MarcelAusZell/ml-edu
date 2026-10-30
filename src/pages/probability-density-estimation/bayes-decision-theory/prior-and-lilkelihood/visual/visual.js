import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  handwrittenA,
  handwrittenB,
  handwrittenA_Feature1,
  handwrittenA_Feature2,
  handwrittenA_Feature3,
  handwrittenA_Feature4,
  handwrittenB_Feature1,
  handwrittenB_Feature2,
  handwrittenB_Feature3,
  handwrittenB_Feature4,
} from "../../../../../assets/handwritten-letters";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

const letterFrequency = [
  { letter: "a", frequency: 0.08167 },
  { letter: "b", frequency: 0.01492 },
  { letter: "c", frequency: 0.02782 },
  { letter: "d", frequency: 0.04253 },
  { letter: "e", frequency: 0.12702 },
  { letter: "f", frequency: 0.02228 },
  { letter: "g", frequency: 0.02015 },
  { letter: "h", frequency: 0.06094 },
  { letter: "i", frequency: 0.06966 },
  { letter: "j", frequency: 0.00153 },
  { letter: "k", frequency: 0.00772 },
  { letter: "l", frequency: 0.04025 },
  { letter: "m", frequency: 0.02406 },
  { letter: "n", frequency: 0.06749 },
  { letter: "o", frequency: 0.07507 },
  { letter: "p", frequency: 0.01929 },
  { letter: "q", frequency: 0.00095 },
  { letter: "r", frequency: 0.05987 },
  { letter: "s", frequency: 0.06327 },
  { letter: "t", frequency: 0.09056 },
  { letter: "u", frequency: 0.02758 },
  { letter: "v", frequency: 0.00978 },
  { letter: "w", frequency: 0.0236 },
  { letter: "x", frequency: 0.0015 },
  { letter: "y", frequency: 0.01974 },
  { letter: "z", frequency: 0.00074 },
];

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        drawLetters(svg.current);
      },
      remove: () => {
        d3.selectAll(".letter-container").selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        drawPosterior(svg.current);
      },
      remove: () => {
        d3.selectAll(".letter-histogram").selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        const rectSize = 10;
        const gapSize = 2;
        const gridSize = 28;
        const xOffset = 50;
        const gridData = Array(gridSize * gridSize)
          .fill()
          .map((_, i) => ({ x: i % gridSize, y: Math.floor(i / gridSize) }));

        const likelihoodLetterContainer = svg.current.append("g").attr("class", "likelihood-letter-container");
        drawGrid(likelihoodLetterContainer, "bayes-decision-theory-letter-background", gridData, xOffset, 100, rectSize, gapSize);
        drawGrid(likelihoodLetterContainer, "bayes-decision-theory-letter-background", gridData, xOffset, 550, rectSize, gapSize);
        drawLetter(likelihoodLetterContainer, "bayes-decision-theory-letter", handwrittenA, xOffset, 100, rectSize, gapSize);
        drawLetter(likelihoodLetterContainer, "bayes-decision-theory-letter", handwrittenB, xOffset, 550, rectSize, gapSize);
      },
      remove: () => {
        d3.selectAll(".likelihood-letter-container").selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        const gridSize = 28;
        const rectSize = 1.2;
        const gridData = Array(gridSize * gridSize)
          .fill()
          .map((_, i) => ({ x: i % gridSize, y: Math.floor(i / gridSize) }));
        const likelihoodLetterFeatureContainer = svg.current.append("g").attr("class", "likelihood-letter-feature-container");

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 100, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenA_Feature1, 425, 100, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 190, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenA_Feature2, 425, 190, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 280, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenA_Feature3, 425, 280, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 370, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenA_Feature4, 425, 370, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 550, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenB_Feature1, 425, 550, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 640, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenB_Feature2, 425, 640, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 730, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenB_Feature3, 425, 730, rectSize, rectSize);

        drawGrid(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter-background", gridData, 425, 820, rectSize, rectSize);
        drawLetter(likelihoodLetterFeatureContainer, "bayes-decision-theory-letter", handwrittenB_Feature4, 425, 820, rectSize, rectSize);
      },
      remove: () => {
        d3.selectAll(".likelihood-letter-feature-container").selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        const likelihoodCoordSystem = svg.current.append("g").attr("class", "bayes-decision-theory-likelihood-coord-systems");
        const xScaleA = d3.scaleLinear().domain([0, 10]).range([550, 950]);
        const yScaleA = d3.scaleLinear().domain([0, 1]).range([425, 100]);
        const xScaleB = d3.scaleLinear().domain([0, 10]).range([550, 950]);
        const yScaleB = d3.scaleLinear().domain([0, 1]).range([880, 550]);
        drawCoordSystem(xScaleA, yScaleA, 425, 550, likelihoodCoordSystem);
        drawCoordSystem(xScaleB, yScaleB, 880, 550, likelihoodCoordSystem);
        plotUnivariateGaussian(likelihoodCoordSystem, xScaleA, yScaleA, 4, 3, "bayes-decision-theory-likelihood-A-gaussian");
        plotUnivariateGaussian(likelihoodCoordSystem, xScaleB, yScaleB, 7, 0.5, "bayes-decision-theory-likelihood-B-gaussian");
        latexOntoSvg(svg.current, "p(x \\mid a)", 600, 200, "bayes-decision-theory-likelihood-A-label", "", 25);
        latexOntoSvg(svg.current, "p(x \\mid b)", 600, 650, "bayes-decision-theory-likelihood-B-label", "", 25);
      },
      remove: () => {
        d3.selectAll(".bayes-decision-theory-likelihood-coord-systems").selectAll("*").remove();
        d3.selectAll(".bayes-decision-theory-likelihood-A-label").remove();
        d3.selectAll(".bayes-decision-theory-likelihood-B-label").remove();
      },
      called: false,
    },
  ]).current;

  const drawGrid = (svg, className, data, xOffset, yOffset, rectSize, gapSize) => {
    svg
      .selectAll(className)
      .data(data)
      .enter()
      .append("rect")
      .attr("class", className)
      .attr("x", (d) => d.x * (rectSize + gapSize) + xOffset)
      .attr("y", (d) => d.y * (rectSize + gapSize) + yOffset)
      .attr("width", rectSize)
      .attr("height", rectSize);
  };

  const drawLetter = (svg, className, data, xOffset, yOffset, rectSize, gapSize) => {
    svg
      .selectAll(className)
      .data(data)
      .enter()
      .append("rect")
      .attr("class", className)
      .attr("x", (d) => d[0] * (rectSize + gapSize) + xOffset)
      .attr("y", (d) => d[1] * (rectSize + gapSize) + yOffset)
      .attr("width", rectSize)
      .attr("height", rectSize)
      .attr("fill-opacity", (d) => d[2] / 255);
  };

  function drawDebugGrid() {
    const g = svg.current.append("g");
    g.attr("class", "debug-grid");

    g.append("circle").attr("cx", 500).attr("cy", 500).attr("r", 5).attr("fill", "orange").attr("fill-opacity", 0.5);

    for (let i = 0; i <= 1000; i += 10) {
      g.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", 1000).attr("stroke", "gray").attr("stroke-width", 2);
    }

    for (let i = 0; i <= 1000; i += 10) {
      g.append("line").attr("x1", 0).attr("y1", i).attr("x2", 1000).attr("y2", i).attr("stroke", "gray").attr("stroke-width", 2);
    }
  }

  // -------------------------- (1) --------------------------
  function drawLetters(svg) {
    const rectSize = 15;
    const gapSize = 2;
    const gridSize = 28;
    const svgWidth = 1000;
    const svgHeight = 1000;
    const gridWidth = gridSize * (rectSize + gapSize);
    const gridHeight = gridSize * (rectSize + gapSize);
    const xOffset = (svgWidth - 2 * gridWidth) / 3;
    const yOffset = (svgHeight - gridHeight) / 2;

    const letterContainer = svg.append("g").attr("class", "letter-container");
    const gridData = Array(gridSize * gridSize)
      .fill()
      .map((_, i) => ({ x: i % gridSize, y: Math.floor(i / gridSize) }));

    drawGrid(letterContainer, "bayes-decision-theory-letter-background", gridData, xOffset, yOffset, rectSize, gapSize);
    drawLetter(letterContainer, "bayes-decision-theory-letter", handwrittenA, xOffset, yOffset, rectSize, gapSize);

    drawGrid(letterContainer, "bayes-decision-theory-letter-background", gridData, 2 * xOffset + gridWidth, yOffset, rectSize, gapSize);
    drawLetter(letterContainer, "bayes-decision-theory-letter", handwrittenB, 2 * xOffset + gridWidth, yOffset, rectSize, gapSize);
  }

  // -------------------------- (2) --------------------------

  function drawPosterior(svg) {
    const width = 950;
    const height = 950;

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(letterFrequency.map((d) => d.letter))
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(letterFrequency, (d) => d.frequency)])
      .range([height, 0]);

    const histogram = svg.append("g").attr("class", "letter-histogram");

    const maxFrequency = d3.max(letterFrequency, (d) => d.frequency);

    histogram
      .selectAll("rect")
      .data(letterFrequency)
      .join("rect")
      .attr("class", "bayes-decision-theory-letter-histogram-bar")
      .attr("x", (d) => xScale(d.letter))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("fill-opacity", (d) => d.frequency / maxFrequency + 0.2)
      .transition()
      .duration(300)
      .attr("y", (d) => yScale(d.frequency))
      .attr("height", (d) => height - yScale(d.frequency));

    // x-axis with letters
    histogram
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).tickSize(0))
      .style("font-size", "25px")
      .style("font-weight", "bold");
  }

  // -------------------------- (3) - (5) --------------------------

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  }

  function plotUnivariateGaussian(g, xScale, yScale, mean, variance, className) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d) => yScale(univariateGaussian(d, mean, variance)));

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

  function drawCoordSystem(xScale, yScale, xTransform, yTransform, coordSystemRef) {
    coordSystemRef
      .append("g")
      .attr("transform", `translate(0,${xTransform})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(0)
          .tickFormat(() => "")
      )
      .attr("stroke-width", 5)
      .attr("stroke-opacity", 0.5);

    coordSystemRef
      .append("text")
      .attr("class", "coord-system-label")
      .attr("x", xScale(xScale.domain()[1] / 2))
      .attr("y", yScale(-0.1))
      .text("x")
      .attr("font-size", 20);
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
