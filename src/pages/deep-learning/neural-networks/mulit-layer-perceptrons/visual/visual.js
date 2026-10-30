import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const coordSystemRef = useRef();
  const xScale = d3.scaleLinear().domain([-2, 2]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([-1.5, 1.5]).range([950, 50]);

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const inputLayerPoints = [
    { x: 100, y: 200, bias: true },
    { x: 100, y: 400 },
    { x: 100, y: 800 },
  ];

  const hiddenLayerPoints = [
    { x: 500, y: 100, bias: true },
    { x: 500, y: 300 },
    { x: 500, y: 900 },
  ];

  const outputLayerPoints = [
    { x: 900, y: 400 },
    { x: 900, y: 800 },
  ];

  const actions = useRef([
    {
      start: 1,
      end: 5,
      action: () => {
        drawInputLayer();
        drawDots(100, 525, "mlp-input-dots");
      },
      remove: () => {
        svg.current.selectAll("circle").remove();
        d3.selectAll(".mlp-input-bias").remove();
        d3.selectAll(".mlp-input-hidden-connection").remove();
        d3.selectAll(".mlp-input-dots").remove();
        d3.selectAll(".mlp-input-label").remove();
        d3.selectAll(".mlp-input-label-bias").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        drawHiddenLayer();
        drawDots(500, 525, "mlp-hidden-dots");
      },
      remove: () => {
        d3.selectAll(".mlp-activation-point").remove();
        d3.selectAll(".mlp-hidden-bias").remove();
        d3.selectAll(".mlp-input-hidden-connection").remove();
        d3.selectAll(".mlp-hidden-dots").remove();
        d3.selectAll(".mlp-activation-label").remove();
        d3.selectAll(".mlp-activation-label-bias").remove();
        d3.selectAll(".mlp-weigth-label-1").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        drawHiddenUnitsLabels();
        d3.selectAll(".mlp-activation-point").attr("class", "mlp-hidden-point");
      },
      remove: () => {
        d3.selectAll(".mlp-hidden-point").attr("class", "mlp-activation-point");
        d3.selectAll(".mlp-hidden-label").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 5,
      action: () => {
        drawOutputLayer();
        drawDots(900, 525, "mlp-output-dots");
      },
      remove: () => {
        d3.selectAll(".mlp-activation-output-point").remove();
        d3.selectAll(".mlp-output-bias").remove();
        d3.selectAll(".mlp-hidden-output-connection").remove();
        d3.selectAll(".mlp-output-dots").remove();
        d3.selectAll(".mlp-output-label").remove();
        d3.selectAll(".mlp-weigth-label-2").remove();
        d3.selectAll(".mlp-activation-output-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        drawOutputUnitLabels();
        d3.selectAll(".mlp-activation-output-point").attr("class", "mlp-output-point");
      },
      remove: () => {
        d3.selectAll(".mlp-output-point").attr("class", "mlp-activation-output-point");
        d3.selectAll(".mlp-output-label").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 8,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 500, 500, coordSystemRef);
      },
      remove: () => {
        coordSystemRef.current.remove();
        d3.selectAll(".non-linear-activation-function-visual").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        updateNonLinearActivationFunction((x) => 1 / (1 + Math.exp(-x)), "Logistic sigmoid");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        updateNonLinearActivationFunction((x) => Math.tanh(x), "Hyperbolic tangent");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 8,
      end: 8,
      action: () => {
        updateNonLinearActivationFunction((x) => Math.max(0, x), "Rectified linear unit (ReLU)");
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  function drawDots(firstPointX, firstPointY, className) {
    const offsets = [0, 75, 150];
    offsets.forEach((offset) => {
      svg.current
        .append("circle")
        .attr("cx", firstPointX)
        .attr("cy", firstPointY + offset)
        .attr("r", 7)
        .attr("class", className);
    });
  }

  function drawInputLayer() {
    const g = svg.current.append("g").attr("class", "mlp-input-layer");

    g.selectAll("circle")
      .data(inputLayerPoints)
      .enter()
      .append("circle")
      .attr("class", (d) => (d.bias ? "mlp-input-bias" : "mlp-input-point"))
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 30);

    latexOntoSvg(svg.current, "x_0 = 1", 100, 150, "mlp-input-label-bias", "", "25");
    latexOntoSvg(svg.current, "x_1", 100, 450, "mlp-input-label", "", "25");
    latexOntoSvg(svg.current, "x_D", 100, 850, "mlp-input-label", "", "25");
  }

  function drawHiddenUnitsLabels() {
    latexOntoSvg(svg.current, " z_1", 550, 250, "mlp-hidden-label", "", "25");
    latexOntoSvg(svg.current, " z_M", 550, 950, "mlp-hidden-label", "", "25");
    latexOntoSvg(svg.current, "\\Rightarrow", 500, 250, "mlp-hidden-label", "", "25");
    latexOntoSvg(svg.current, "h^{(1)}", 500, 230, "mlp-hidden-label", "", "15");
    latexOntoSvg(svg.current, "\\Rightarrow", 500, 950, "mlp-hidden-label", "", "25");
    latexOntoSvg(svg.current, "h^{(1)}", 500, 970, "mlp-hidden-label", "", "15");
  }

  function drawHiddenLayer() {
    const g = svg.current.append("g").attr("class", "mlp-hidden-layer");

    const circleRadius = 30; // radius of the circles

    // Function to calculate the starting point on the edge of the circle
    function calculateEdgePoint(x1, y1, x2, y2, radius) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const xEdge = x1 + radius * Math.cos(angle);
      const yEdge = y1 + radius * Math.sin(angle);
      return { x: xEdge, y: yEdge };
    }

    // Draw connections
    hiddenLayerPoints
      .filter((d) => !d.bias)
      .forEach((hiddenNode) => {
        inputLayerPoints.forEach((inputNode) => {
          const startEdge = calculateEdgePoint(
            inputNode.x,
            inputNode.y,
            hiddenNode.x,
            hiddenNode.y,
            circleRadius
          );

          g.append("line")
            .attr("class", "mlp-input-hidden-connection")
            .attr("x1", startEdge.x)
            .attr("y1", startEdge.y)

            .attr("x2", hiddenNode.x)
            .attr("y2", hiddenNode.y);
        });
      });

    // Draw hidden layer points
    g.selectAll("circle")
      .data(hiddenLayerPoints)
      .enter()
      .append("circle")
      .attr("class", (d) => (d.bias ? "mlp-hidden-bias" : "mlp-activation-point"))
      .attr("r", circleRadius)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    latexOntoSvg(svg.current, "W^{(1)}", 300, 200, "mlp-weigth-label-1", "", "35");
    latexOntoSvg(svg.current, "z_0 = 1", 500, 50, "mlp-activation-label-bias", "", "25");
    latexOntoSvg(svg.current, "a_1", 450, 250, "mlp-activation-label", "", "25");
    latexOntoSvg(svg.current, "a_M", 450, 950, "mlp-activation-label", "", "25");
  }

  function drawOutputLayer() {
    const g = svg.current.append("g").attr("class", "mlp-output-layer");

    const circleRadius = 30; 

    // Function to calculate the starting point on the edge of the circle
    function calculateEdgePoint(x1, y1, x2, y2, radius) {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const xEdge = x1 + radius * Math.cos(angle);
      const yEdge = y1 + radius * Math.sin(angle);
      return { x: xEdge, y: yEdge };
    }

    // Draw connections
    outputLayerPoints
      .filter((d) => !d.bias)
      .forEach((outputNode) => {
        hiddenLayerPoints.forEach((hiddenNode) => {
          const startEdge = calculateEdgePoint(
            hiddenNode.x,
            hiddenNode.y,
            outputNode.x,
            outputNode.y,
            circleRadius
          );

          g.append("line")
            .attr("class", "mlp-hidden-output-connection")
            .attr("x1", startEdge.x)
            .attr("y1", startEdge.y)
            .attr("x2", outputNode.x)
            .attr("y2", outputNode.y);
        });
      });

    // Draw hidden layer points
    g.selectAll("circle")
      .data(outputLayerPoints)
      .enter()
      .append("circle")
      .attr("class", "mlp-activation-output-point")
      .attr("r", circleRadius)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    latexOntoSvg(svg.current, "W^{(2)}", 750, 200, "mlp-weigth-label-2", "", "35");
    latexOntoSvg(svg.current, "a_1", 860, 350, "mlp-activation-output-label", "", "25");
    latexOntoSvg(svg.current, "a_K", 860, 850, "mlp-activation-output-label", "", "25");
  }

  function drawOutputUnitLabels() {
    latexOntoSvg(svg.current, " y_1", 940, 350, "mlp-output-label", "", "25");
    latexOntoSvg(svg.current, " y_K", 940, 850, "mlp-output-label", "", "25");
    latexOntoSvg(svg.current, "\\Rightarrow", 900, 350, "mlp-output-label", "", "25");
    latexOntoSvg(svg.current, "h^{(2)}", 900, 330, "mlp-output-label", "", "15");
    latexOntoSvg(svg.current, "\\Rightarrow", 900, 850, "mlp-output-label", "", "25");
    latexOntoSvg(svg.current, "h^{(2)}", 900, 870, "mlp-output-label", "", "15");
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
          .tickValues([-1, 1])
          .tickPadding(10)
          .tickFormat(d3.format("d"))
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([-1, 1])
          .tickPadding(10)
          .tickFormat(d3.format("d"))
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");
  }

  function updateNonLinearActivationFunction(activationFunction, text) {
    let g = svg.current.select("g.non-linear-activation-function-visual");

    if (g.empty()) {
      g = svg.current.append("g").attr("class", "non-linear-activation-function-visual");
    }

    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map(activationFunction);

    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d, i) => yScale(y[i]));

    const path = g.selectAll("path").data([x]);

    path
      .enter()
      .append("path")
      .merge(path)
      .attr("class", "non-linear-activation-function-visual")
      .transition()
      .duration(500)
      .attr("d", line);

    //also update the text
    g.selectAll("text").remove();
    g.append("text")
      .attr("x", 250)
      .attr("y", 100)
      .text(text)
      .attr("class", "non-linear-activation-function-text-visual")
      .attr("text-anchor", "middle")
      .style("font-size", "30px");
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
