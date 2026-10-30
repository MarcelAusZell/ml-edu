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

  const actions = useRef([
    {
      start: 1,
      end: 8,
      action: () => {
        drawMLP();
        drawNNStep([inputLayerPointsLegend, hiddenLayerPointsLegend, outputLayerPointsLegend]);
        drawErrorFunctionStep();
        drawCalculateGradientsStep();
        drawUpdateWeightsStep();
        changeOpacityOfSteps(1, 1, 1, 0.1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 3,
      action: () => {
        drawLatexLabels();
      },
      remove: () => {
        d3.selectAll(".bp-latex-label").remove();
      },
      called: false,
    },

    {
      start: 1,
      end: 1,
      action: () => {
        setOpacityExcept([], true);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        setOpacityExcept(["bp-zi-1", "bp-w11-2", "bp-aj-2", "bp-zi-1-label", "bp-aj-2-label", "bp-wij-label"]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        setOpacityExcept([
          "bp-zi-1",
          "bp-w11-2",
          "bp-aj-2",
          "bp-zi-1-label",
          "bp-aj-2-label",
          "bp-h2-1-label",
          "bp-zj-2-label",
          "bp-zj-2",
          "bp-a11-1",
          "bp-w11-3",
          "bp-w12-3",
          "bp-w13-3",
          "bp-y1",
          "bp-yk",
          "bp-yK",
          "bp-a1-3",
          "bp-ak-3",
          "bp-aK-3",
          "bp-y1-label",
          "bp-yk-label",
          "bp-yK-label",
          "bp-a1-3-label",
          "bp-ak-3-label",
          "bp-aK-3-label",
          "bp-a13",
          "bp-ak3",
          "bp-aK3",
          "bp-wij-label",
          "bp-wjk-label",
          "bp-delta-j-label",
        ]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 8,
      action: () => {
        drawNewLatexLabels();
      },
      remove: () => {
        d3.selectAll(".bp-latex-new-label").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        setOpacityExcept(["bp-zi-1", "bp-w11-2", "bp-aj-2", "bp-zi-1-label-new", "bp-aj-2-label-new", "bp-wij-label-new"]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        setOpacityExcept([
          "bp-zi-1",
          "bp-w11-2",
          "bp-aj-2",
          "bp-zi-1-label-new",
          "bp-aj-2-label-new",
          "bp-h2-1-label-new",
          "bp-zj-2-label-new",
          "bp-zj-2",
          "bp-a11-1",
          "bp-w11-3",
          "bp-w12-3",
          "bp-w13-3",
          "bp-y1",
          "bp-yk",
          "bp-yK",
          "bp-a1-3",
          "bp-ak-3",
          "bp-aK-3",
          "bp-y1-label-new",
          "bp-yk-label-new",
          "bp-yK-label-new",
          "bp-a1-3-label-new",
          "bp-ak-3-label-new",
          "bp-aK-3-label-new",
          "bp-a13",
          "bp-ak3",
          "bp-aK3",
          "bp-wij-label-new",
          "bp-wjk-label-new",
          "bp-delta-j-label-new",
          "bp-delta-1",
          "bp-delta-k",
          "bp-delta-K",
        ]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 7,
      action: () => {
        drawDeltas();
      },
      remove: () => {
        d3.selectAll(".bp-delta-output").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        setOpacityExcept([
          "bp-delta-j-label-new",
          "bp-zj-2-label-new",
          "bp-zj-2",
          "bp-y1",
          "bp-yk",
          "bp-yK",
          "bp-y1-label-new",
          "bp-yk-label-new",
          "bp-yK-label-new",
          "bp-delta-1",
          "bp-delta-k",
          "bp-delta-K",
        ]);
        drawDeltaArrow(svg.current, 930, 100, 680, 225);
        drawDeltaArrow(svg.current, 930, 250, 680, 250);
        drawDeltaArrow(svg.current, 930, 400, 680, 275);
      },
      remove: () => {
        d3.selectAll(".bp-delta-arrow").remove();
      },
      called: false,
    },
  ]).current;

  function setOpacityExcept(exceptIds, allToOne = false) {
    const classes = ["bp-node", "bp-edge", "bp-latex-label", "bp-latex-new-label"];
    const opacity = allToOne ? 1 : 0.1;

    classes.forEach((className) => {
      d3.selectAll(`.${className}`).attr("opacity", opacity);
    });

    if (!allToOne) {
      exceptIds.forEach((id) => {
        d3.select(`#${id}`).attr("opacity", 1);
      });
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

  function drawLatexLabels() {
    const labels = [
      { text: "x_0", x: 50, y: 100, class: "bp-latex-label", id: "bp-x0-label", size: "25" },
      { text: "x_i", x: 50, y: 300, class: "bp-latex-label", id: "bp-x1-label", size: "25" },
      { text: "x_D", x: 50, y: 500, class: "bp-latex-label", id: "bp-x2-label", size: "25" },
      { text: "a_i^{(1)}", x: 250, y: 300, class: "bp-latex-label", id: "bp-ai-1-label", size: "25" },
      { text: "a_M^{(1)}", x: 250, y: 500, class: "bp-latex-label", id: "bp-aM-1-label", size: "25" },
      { text: "z_0^{(1)}", x: 350, y: 100, class: "bp-latex-label", id: "bp-z0-1-label", size: "25" },
      { text: "z_i^{(1)}", x: 350, y: 300, class: "bp-latex-label", id: "bp-zi-1-label", size: "25" },
      { text: "z_M^{(1)}", x: 350, y: 500, class: "bp-latex-label", id: "bp-zM-1-label", size: "25" },
      { text: "a_j^{(2)}", x: 550, y: 300, class: "bp-latex-label", id: "bp-aj-2-label", size: "25" },
      { text: "a_M^{(2)}", x: 550, y: 500, class: "bp-latex-label", id: "bp-aM-2-label", size: "25" },
      { text: "z_0^{(2)}", x: 650, y: 100, class: "bp-latex-label", id: "bp-z0-2-label", size: "25" },
      { text: "z_j^{(2)}", x: 650, y: 300, class: "bp-latex-label", id: "bp-zj-2-label", size: "25" },
      { text: "z_M^{(2)}", x: 650, y: 500, class: "bp-latex-label", id: "bp-zM-2-label", size: "25" },
      { text: "a_1", x: 850, y: 150, class: "bp-latex-label", id: "bp-a1-3-label", size: "25" },
      { text: "a_k", x: 850, y: 300, class: "bp-latex-label", id: "bp-ak-3-label", size: "25" },
      { text: "a_K", x: 850, y: 450, class: "bp-latex-label", id: "bp-aK-3-label", size: "25" },
      { text: "y_1", x: 950, y: 150, class: "bp-latex-label", id: "bp-y1-label", size: "25" },
      { text: "y_k", x: 950, y: 300, class: "bp-latex-label", id: "bp-yk-label", size: "25" },
      { text: "y_K", x: 950, y: 450, class: "bp-latex-label", id: "bp-yK-label", size: "25" },
      { text: "h^{(1)}", x: 300, y: 280, class: "bp-latex-label", id: "bp-h1-1-label", size: "20" },
      { text: "h^{(1)}", x: 300, y: 480, class: "bp-latex-label", id: "bp-h1-2-label", size: "20" },
      { text: "h^{(2)}", x: 600, y: 280, class: "bp-latex-label", id: "bp-h2-1-label", size: "20" },
      { text: "h^{(2)}", x: 600, y: 480, class: "bp-latex-label", id: "bp-h2-2-label", size: "20" },


      { text: "\\delta_j", x: 650, y: 250, class: "bp-latex-label", id: "bp-delta-j-label", size: "25" },
      { text: "w_{ij}^{(2)}", x: 475, y: 275, class: "bp-latex-label", id: "bp-wij-label", size: "25" },
      { text: "w_{jk}^{(3)}", x: 715, y: 275, class: "bp-latex-label", id: "bp-wjk-label", size: "25" },
    ];

    labels.forEach((label) => {
      latexOntoSvg(svg.current, label.text, label.x, label.y, label.class, label.id, label.size);
    });
  }

  function drawNewLatexLabels() {
    const labels = [
      { text: "x_0", x: 50, y: 100, class: "bp-latex-new-label", id: "bp-x0-label-new", size: "25" },
      { text: "x_i", x: 50, y: 300, class: "bp-latex-new-label", id: "bp-x1-label-new", size: "25" },
      { text: "x_D", x: 50, y: 500, class: "bp-latex-new-label", id: "bp-x2-label-new", size: "25" },
      { text: "a_i", x: 250, y: 300, class: "bp-latex-new-label", id: "bp-ai-1-label-new", size: "25" },
      { text: "a_M", x: 250, y: 500, class: "bp-latex-new-label", id: "bp-aM-1-label-new", size: "25" },
      { text: "z_0", x: 350, y: 100, class: "bp-latex-new-label", id: "bp-z0-1-label-new", size: "25" },
      { text: "z_i", x: 350, y: 300, class: "bp-latex-new-label", id: "bp-zi-1-label-new", size: "25" },
      { text: "z_M", x: 350, y: 500, class: "bp-latex-new-label", id: "bp-zM-1-label-new", size: "25" },
      { text: "a_j", x: 550, y: 300, class: "bp-latex-new-label", id: "bp-aj-2-label-new", size: "25" },
      { text: "a_M", x: 550, y: 500, class: "bp-latex-new-label", id: "bp-aM-2-label-new", size: "25" },
      { text: "z_0", x: 650, y: 100, class: "bp-latex-new-label", id: "bp-z0-2-label-new", size: "25" },
      { text: "z_j", x: 650, y: 300, class: "bp-latex-new-label", id: "bp-zj-2-label-new", size: "25" },
      { text: "z_M", x: 650, y: 500, class: "bp-latex-new-label", id: "bp-zM-2-label-new", size: "25" },
      { text: "a_1", x: 850, y: 150, class: "bp-latex-new-label", id: "bp-a1-3-label-new", size: "25" },
      { text: "a_k", x: 850, y: 300, class: "bp-latex-new-label", id: "bp-ak-3-label-new", size: "25" },
      { text: "a_K", x: 850, y: 450, class: "bp-latex-new-label", id: "bp-aK-3-label-new", size: "25" },
      { text: "y_1", x: 950, y: 150, class: "bp-latex-new-label", id: "bp-y1-label-new", size: "25" },
      { text: "y_k", x: 950, y: 300, class: "bp-latex-new-label", id: "bp-yk-label-new", size: "25" },
      { text: "y_K", x: 950, y: 450, class: "bp-latex-new-label", id: "bp-yK-label-new", size: "25" },
      { text: "h", x: 300, y: 280, class: "bp-latex-new-label", id: "bp-h1-1-label-new", size: "20" },
      { text: "h", x: 300, y: 480, class: "bp-latex-new-label", id: "bp-h1-2-label-new", size: "20" },
      { text: "h", x: 600, y: 280, class: "bp-latex-new-label", id: "bp-h2-1-label-new", size: "20" },
      { text: "h", x: 600, y: 480, class: "bp-latex-new-label", id: "bp-h2-2-label-new", size: "20" },


      { text: "\\delta_j", x: 650, y: 250, class: "bp-latex-label", id: "bp-delta-j-label-new", size: "25" },
      { text: "w_{ij}", x: 475, y: 280, class: "bp-latex-new-label", id: "bp-wij-label-new", size: "25" },
      { text: "w_{jk}", x: 720, y: 280, class: "bp-latex-new-label", id: "bp-wjk-label-new", size: "25" },
    ];

    labels.forEach((label) => {
      latexOntoSvg(svg.current, label.text, label.x, label.y, label.class, label.id, label.size);
    });
  }

  function drawMLP() {
    const mlp = svg.current.append("g").attr("class", "mlp-backpropagation");

    const nodes = [
      // input layer
      { cx: 50, cy: 100, r: 30, id: "bp-x0" },
      { cx: 50, cy: 300, r: 30, id: "bp-x1" },
      { cx: 50, cy: 500, r: 30, id: "bp-x2" },
      // activation and hidden layer 1
      { cx: 250, cy: 300, r: 30, id: "bp-ai-1" },
      { cx: 250, cy: 500, r: 30, id: "bp-aM-1" },
      { cx: 350, cy: 100, r: 30, id: "bp-z0-1" },
      { cx: 350, cy: 300, r: 30, id: "bp-zi-1" },
      { cx: 350, cy: 500, r: 30, id: "bp-zM-1" },
      // activation and hidden layer 2
      { cx: 550, cy: 300, r: 30, id: "bp-aj-2" },
      { cx: 550, cy: 500, r: 30, id: "bp-aM-2" },
      { cx: 650, cy: 100, r: 30, id: "bp-z0-2" },
      { cx: 650, cy: 300, r: 30, id: "bp-zj-2" },
      { cx: 650, cy: 500, r: 30, id: "bp-zM-2" },
      // activation and output layer
      { cx: 850, cy: 150, r: 30, id: "bp-a1-3" },
      { cx: 850, cy: 300, r: 30, id: "bp-ak-3" },
      { cx: 850, cy: 450, r: 30, id: "bp-aK-3" },
      { cx: 950, cy: 150, r: 30, id: "bp-y1" },
      { cx: 950, cy: 300, r: 30, id: "bp-yk" },
      { cx: 950, cy: 450, r: 30, id: "bp-yK" },
    ];

    nodes.forEach((node) => {
      mlp.append("circle").attr("cx", node.cx).attr("cy", node.cy).attr("r", node.r).attr("id", node.id).attr("class", "bp-node");
    });

    const lines = [
      // input to hidden1
      { x1: 50, y1: 100, x2: 250, y2: 300, id: "bp-w01-1" },
      { x1: 50, y1: 100, x2: 250, y2: 500, id: "bp-w02-1" },
      { x1: 50, y1: 300, x2: 250, y2: 300, id: "bp-w11-1" },
      { x1: 50, y1: 300, x2: 250, y2: 500, id: "bp-w12-1" },
      { x1: 50, y1: 500, x2: 250, y2: 300, id: "bp-w21-1" },
      { x1: 50, y1: 500, x2: 250, y2: 500, id: "bp-w22-1" },
      // activation to hidden1
      { x1: 250, y1: 300, x2: 350, y2: 300, id: "bp-a11" },
      { x1: 250, y1: 500, x2: 350, y2: 500, id: "bp-a21" },
      // hidden1 to hidden2
      { x1: 350, y1: 100, x2: 550, y2: 300, id: "bp-w01-2" },
      { x1: 350, y1: 100, x2: 550, y2: 500, id: "bp-w02-2" },
      { x1: 350, y1: 300, x2: 550, y2: 300, id: "bp-w11-2" },
      { x1: 350, y1: 300, x2: 550, y2: 500, id: "bp-w12-2" },
      { x1: 350, y1: 500, x2: 550, y2: 300, id: "bp-w21-2" },
      { x1: 350, y1: 500, x2: 550, y2: 500, id: "bp-w22-2" },
      // activation to hidden2
      { x1: 550, y1: 300, x2: 650, y2: 300, id: "bp-a11-1" },
      { x1: 550, y1: 500, x2: 650, y2: 500, id: "bp-a21-1" },
      // hidden2 to output
      { x1: 650, y1: 100, x2: 850, y2: 150, id: "bp-w01-3" },
      { x1: 650, y1: 100, x2: 850, y2: 300, id: "bp-w02-3" },
      { x1: 650, y1: 100, x2: 850, y2: 450, id: "bp-w03-3" },
      { x1: 650, y1: 300, x2: 850, y2: 150, id: "bp-w11-3" },
      { x1: 650, y1: 300, x2: 850, y2: 300, id: "bp-w12-3" },
      { x1: 650, y1: 300, x2: 850, y2: 450, id: "bp-w13-3" },
      { x1: 650, y1: 500, x2: 850, y2: 150, id: "bp-w21-3" },
      { x1: 650, y1: 500, x2: 850, y2: 300, id: "bp-w22-3" },
      { x1: 650, y1: 500, x2: 850, y2: 450, id: "bp-w23-3" },
      // activation to output
      { x1: 850, y1: 150, x2: 950, y2: 150, id: "bp-a13" },
      { x1: 850, y1: 300, x2: 950, y2: 300, id: "bp-ak3" },
      { x1: 850, y1: 450, x2: 950, y2: 450, id: "bp-aK3" },
    ];

    lines.forEach((line) => {
      const start = calculateEdgePoint(line.x1, line.y1, line.x2, line.y2, 30);
      const end = calculateEdgePoint(line.x2, line.y2, line.x1, line.y1, 30);
      mlp.append("line").attr("x1", start.x).attr("y1", start.y).attr("x2", end.x).attr("y2", end.y).attr("id", line.id).attr("class", "bp-edge");
    });

    drawDots(mlp, 50, 170, 30, 3, "bp-dots");
    drawDots(mlp, 50, 370, 30, 3, "bp-dots");
    drawDots(mlp, 350, 170, 30, 3, "bp-dots");
    drawDots(mlp, 350, 370, 30, 3, "bp-dots");
    drawDots(mlp, 650, 170, 30, 3, "bp-dots");
    drawDots(mlp, 650, 370, 30, 3, "bp-dots");
    drawDots(mlp, 900, 350, 30, 3, "bp-dots");
    drawDots(mlp, 900, 200, 30, 3, "bp-dots");




  }

  function drawDeltas() {
    latexOntoSvg(svg.current, "\\delta_1", 950, 100, "bp-delta-output", "bp-delta-1", "25");
    latexOntoSvg(svg.current, "\\delta_k", 950, 250, "bp-delta-output", "bp-delta-k", "25");
    latexOntoSvg(svg.current, "\\delta_K", 950, 400, "bp-delta-output", "bp-delta-K", "25");
  }

  function drawDeltaArrow(svg, x1, y1, x2, y2) {
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", "5")
      .attr("refY", "5")
      .attr("markerWidth", "6")
      .attr("markerHeight", "6")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("class", "bp-delta-arrow-head");

    svg
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x1)
      .attr("y2", y1)
      .transition()
      .duration(400)
      .attr("x2", x2)
      .attr("y2", y2)
      .attr("class", "bp-delta-arrow")
      .attr("marker-end", "url(#arrow)");
  }
  function calculateEdgePoint(x1, y1, x2, y2, radius) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    return {
      x: x1 + radius * Math.cos(angle),
      y: y1 + radius * Math.sin(angle),
    };
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
