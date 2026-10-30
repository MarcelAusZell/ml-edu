import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./introduction-card-neural-networks.scss";

export default function IntroductionCardNeuralNetworks() {
  const svg = useRef();
  const svgRef = useRef();
  const connectionsRef = useRef([]);

  const inputLayer = [
    { x: 10, y: 5, bias: true },
    { x: 10, y: 15 },
    { x: 10, y: 25 },
  ];

  const hiddenLayer1 = [
    { x: 30, y: 2, bias: true },
    { x: 30, y: 7 },
    { x: 30, y: 12 },
    { x: 30, y: 17 },
    { x: 30, y: 22 },
    { x: 30, y: 27 },
  ];

  const hiddenLayer2 = [
    { x: 70, y: 5, bias: true },
    { x: 70, y: 10 },
    { x: 70, y: 15 },
    { x: 70, y: 20 },
    { x: 70, y: 25 },
  ];

  const outputLayer = [
    { x: 90, y: 5 },
    { x: 90, y: 15 },
    { x: 90, y: 25 },
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
    drawNeuralNetwork();
    const intervalId = setInterval(updateConnections, 10000);

    return () => clearInterval(intervalId);
  }, []);

  function drawNeuralNetwork() {
    const allLayers = [inputLayer, hiddenLayer1, hiddenLayer2, outputLayer];

    // Draw connections
    let connections = [];
    for (let i = 0; i < allLayers.length - 1; i++) {
      const currentLayer = allLayers[i];
      const nextLayer = allLayers[i + 1];

      currentLayer.forEach((currentNode) => {
        nextLayer.forEach((nextNode) => {
          if (!nextNode.bias) {
            const line = svg.current
              .append("line")
              .attr("class", "introduction-card-neural-networks-connection")
              .attr("x1", currentNode.x)
              .attr("y1", currentNode.y)
              .attr("x2", nextNode.x)
              .attr("y2", nextNode.y);

            connections.push(line);
          }
        });
      });
    }
    connectionsRef.current = connections;

    const points = svg.current
      .selectAll(".neural-network-point")
      .data([...inputLayer, ...hiddenLayer1, ...hiddenLayer2, ...outputLayer]);

    points
      .enter()
      .append("circle")
      .attr("class", (d) =>
        d.bias
          ? "introduction-card-neural-networks-bias"
          : "introduction-card-neural-networks-point"
      )
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => 1.8);
  }

  function updateConnections() {
    connectionsRef.current.forEach((line) => {
      if (Math.random() < 0.2) {
        line.classed("introduction-card-neural-networks-blinking", true);
      } else {
        line.classed("introduction-card-neural-networks-blinking", false);
      }
    });
  }

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" />
      </div>
      <div className="centered-text">Neural Networks</div>
    </div>
  );
}
