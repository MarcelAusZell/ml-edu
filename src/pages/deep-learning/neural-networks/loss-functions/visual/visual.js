import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./visual.scss";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const inputLayerPointsLegend = [
    { x: 20, y: 40, bias: true },
    { x: 20, y: 80 },
    { x: 20, y: 160 },
  ];

  const hiddenLayerPointsLegend = [
    { x: 100, y: 20, bias: true },
    { x: 100, y: 60 },
    { x: 100, y: 180 },
  ];

  const outputLayerPointsLegend = [
    { x: 180, y: 80 },
    { x: 180, y: 160 },
  ];

  const network = [
    {
      input: [
        { x: 100, y: 200, bias: true },
        { x: 100, y: 300 },
        { x: 100, y: 600 },
      ],

      hidden: [
        { x: 500, y: 100, bias: true },
        { x: 500, y: 200 },
        { x: 500, y: 700 },
      ],

      output: [
        { x: 900, y: 300 },
        { x: 900, y: 600 },
      ],
    },
    {
      input: [
        { x: 100, y: 200, bias: true },
        { x: 100, y: 300 },
        { x: 100, y: 600 },
      ],

      hidden: [
        { x: 500, y: 100, bias: true },
        { x: 500, y: 200 },
        { x: 500, y: 700 },
      ],

      output: [{ x: 900, y: 450 }],
    },
    {
      input: [
        { x: 100, y: 200, bias: true },
        { x: 100, y: 300 },
        { x: 100, y: 600 },
      ],

      hidden: [
        { x: 500, y: 100, bias: true },
        { x: 500, y: 200 },
        { x: 500, y: 700 },
      ],

      output: [
        { x: 900, y: 300 },
        { x: 900, y: 400 },
        { x: 900, y: 600 },
      ],
    },
  ];

  const actions = useRef([
    {
      start: 1,
      end: 7,
      action: () => {
        drawNNStep([inputLayerPointsLegend, hiddenLayerPointsLegend, outputLayerPointsLegend]);
        drawErrorFunctionStep();
        drawCalculateGradientsStep();
        drawUpdateWeightsStep();
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 4,
      action: () => {
        drawMLP([network[0].input, network[0].hidden, network[0].output]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        changeOpacityOfSteps(1, 0.1, 0.1, 0.1);
        drawMLP([network[0].input, network[0].hidden, network[0].output]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        changeOpacityOfSteps(0.1, 1, 0.1, 0.1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        changeOpacityOfSteps(0.1, 0.1, 1, 0.1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        changeOpacityOfSteps(0.1, 0.1, 0.1, 1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        drawMLP([network[1].input, network[1].hidden, network[1].output]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 7,
      action: () => {
        changeOpacityOfSteps(1, 1, 0.1, 0.1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        latexOntoSvg(svg.current, "y(\\vec{x}; \\vec{w})=", 900, 300, "mlp-regression-label", "", "25");
        latexOntoSvg(svg.current, "h^{(2)}(a) = a", 900, 350, "mlp-regression-label", "", "25");
      },
      remove: () => {
        d3.selectAll(".mlp-regression-label").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        drawMLP([network[1].input, network[1].hidden, network[1].output]);
        latexOntoSvg(svg.current, "y(\\vec{x}; \\vec{w})=", 900, 300, "mlp-binary-classfication-label", "", "25");
        latexOntoSvg(svg.current, "h^{(2)}(a) = \\sigma(a)", 900, 350, "mlp-binary-classfication-label", "", "25");
      },
      remove: () => {
        d3.selectAll(".mlp-binary-classfication-label").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        drawMLP([network[2].input, network[2].hidden, network[2].output]);
        drawDots(svg.current, 900, 450, 50, 5, "mlp-dots-multi-classification");
        latexOntoSvg(svg.current, "y_k(\\vec{x}, \\vec{w}) = h^{(2)}(\\vec{a}) =", 850, 100, "mlp-multi-classfication-label", "", "25");
        latexOntoSvg(svg.current, "\\frac{\\exp(a_k)}{\\sum_{j=1}^K \\exp(a_j)}", 850, 175, "mlp-multi-classfication-label", "", "25");

        latexOntoSvg(svg.current, "y_1", 950, 300, "mlp-multi-classfication-label", "", "25");
        latexOntoSvg(svg.current, "y_2", 950, 400, "mlp-multi-classfication-label", "", "25");
        latexOntoSvg(svg.current, "y_K", 950, 600, "mlp-multi-classfication-label", "", "25");
      },
      remove: () => {
        d3.selectAll(".mlp-multi-classfication-label").remove();
        d3.selectAll(".mlp-dots-multi-classification").remove();
      },
      called: false,
    },
  ]).current;

  function drawDebugGrid() {
    const g = svg.current.append("g");
    g.attr("stroke", "black").attr("stroke-width", 5).attr("stroke-opacity", 0.1);

    for (let i = 0; i <= 1000; i += 100) {
      g.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", 1000);
    }
    for (let i = 0; i <= 1000; i += 100) {
      g.append("line").attr("x1", 0).attr("y1", i).attr("x2", 1000).attr("y2", i);
    }
  }

  function changeOpacityOfSteps(nnOpacity, errorFunctionOpacity, calculateGradientsOpacity, updateWeightsOpacity) {
    d3.select(".nn-step-svg").transition().duration(200).attr("opacity", nnOpacity);
    d3.select(".error-function-step-svg").transition().duration(200).attr("opacity", errorFunctionOpacity);
    d3.select(".calculate-gradients-step-svg").transition().duration(200).attr("opacity", calculateGradientsOpacity);
    d3.select(".update-weights-step-svg").transition().duration(200).attr("opacity", updateWeightsOpacity);
  }

  function drawNNStep(layers) {
    const subSvg = svg.current.append("svg").attr("class", "nn-step-svg").attr("width", 200).attr("height", 200).attr("x", 0).attr("y", 800);

    const g = subSvg.append("g").attr("class", "small-nn");

    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];

      currentLayer.forEach((currentPoint) => {
        nextLayer.forEach((nextPoint) => {
          if (!nextPoint.bias) {
            g.append("line")
              .attr("x1", currentPoint.x)
              .attr("y1", currentPoint.y)
              .attr("x2", nextPoint.x)
              .attr("y2", nextPoint.y)
              .attr("stroke", "gray")
              .attr("stroke-width", 1);
          }
        });
      });
    }

    // Draw nodes for each layer
    layers.forEach((layer, index) => {
      const classes = ["input", "hidden", "output"];
      g.selectAll(`circle.${classes[index]}`)
        .data(layer)
        .enter()
        .append("circle")
        .attr("class", (d) => (d.bias ? "mlp-bias" : "mlp-node"))
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 10);
    });

    drawDots(g, 20, 105, 15, 3);
    drawDots(g, 100, 105, 15, 3);
    drawDots(g, 180, 105, 15, 3);
  }

  function drawDots(svg, xStart, yStart, offset, radius, className = "mlp-dots") {
    for (let i = 0; i < 3; i++) {
      svg
        .append("circle")
        .attr("cx", xStart)
        .attr("cy", yStart + i * offset)
        .attr("r", radius)
        .attr("class", className);
    }
  }

  function drawErrorFunctionStep() {
    const subSvg = svg.current
      .append("svg")
      .attr("class", "error-function-step-svg")
      .attr("width", 200)
      .attr("height", 200)
      .attr("x", 200)
      .attr("y", 800)
      .attr("viewBox", "0 0 200 200");

    const g = subSvg.append("g").attr("class", "error-function-step");


    appendText(g, 150, 120, "Apply", 20, "error-function-step");
    appendText(g, 150, 150, "Error", 20, "error-function-step");
    appendText(g, 150, 180, "Function", 20, "error-function-step");

    latexOntoSvg(subSvg, "E(\\vec{w})", 150, 65, "error-function-step", "", "25");
    latexOntoSvg(subSvg, "\\Rightarrow", 50, 100, "error-function-step", "", "30");
  }

  function drawCalculateGradientsStep() {
    const subSvg = svg.current
      .append("svg")
      .attr("class", "calculate-gradients-step-svg")
      .attr("width", 200)
      .attr("height", 200)
      .attr("x", 400)
      .attr("y", 800)
      .attr("viewBox", "0 0 200 200");

    const g = subSvg.append("g").attr("class", "calculate-gradients-step");


    appendText(g, 150, 150, "Calculate", 20, "calculate-gradients-step");
    appendText(g, 150, 180, "Gradients", 20, "calculate-gradients-step");

    latexOntoSvg(subSvg, "\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}}", 150, 80, "calculate-gradients-step", "", "25");
    latexOntoSvg(subSvg, "\\Rightarrow", 50, 100, "calculate-gradients-step", "", "30");
  }

  function drawUpdateWeightsStep() {
    const subSvg = svg.current
      .append("svg")
      .attr("class", "update-weights-step-svg")
      .attr("width", 400)
      .attr("height", 200)
      .attr("x", 600)
      .attr("y", 800)
      .attr("viewBox", "0 0 400 200");

    const g = subSvg.append("g").attr("class", "update-weights-step");

    // d3.select(".error-function-step-svg").attr("opacity", 0.1);

    appendText(g, 250, 150, "Update Weights", 20, "update-weights-step");
    latexOntoSvg(
      subSvg,
      "\\vec{w}^{(\\tau + 1)} = \\vec{w}^{(\\tau)} - \\eta \\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}}",
      270,
      80,
      "update-weights-step",
      "",
      "23px"
    );

    latexOntoSvg(subSvg, "\\Rightarrow", 50, 100, "update-weights-step", "", "30");
  }

  function appendText(g, x, y, text, fontSize, className) {
    g.append("text").attr("x", x).attr("y", y).attr("text-anchor", "middle").text(text).attr("font-size", fontSize).attr("class", className);
  }

  /* -------------------------------------------------------------------------------------------------------------------------------------------- */

  function drawMLP(layers) {
    d3.select(".multi-layer-perceptron-error").remove();
    const g = svg.current.append("g").attr("class", "multi-layer-perceptron-error");

    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];

      currentLayer.forEach((currentPoint) => {
        nextLayer.forEach((nextPoint) => {
          if (!nextPoint.bias) {
            g.append("line")
              .attr("class", "mlp-line-error-comparison")
              .attr("x1", currentPoint.x)
              .attr("y1", currentPoint.y)
              .attr("x2", nextPoint.x)
              .attr("y2", nextPoint.y);
          }
        });
      });
    }

    // Draw nodes for each layer
    layers.forEach((layer, index) => {
      const classes = ["input", "hidden", "output"];
      g.selectAll(`circle.${classes[index]}`)
        .data(layer)
        .enter()
        .append("circle")
        .attr("class", (d) => (d.bias ? "mlp-bias-error-comparison" : "mlp-node-error-comparison"))
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 25);
    });

    drawDots(g, 100, 400, 50, 5);
    drawDots(g, 500, 400, 50, 5);
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
