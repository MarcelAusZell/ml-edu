import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { firstThree, secondThree } from "../../../../assets/handwritten-digits";
import { zero, seven, five } from "../../../../assets/handwritten-digits";
import { testEight, testSeven, testSix } from "../../../../assets/handwritten-digits";
import latexOntoSvg from "../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const mlVsAiVsDsData = [
    { name: "AI", radius: 350, x: 500, y: 500, xIntro: 500, yIntro: -500, className: "circle-ai" },
    { name: "ML", radius: 250, x: 500, y: 600, xIntro: -500, yIntro: 600, className: "circle-ml" },
    { name: "DL", radius: 150, x: 500, y: 700, xIntro: 500, yIntro: -500, className: "circle-dl" },
    {
      name: "DS",
      radius: 225,
      x: 775,
      y: 500,
      xIntro: 1500,
      yIntro: 500,
      className: "circle-ds",
    },
  ];

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        displayAiVsMLVsDsCircles(mlVsAiVsDsData, "ml-ai-ds");
      },
      remove: () => {
        d3.selectAll(".ml-ai-ds").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 3,
      action: () => {
        digitGridBackground("digit-grid-background");
      },
      remove: () => {
        d3.selectAll(".digit-grid-background").remove();

        d3.selectAll(".digit-three").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updateDigitThree(firstThree);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        updateDigitThree(secondThree);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 6,
      action: () => {
        drawMLStep1();
      },
      remove: () => {
        d3.selectAll(".ml-steps-1").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 6,
      action: () => {
        drawMLStep2();
      },
      remove: () => {
        d3.selectAll(".ml-steps-2").remove();
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        drawMLStep3();
      },
      remove: () => {
        d3.selectAll(".ml-steps-3").remove();
      },
      called: false,
    },
  ]).current;

  function drawDebugGrid() {
    for (let i = 0; i < 1000; i += 100) {
      svg.current
        .append("line")
        .attr("x1", i)
        .attr("y1", 0)
        .attr("x2", i)
        .attr("y2", 1000)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    }

    for (let i = 0; i < 1000; i += 100) {
      svg.current
        .append("line")
        .attr("x1", 0)
        .attr("y1", i)
        .attr("x2", 1000)
        .attr("y2", i)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    }
  }

  function displayAiVsMLVsDsCircles(data, className) {
    const mlVsAiVsDs = svg.current.append("g").attr("class", className);

    const circles = mlVsAiVsDs
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => d.xIntro)
            .attr("cy", (d) => d.yIntro)
            .attr("r", 0)
            .attr("class", (d) => d.className)
            .transition()
            .ease(d3.easeBackOut)
            .duration(750)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => d.radius),
        (update) =>
          update
            .transition()
            .duration(750)
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", (d) => d.radius),
        (exit) => exit.transition().duration(500).attr("r", 0).remove()
      );

    const texts = mlVsAiVsDs
      .selectAll("text")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("x", (d) => d.xIntro)
            .attr("y", (d) => d.yIntro)
            .attr("class", "ml-ai-ds-text")
            .attr("opacity", 0)
            .text((d) => d.name)
            .transition()
            .ease(d3.easeBackOut)
            .duration(750)
            .attr("x", (d) => d.x)
            .attr("y", (d, i) =>
              i == 0 ? d.y - 250 : i == 1 ? d.y - 150 : i == 2 ? d.y - 40 : d.y - 100
            )
            .attr("opacity", 0.5)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle"),
        (update) =>
          update
            .transition()
            .duration(750)
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("opacity", 0.5)
            .text((d) => d.name)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle"),
        (exit) => exit.transition().duration(500).attr("opacity", 0).remove()
      );
  }

  function digitGridBackground(className) {
    const gridData = [];
    const gridSize = 28;
    const rectSize = 20;
    const gapSize = 5;
    const totalGridSize = gridSize * (rectSize + gapSize) - gapSize;
    const offsetX = (1000 - totalGridSize) / 2;
    const offsetY = (1000 - totalGridSize) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        gridData.push({ x: i, y: j });
      }
    }

    const digitGrid = svg.current.append("g").attr("class", className);

    digitGrid
      .selectAll("rect")
      .data(gridData)
      .enter()
      .append("rect")
      .attr("class", "background-rect")
      .attr("x", (d) => offsetX + d.x * (rectSize + gapSize))
      .attr("y", (d) => offsetY + d.y * (rectSize + gapSize))
      .attr("width", rectSize)
      .attr("height", rectSize);
  }

  function updateDigitThree(data) {
    const gridSize = 28;
    const rectSize = 20;
    const gapSize = 5;
    const totalGridSize = gridSize * (rectSize + gapSize) - gapSize;
    const offsetX = (1000 - totalGridSize) / 2;
    const offsetY = (1000 - totalGridSize) / 2;

    const threeData = data.map((d) => ({ x: d[0], y: d[1], brightness: d[2] }));
    const threeDataGroup = svg.current.select(".digit-three");

    if (threeDataGroup.empty()) {
      svg.current.append("g").attr("class", "digit-three");
    }

    svg.current
      .select(".digit-three")
      .selectAll("rect")
      .data(threeData, (d) => `${d.x}-${d.y}`)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "number-rect")
            .attr("x", (d) => offsetX + d.x * (rectSize + gapSize))
            .attr("y", (d) => offsetY + d.y * (rectSize + gapSize))
            .attr("width", rectSize)
            .attr("height", rectSize)
            .attr("fill-opacity", (d) => d.brightness / 255),
        (update) =>
          update

            .attr("x", (d) => offsetX + d.x * (rectSize + gapSize))
            .attr("y", (d) => offsetY + d.y * (rectSize + gapSize))
            .attr("width", rectSize)
            .attr("height", rectSize)
            .attr("fill-opacity", (d) => d.brightness / 255),
        (exit) => exit.remove()
      );
  }

  function drawMLStep1() {
    const rectSize = 6.6;
    const gapSize = 1.6;
    const gridSize = Math.sqrt(784);
    const gridWidth = gridSize * (rectSize + gapSize);
    const xOffsetBase = 30;
    const yOffsetBase = 100;

    const mlStep1 = svg.current.append("g").attr("class", "ml-steps-1");

    for (let index = 0; index < 3; index++) {
      const xOffset = xOffsetBase + index * (gridWidth + gapSize);
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          mlStep1
            .append("rect")
            .attr("class", "background-rect")
            .attr(
              "x",
              i * (rectSize + gapSize) + xOffset + index * 10 + (index === 2 ? gridWidth : 0)
            )
            .attr("y", j * (rectSize + gapSize) + yOffsetBase)
            .attr("width", 0)
            .attr("height", 0)
            .attr("width", rectSize)
            .attr("height", rectSize);
        }
      }
    }
    [zero, seven, five].forEach((number, index) => {
      number.forEach(([x, y, brightness]) => {
        mlStep1
          .append("rect")
          .attr("class", "number-rect")
          .attr(
            "x",
            x * (rectSize + gapSize) +
              xOffsetBase +
              index * (gridWidth + gapSize) +
              index * 10 +
              (index === 2 ? gridWidth : 0)
          )
          .attr("y", y * (rectSize + gapSize) + yOffsetBase)
          .attr("width", 0)
          .attr("height", 0)
          .attr("width", rectSize)
          .attr("height", rectSize)
          .attr("fill-opacity", brightness / 255);
      });
    });

    latexOntoSvg(svg.current, "\\dots", 615, 210, "ml-steps-1", "", 60);

    // Training vectors
    latexOntoSvg(svg.current, "\\vec{x}_1", 145, 75, "ml-steps-1", "", 25, "dodgerblue");
    latexOntoSvg(svg.current, "\\vec{x}_2", 380, 75, "ml-steps-1", "", 25, "dodgerblue");
    latexOntoSvg(svg.current, "\\vec{x}_3", 860, 75, "ml-steps-1", "", 25, "dodgerblue");
    // Training labels
    latexOntoSvg(svg.current, "\\vec{t}_1 = [0]", 145, 345, "ml-steps-1", "", 25, "orange");
    latexOntoSvg(svg.current, "\\vec{t}_2 = [7]", 380, 345, "ml-steps-1", "", 25, "orange");
    latexOntoSvg(svg.current, "\\vec{t}_N = [5]", 860, 345, "ml-steps-1", "", 25, "orange");
  }

  function drawMLStep2() {
    const mlStep2 = svg.current.append("g").attr("class", "ml-steps-2");

    latexOntoSvg(svg.current, "\\vec{y}(\\vec{x})", 500, 510, "ml-steps-2", "", 40, "tomato");

    const drawArrow = (x1, y1, x2, y2) => {
      mlStep2
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("class", "arrowhead-ml-steps-2");

      mlStep2
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke-width", 4)
        .attr("class", "arrow-ml-steps-2")
        .attr("marker-end", "url(#arrowhead)");
    };

    drawArrow(500, 375, 500, 460);

    mlStep2
      .append("text")
      .text("Training phase")
      .attr("x", 600)
      .attr("y", 415)
      .attr("class", "ml-steps-2-text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("font-size", 25);
  }

  function drawMLStep3() {
    const rectSize = 6.6;
    const gapSize = 1.6;
    const gridSize = Math.sqrt(784);
    const gridWidth = gridSize * (rectSize + gapSize);
    const xOffsetBase = 30;
    const yOffsetBase = 700;

    const mlStep3 = svg.current.append("g").attr("class", "ml-steps-3");

    for (let index = 0; index < 3; index++) {
      const xOffset = xOffsetBase + index * (gridWidth + gapSize);
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          mlStep3
            .append("rect")
            .attr("class", "background-rect")
            .attr(
              "x",
              i * (rectSize + gapSize) + xOffset + index * 10 + (index === 2 ? gridWidth : 0)
            )
            .attr("y", j * (rectSize + gapSize) + yOffsetBase)
            .attr("width", 0)
            .attr("height", 0)
            .attr("width", rectSize)
            .attr("height", rectSize);
        }
      }
    }
    [testEight, testSeven, testSix].forEach((number, index) => {
      number.forEach(([x, y, brightness]) => {
        mlStep3
          .append("rect")
          .attr("class", "number-rect")
          .attr(
            "x",
            x * (rectSize + gapSize) +
              xOffsetBase +
              index * (gridWidth + gapSize) +
              index * 10 +
              (index === 2 ? gridWidth : 0)
          )
          .attr("y", y * (rectSize + gapSize) + yOffsetBase)
          .attr("width", 0)
          .attr("height", 0)
          .attr("width", rectSize)
          .attr("height", rectSize)
          .attr("fill-opacity", brightness / 255);
      });
    });

    const drawArrow = (x1, y1, x2, y2) => {
      mlStep3
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 5)
        .attr("refY", 5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .attr("class", "arrowhead-ml-steps-2");

      mlStep3
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke-width", 4)
        .attr("class", "arrow-ml-steps-2")
        .attr("marker-end", "url(#arrowhead)");
    };

    drawArrow(500, 560, 500, 645);

    mlStep3
      .append("text")
      .text("Testing phase")
      .attr("x", 600)
      .attr("y", 600)
      .attr("class", "ml-steps-2-text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("font-size", 25);

    latexOntoSvg(svg.current, "\\dots", 615, 815, "ml-steps-3", "", 60);

    // Training vectors
    latexOntoSvg(
      svg.current,
      "\\vec{x}_{1, \\text{test}}",
      145,
      675,
      "ml-steps-3",
      "",
      25,
      "darkkhaki"
    );
    latexOntoSvg(
      svg.current,
      "\\vec{x}_{2, \\text{test}}",
      380,
      675,
      "ml-steps-3",
      "",
      25,
      "darkkhaki"
    );
    latexOntoSvg(
      svg.current,
      "\\vec{x}_{K, \\text{test}}",
      860,
      675,
      "ml-steps-3",
      "",
      25,
      "darkkhaki"
    );
    // Training labels
    latexOntoSvg(svg.current, "\\vec{y}_1 = [8]", 145, 945, "ml-steps-3", "", 25, "mediumseagreen");
    latexOntoSvg(svg.current, "\\vec{y}_2 = [7]", 380, 945, "ml-steps-3", "", 25, "mediumseagreen");
    latexOntoSvg(svg.current, "\\vec{y}_K = [6]", 860, 945, "ml-steps-3", "", 25, "mediumseagreen");
  }

  useEffect(() => {
    if (currentStep === null) {
      d3.select(svgRef.current)
        .selectAll("*")
        .transition()
        .duration(200)
        .style("opacity", 0)
        .remove();
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
