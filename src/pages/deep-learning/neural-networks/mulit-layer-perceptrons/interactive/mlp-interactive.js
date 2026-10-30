import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import "./mlp-interactive.scss";

export default function MLPInteractive() {
  const svgRef = useRef();
  const [inputLayerHeight, setInputLayerHeight] = useState(4);
  const [hiddenLayersCount, setHiddenLayersCount] = useState(1);
  const [hiddenLayersHeight, setHiddenLayersHeight] = useState([6]);
  const [outputLayerHeight, setOutputLayerHeight] = useState(3);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const svgViewBox = svg.node().viewBox.baseVal;
    const width = svgViewBox.width * 0.9;
    const height = svgViewBox.height * 0.9;
    const nodeSize = 15;

    svg.selectAll("*").remove();

    const networkGraph = MLPBuilder();
    drawGraph(networkGraph, svg, width, height, nodeSize);
  }, [inputLayerHeight, hiddenLayersCount, hiddenLayersHeight, outputLayerHeight]);

  function MLPBuilder() {
    const inputLayer = createLayer(1, inputLayerHeight, "input-layer");
    const hiddenLayers = createHiddenLayer(hiddenLayersCount, hiddenLayersHeight);
    const outputLayer = createLayer(
      hiddenLayersCount + 2,
      outputLayerHeight,
      "output-layer",
      false
    );

    return {
      nodes: [...inputLayer, ...hiddenLayers.flat(), ...outputLayer],
    };
  }

  function createLayer(layerIndex, layerSize, prefix, includeBias = true) {
    const layer = includeBias ? [{ label: `${prefix}bias`, layer: layerIndex }] : [];
    for (let i = 1; i < layerSize; i++) {
      layer.push({ label: `${prefix}${i}`, layer: layerIndex });
    }
    return layer;
  }

  function createHiddenLayer(count, depths) {
    return Array.from({ length: count }, (_, i) =>
      createLayer(i + 2, depths[i], `hidden-layer${i}`)
    );
  }

  function drawGraph(networkGraph, svg, width, height, nodeSize) {
    const nodes = positionNodes(networkGraph.nodes, width, height);
    const connections = createConnections(nodes);

    drawConnections(svg, connections, nodes);
    drawNodes(svg, nodes, nodeSize);
  }

  function positionNodes(nodes, width, height) {
    const layerSizes = {};
    nodes.forEach((node) => {
      if (layerSizes[node.layer] === undefined) {
        layerSizes[node.layer] = 0;
      }
      layerSizes[node.layer] += 1;
      node.layerIndex = layerSizes[node.layer];
    });

    const largestLayerSize = Math.max(...Object.values(layerSizes));
    const xDistance = width / (Object.keys(layerSizes).length + 1);
    const yDistance = height / (largestLayerSize + 1);

    nodes.forEach((node) => {
      node.x = node.layer * xDistance + 40;
      node.y = (node.layerIndex + (largestLayerSize - layerSizes[node.layer]) / 2) * yDistance;
    });

    return nodes;
  }

  function createConnections(nodes) {
    const connections = [];
    nodes.forEach((origin, i) => {
      nodes.forEach((goal, j) => {
        if (origin.layer + 1 === goal.layer && !goal.label.includes("bias")) {
          connections.push({ origin: i, goal: j, value: 1 });
        }
      });
    });
    return connections;
  }

  function drawConnections(svg, connections, nodes) {
    svg
      .selectAll(".mlp-interactive-connection")
      .data(connections)
      .enter()
      .append("line")
      .attr("x1", (d) => nodes[d.origin].x)
      .attr("y1", (d) => nodes[d.origin].y)
      .attr("x2", (d) => nodes[d.goal].x)
      .attr("y2", (d) => nodes[d.goal].y)
      .attr("class", "mlp-interactive-connection");
  }

  function drawNodes(svg, nodes, nodeSize) {
    svg
      .selectAll(".mlp-interactive-node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .append("circle")
      .attr("class", (d) =>
        d.label.includes("bias") ? "mlp-interactive-bias" : "mlp-interactive-node"
      )
      .attr("r", nodeSize);
  }

  function handleHiddenLayerCountChange(value) {
    const newCount = parseInt(value);
    setHiddenLayersCount(newCount);
    setHiddenLayersHeight((prevDepths) =>
      new Array(newCount).fill(2).map((depth, i) => prevDepths[i] || depth)
    );
  }

  const handleSliderChange = (setter) => (e) => setter(parseInt(e.target.value));

  return (
    <>
      <svg ref={svgRef} viewBox="0 0 1000 500" />

      <div className="mlp-interactive-setting-container">
        <Slider
          label="Input Layer Height"
          min={1}
          max={10}
          value={inputLayerHeight}
          onChange={handleSliderChange(setInputLayerHeight)}
        />
        <Slider
          label="Output Layer Height"
          min={1}
          max={10}
          value={outputLayerHeight}
          onChange={handleSliderChange(setOutputLayerHeight)}
        />
        <Slider
          label="Hidden Layers Count"
          min={0}
          max={5}
          value={hiddenLayersCount}
          onChange={(e) => handleHiddenLayerCountChange(e.target.value)}
        />
        {hiddenLayersHeight.map((depth, index) => (
          <Slider
            key={index}
            label={`H${index + 1} Height`}
            min={1}
            max={10}
            value={depth}
            onChange={(e) => {
              const newDepths = [...hiddenLayersHeight];
              newDepths[index] = Math.max(2, parseInt(e.target.value));
              setHiddenLayersHeight(newDepths);
            }}
          />
        ))}
      </div>
    </>
  );
}

function Slider({ label, min, max, value, onChange }) {
  return (
    <div className="interactive-slider-container">
      <label>
        {label}: {value}
        <input
          className="form-range"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
