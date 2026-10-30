import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import numeric from "numeric";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const coordSystemRef = useRef();
  const pathRef = useRef();
  const xScale = d3.scaleLinear().domain([0, 1]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([500, 100]);

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const network = [
    {
      input: [
        { x: 400, y: 100 },
        { x: 400, y: 300 },
        { x: 400, y: 500 },
        { x: 400, y: 900 },
      ],
      output: [{ x: 900, y: 500 }],
    },
    {
      input: [
        { x: 400, y: 100, bias: true },
        { x: 400, y: 300 },
        { x: 400, y: 500 },
        { x: 400, y: 900 },
      ],
      output: [{ x: 900, y: 500 }],
    },
    {
      input: [
        { x: 400, y: 100, bias: true },
        { x: 400, y: 300 },
        { x: 400, y: 500 },
        { x: 400, y: 900 },
      ],
      output: [
        { x: 900, y: 200 },
        { x: 900, y: 400 },
        { x: 900, y: 800 },
      ],
    },
  ];

  const dataPointsLinearlySeperable = [
    { x: 0.25, y: 0, t: -1 },
    { x: 0.5, y: 0, t: 1 },
    { x: 0.75, y: 0, t: 1 },
  ];

  const dataPointsNotLinearlySeperable = [
    { x: 0.25, y: 0, t: -1 },
    { x: 0.5, y: 0, t: 1 },
    { x: 0.75, y: 0, t: -1 },
  ];

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        updateNetwork(network[0]);
        displayGeneralPerceptronLabels();
      },
      remove: () => {
        d3.selectAll(".perceptron-general-labels").remove();
      },
      called: false,
    },

    {
      start: 2,
      end: 2,
      action: () => {
        updateNetwork(network[1]);
        perceptronLabels();
      },
      remove: () => {
        d3.selectAll(".perceptron-label").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 6,
      action: () => {
        updateNetwork(network[2]);
        drawDots(svg.current, 900, 570, "output-dots");
      },
      remove: () => {
        d3.selectAll(".output-dots").remove();
      },
      called: false,
    },

    {
      start: 1,
      end: 6,
      action: () => {
        drawDots(svg.current, 400, 670, "input-dots");
      },
      remove: () => {
        d3.selectAll(".input-dots").remove();
        d3.selectAll(
          ".input-circle, .input-circle-bias, .output-circle, .connection-line"
        ).remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        multiClassLabels();
      },
      remove: () => {
        d3.selectAll(".multi-class-label").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        highlightNeuron({ x: 400, y: 300 });
      },
      remove: () => {
        resetHighlight();
        d3.selectAll(".highlighted-perceptron-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        multiClassLabels();
      },
      remove: () => {
        d3.selectAll(".multi-class-label").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        drawMappingBox();
      },
      remove: () => {
        d3.selectAll(".mapping-box").remove();
        d3.selectAll(".mapping-label").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 8,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 500, 50, coordSystemRef);
      },
      remove: () => {
        coordSystemRef.current.selectAll("*").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        drawPoints(
          dataPointsLinearlySeperable,
          "perceptron-linear-discriminant-points-linearly-seperable"
        );
        calculateDecisionBoundaryWithBasisFunctions(dataPointsLinearlySeperable, 1);
      },
      remove: () => {
        d3.selectAll(".perceptron-linear-discriminant-points-linearly-seperable").remove();
      },
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        drawPoints(
          dataPointsNotLinearlySeperable,
          "perceptron-linear-discriminant-points-not-linearly-seperable"
        );
        calculateDecisionBoundaryWithBasisFunctions(dataPointsNotLinearlySeperable, 2);
      },
      remove: () => {
        d3.selectAll(".perceptron-linear-discriminant-points-not-linearly-seperable").remove();
      },
      called: false,
    },
  ]).current;

  function updateNetwork(newState) {
    const inputCircles = svg.current
      .selectAll(".input-circle, .input-circle-bias")
      .data(newState.input, (d) => `${d.x}-${d.y}`);

    inputCircles.exit().remove();

    const inputCirclesEnter = inputCircles
      .enter()
      .append("circle")
      .attr("class", (d) => (d.bias ? "input-circle-bias" : "input-circle"))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 30)
      .attr("fill", (d) => (d.bias ? "orange" : "blue"));

    inputCircles
      .merge(inputCirclesEnter)
      .attr("class", (d) => (d.bias ? "input-circle-bias" : "input-circle"))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) => (d.bias ? "orange" : "blue"));

    const outputCircles = svg.current
      .selectAll(".output-circle")
      .data(newState.output, (d) => `${d.x}-${d.y}`);

    outputCircles.exit().remove();

    const outputCirclesEnter = outputCircles
      .enter()
      .append("circle")
      .attr("class", "output-circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 30)
      .attr("fill", "red");

    outputCircles
      .merge(outputCirclesEnter)
      .attr("class", "output-circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", "red");

    const connections = newState.input.flatMap((input) =>
      newState.output.map((output) => ({ input, output }))
    );

    const connectionLines = svg.current
      .selectAll(".connection-line")
      .data(connections, (d) => `${d.input.x}-${d.input.y}-${d.output.x}-${d.output.y}`);

    connectionLines.exit().remove();

    const connectionLinesEnter = connectionLines
      .enter()
      .append("line")
      .attr("class", "connection-line")
      .attr("x1", (d) => d.input.x)
      .attr("y1", (d) => d.input.y)
      .attr("x2", (d) => d.output.x)
      .attr("y2", (d) => d.output.y)
      .attr("stroke", "black")
      .attr("stroke-width", 10)
      .lower();

    connectionLines
      .merge(connectionLinesEnter)
      .attr("x1", (d) => d.input.x)
      .attr("y1", (d) => d.input.y)
      .attr("x2", (d) => d.output.x)
      .attr("y2", (d) => d.output.y)
      .lower();

    connectionLines.lower();
  }

  function perceptronLabels() {
    // input labels
    latexOntoSvg(svg.current, "x_0 = 1", 300, 100, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "x_1", 300, 300, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "x_2", 300, 500, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "x_D", 300, 900, "perceptron-label","", "25")

    // weights labels
    latexOntoSvg(svg.current, "w_0", 700, 300, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "w_1", 700, 400, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "w_2", 700, 520, "perceptron-label","", "25")
    latexOntoSvg(svg.current, "w_D", 700, 700, "perceptron-label","", "25")

    // output label
    latexOntoSvg(svg.current, "y(\\vec{x})", 900, 560, "perceptron-label","", "25")
  }

  function multiClassLabels() {
    // input labels
    latexOntoSvg(svg.current, "x_0 = 1", 300, 100, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "x_1", 300, 300, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "x_2", 300, 500, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "x_D", 300, 900, "multi-class-label","", "25")

    // weights labels
    latexOntoSvg(svg.current, "w_{01}", 700, 130, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "w_{DK}", 700, 870, "multi-class-label","", "25")

    // output label
    latexOntoSvg(svg.current, "y_1(\\vec{x})", 920, 250, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "y_2(\\vec{x})", 920, 450, "multi-class-label","", "25")
    latexOntoSvg(svg.current, "y_K(\\vec{x})", 920, 850, "multi-class-label","", "25")
  }

  function displayGeneralPerceptronLabels() {
    const g = svg.current.append("g").attr("class", "perceptron-general-labels","", "25")

    g.append("text")
      .text("Inputs")
      .attr("x", 400)
      .attr("y", 970)
      .attr("text-anchor", "middle")
      .attr("font-size", 3);

    g.append("text")
      .text("Weights")
      .attr("x", 700)
      .attr("y", 250)
      .attr("text-anchor", "middle")
      .attr("font-size", 30);

    g.append("text")
      .text("Output")
      .attr("x", 900)
      .attr("y", 570)
      .attr("text-anchor", "middle")
      .attr("font-size", 30);
  }

  function highlightNeuron(neuron) {
    svg.current
      .selectAll(".input-circle, .input-circle-bias, .connection-line, .input-dots")
      .attr("opacity", 1)
      .transition()
      .duration(200)
      .attr("opacity", 0.1);

    svg.current
      .selectAll(`circle[cx='${neuron.x}'][cy='${neuron.y}']`)
      .transition()
      .duration(200)
      .attr("opacity", 1);

    svg.current
      .selectAll(
        `line[x1='${neuron.x}'][y1='${neuron.y}'], line[x2='${neuron.x}'][y2='${neuron.y}']`
      )
      .transition()
      .duration(200)
      .attr("opacity", 1);

    // input labels
    latexOntoSvg(svg.current, "x_1", 300, 300, "highlighted-perceptron-label","", "25")

    // weights labels
    latexOntoSvg(svg.current, "w_{11}", 700, 200, "highlighted-perceptron-label","", "25")
    latexOntoSvg(svg.current, "w_{12}", 700, 330, "highlighted-perceptron-label","", "25")
    latexOntoSvg(svg.current, "w_{1K}", 700, 550, "highlighted-perceptron-label","", "25")

    // output label
    latexOntoSvg(svg.current, "y_1(\\vec{x})", 920, 250, "highlighted-perceptron-label","", "25")
    latexOntoSvg(svg.current, "y_2(\\vec{x})", 920, 450, "highlighted-perceptron-label","", "25")
    latexOntoSvg(svg.current, "y_K(\\vec{x})", 920, 850, "highlighted-perceptron-label","", "25")
  }

  function resetHighlight() {
    svg.current
      .selectAll(".input-circle, .input-circle-bias, .output-circle, .connection-line, .input-dots")
      .transition()
      .duration(200)
      .attr("opacity", 1);
  }

  function drawMappingBox() {
    const mappingBox = svg.current.append("g").attr("class", "mapping-box");

    mappingBox
      .append("rect")
      .attr("x", 175)
      .attr("y", 250)
      .attr("width", 150)
      .attr("height", 700)
      .attr("class", "mapping-rect");

    const circleData = [400, 600, 800];
    circleData.forEach((cy) => {
      mappingBox
        .append("circle")
        .attr("cx", 100)
        .attr("cy", cy)
        .attr("r", 30)
        .attr("class", "mapping-input");
    });

    const lineData = [
      { x1: 100, y1: 400, x2: 175, y2: 400 },
      { x1: 100, y1: 600, x2: 175, y2: 600 },
      { x1: 100, y1: 800, x2: 175, y2: 800 },
      { x1: 325, y1: 300, x2: 370, y2: 300 },
      { x1: 325, y1: 500, x2: 370, y2: 500 },
      { x1: 325, y1: 900, x2: 370, y2: 900 },
    ];

    lineData.forEach(({ x1, y1, x2, y2 }) => {
      mappingBox
        .append("line")
        .attr("class", "mapping-line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .lower();
    });

    // input labels
    latexOntoSvg(svg.current, "\\vec{\\phi}(\\vec{x})", 250, 600, "mapping-label","", "25")
    latexOntoSvg(svg.current, "x_1", 40, 400, "mapping-label","", "25")
    latexOntoSvg(svg.current, "x_2", 40, 600, "mapping-label","", "25")
    latexOntoSvg(svg.current, "x_D", 40, 800, "mapping-label","", "25")

    // mapping labels
    latexOntoSvg(svg.current, "\\phi_0(\\vec{x}) = 1", 270, 100, "mapping-label","", "25")
    latexOntoSvg(svg.current, "\\phi_M(\\vec{x})", 450, 950, "mapping-label","", "25")

    // weights labels
    latexOntoSvg(svg.current, "w_{01}", 700, 130, "mapping-label","", "25")
    latexOntoSvg(svg.current, "w_{DK}", 700, 870, "mapping-label","", "25")

    // output label
    latexOntoSvg(svg.current, "y_1(\\vec{x})", 920, 250, "mapping-label","", "25")
    latexOntoSvg(svg.current, "y_2(\\vec{x})", 920, 450, "mapping-label","", "25")
    latexOntoSvg(svg.current, "y_K(\\vec{x})", 920, 850, "mapping-label","", "25")

    drawDots(mappingBox, 100, 670);
  }

  function drawDots(g, firstPointX, firstPointY, className = "dots") {
    const offsets = [0, 30, 60];
    offsets.forEach((offset) => {
      g.append("circle")
        .attr("cx", firstPointX)
        .attr("cy", firstPointY + offset)
        .attr("r", 5)
        .attr("class", className);
    });
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
      .attr("stroke-width", 7.5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "2px");
  }

  function drawPoints(dataPoints, className) {
    const g = svg.current.append("g").attr("class", className);

    g.selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => (d.t === 1 ? "steelblue" : "orange"))
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(0));
  }

  function calculateDecisionBoundaryWithBasisFunctions(dataPoints, polyDegree) {
    const hasPositive = dataPoints.some((point) => point.t === 1);
    const hasNegative = dataPoints.some((point) => point.t === -1);
    if (!hasPositive || !hasNegative) return;

    const X = dataPoints.map((d) => generateBasisFunctions(d.x, polyDegree));
    const t = dataPoints.map((d) => d.t);

    let weights = new Array(polyDegree + 1).fill(0.1);

    const learningRate = 0.25;
    const maxIterations = 10000;
    const tolerance = 1e-5;

    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = X.map((x) => {
        const z = numeric.dot(x, weights);
        return Math.tanh(z);
      });

      const errors = numeric.sub(predictions, t);

      const gradient = X.reduce((grad, x, idx) => {
        const derivativeTanh = errors[idx] * (1 - Math.tanh(predictions[idx]) ** 2);
        return numeric.add(grad, numeric.mul(derivativeTanh, x));
      }, new Array(polyDegree + 1).fill(0));

      weights = numeric.sub(weights, numeric.mul(learningRate, gradient));

      if (numeric.norm2(gradient) < tolerance) {
        break;
      }
    }

    const xValues = d3.range(-1, 1, 0.01);
    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    const path = coordSystemRef.current
      .selectAll(".perceptron-linear-discriminant-decision-boundary")
      .data([decisionBoundary]);

    path
      .enter()
      .append("path")
      .attr("class", "perceptron-linear-discriminant-decision-boundary")
      .merge(path)
      .transition()
      .ease(d3.easeBackOut)
      .duration(600)
      .attr("d", line);

    addVerticalLinesAndShading(decisionBoundary);
  }

  function addVerticalLinesAndShading(decisionBoundary) {
    const zeroCrossings = findZeroCrossings(decisionBoundary);

    const lineGroup = coordSystemRef.current
      .selectAll(".perceptron-linear-discriminant-class-seperator")
      .data(zeroCrossings);
    lineGroup
      .enter()
      .append("line")
      .attr("class", "perceptron-linear-discriminant-class-seperator")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 950)
      .attr("y2", 950)
      .merge(lineGroup)
      .transition()
      .ease(d3.easeBackOut)
      .duration(600)
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", 950);

    lineGroup.exit().remove();
  }

  function findZeroCrossings(boundary) {
    const zeroCrossings = [];
    for (let i = 1; i < boundary.length; i++) {
      if (
        (boundary[i - 1].y > 0 && boundary[i].y < 0) ||
        (boundary[i - 1].y < 0 && boundary[i].y > 0)
      ) {
        const zeroX =
          boundary[i - 1].x -
          (boundary[i - 1].y * (boundary[i].x - boundary[i - 1].x)) /
            (boundary[i].y - boundary[i - 1].y);
        zeroCrossings.push(zeroX);
      }
    }
    return zeroCrossings;
  }

  function generateBasisFunctions(x, degree) {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      basisFunctions.push(Math.pow(x, i));
    }
    return basisFunctions;
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
