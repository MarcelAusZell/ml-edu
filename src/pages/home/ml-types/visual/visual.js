import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([950, 50]);

  const states = [
    [
      { cx: 85, cy: -50, r: 35, c: "orange" },
      { cx: 250, cy: 1050, r: 35, c: "tomato" },
      { cx: 330, cy: -50, r: 35, c: "orange" },
      { cx: 320, cy: -50, r: 35, c: "orange" },
      { cx: 580, cy: 1050, r: 35, c: "tomato" },
      { cx: 660, cy: -50, r: 35, c: "orange" },
      { cx: 550, cy: -50, r: 35, c: "orange" },
      { cx: 830, cy: 1050, r: 35, c: "tomato" },
      { cx: 830, cy: 1050, r: 35, c: "tomato" },
    ],
    [
      {
        cx: 85,
        cy: 500,
        r: 35,
        c: "orange",
        label: "\\vec{x}_1",
        subLabel: "t_1 = \\text{orange}",
      },
      {
        cx: 250,
        cy: 615,
        r: 35,
        c: "tomato",
        label: "\\vec{x}_2",
        subLabel: "t_2 = \\text{tomato}",
      },
      {
        cx: 330,
        cy: 250,
        r: 35,
        c: "orange",
        label: "\\vec{x}_3",
        subLabel: "t_3 = \\text{orange}",
      },
      {
        cx: 320,
        cy: 460,
        r: 35,
        c: "orange",
        label: "\\vec{x}_4",
        subLabel: "t_4 = \\text{orange}",
      },
      {
        cx: 580,
        cy: 330,
        r: 35,
        c: "tomato",
        label: "\\vec{x}_5",
        subLabel: "t_5 = \\text{tomato}",
      },
      {
        cx: 660,
        cy: 580,
        r: 35,
        c: "orange",
        label: "\\vec{x}_6",
        subLabel: "t_6 = \\text{orange}",
      },
      {
        cx: 550,
        cy: 660,
        r: 35,
        c: "orange",
        label: "\\vec{x}_7",
        subLabel: "t_7 = \\text{orange}",
      },
      {
        cx: 830,
        cy: 200,
        r: 35,
        c: "tomato",
        label: "\\vec{x}_8",
        subLabel: "t_8 = \\text{tomato}",
      },
      {
        cx: 830,
        cy: 500,
        r: 35,
        c: "tomato",
        label: "\\vec{x}_9",
        subLabel: "t_9 = \\text{tomato}",
      },
    ],
    [
      {
        cx: 85,
        cy: 500,
        r: 65,
        c: "orange",
        label: "\\vec{x}_1",
        subLabel: "t_1 = \\text{3.92cm}",
      },
      {
        cx: 250,
        cy: 615,
        r: 43,
        c: "orange",
        label: "\\vec{x}_2",
        subLabel: "t_2 = \\text{2.64cm}",
      },
      {
        cx: 330,
        cy: 250,
        r: 18,
        c: "orange",
        label: "\\vec{x}_3",
        subLabel: "t_3 = \\text{1.10cm}",
      },
      {
        cx: 320,
        cy: 460,
        r: 66,
        c: "orange",
        label: "\\vec{x}_4",
        subLabel: "t_4 = \\text{4.02cm}",
      },
      {
        cx: 580,
        cy: 330,
        r: 46,
        c: "orange",
        label: "\\vec{x}_5",
        subLabel: "t_5 = \\text{2.83cm}",
      },
      {
        cx: 660,
        cy: 580,
        r: 16,
        c: "orange",
        label: "\\vec{x}_6",
        subLabel: "t_6 = \\text{1.04cm}",
      },
      {
        cx: 550,
        cy: 660,
        r: 63,
        c: "orange",
        label: "\\vec{x}_7",
        subLabel: "t_7 = \\text{3.80cm}",
      },
      {
        cx: 830,
        cy: 200,
        r: 21,
        c: "orange",
        label: "\\vec{x}_8",
        subLabel: "t_8 = \\text{1.31cm}",
      },
      {
        cx: 830,
        cy: 500,
        r: 76,
        c: "orange",
        label: "\\vec{x}_9",
        subLabel: "t_9 = \\text{4.67cm}",
      },
    ],
    [
      {
        cx: 85,
        cy: 500,
        r: 65,
        c: "orange",
        label: "\\vec{x}_1",
      },
      {
        cx: 250,
        cy: 615,
        r: 43,
        c: "orange",
        label: "\\vec{x}_2",
      },
      {
        cx: 330,
        cy: 250,
        r: 18,
        c: "orange",
        label: "\\vec{x}_3",
      },
      {
        cx: 320,
        cy: 460,
        r: 66,
        c: "orange",
        label: "\\vec{x}_4",
      },
      {
        cx: 580,
        cy: 330,
        r: 46,
        c: "orange",
        label: "\\vec{x}_5",
      },
      {
        cx: 660,
        cy: 580,
        r: 16,
        c: "orange",
        label: "\\vec{x}_6",
      },
      {
        cx: 550,
        cy: 660,
        r: 63,
        c: "orange",
        label: "\\vec{x}_7",
      },
      {
        cx: 830,
        cy: 200,
        r: 21,
        c: "orange",
        label: "\\vec{x}_8",
      },
      {
        cx: 830,
        cy: 500,
        r: 76,
        c: "orange",
        label: "\\vec{x}_9",
      },
    ],
    [
      { cx: 260, cy: 591, r: 65, c: "orange", label: "\\vec{x}_1" },
      { cx: 480, cy: 350, r: 43, c: "orange", label: "\\vec{x}_2" },
      { cx: 333, cy: 250, r: 18, c: "orange", label: "\\vec{x}_3" },
      { cx: 316, cy: 466, r: 66, c: "orange", label: "\\vec{x}_4" },
      { cx: 583, cy: 333, r: 46, c: "orange", label: "\\vec{x}_5" },
      { cx: 275, cy: 258, r: 16, c: "orange", label: "\\vec{x}_6" },
      { cx: 550, cy: 433, r: 63, c: "orange", label: "\\vec{x}_7" },
      { cx: 300, cy: 216, r: 21, c: "orange", label: "\\vec{x}_8" },
      { cx: 416, cy: 583, r: 76, c: "orange", label: "\\vec{x}_9" },
    ],
    [
      { cx: xScale(1.5), cy: yScale(0), r: 18, c: "orange", label: "x_i" },
      { cx: xScale(2), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(2.3), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(4.6), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(4.7), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(5.3), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(7), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(7.8), cy: yScale(0), r: 18, c: "orange" },
      { cx: xScale(8.5), cy: yScale(0), r: 18, c: "orange" },
    ],
    [
      { cx: xScale(1.5), cy: yScale(8), r: 18, c: "orange", label: "\\vec{x}_i" },
      { cx: xScale(2), cy: yScale(1.3), r: 18, c: "orange" },
      { cx: xScale(2.3), cy: yScale(2), r: 18, c: "orange" },
      { cx: xScale(4.6), cy: yScale(6), r: 18, c: "orange" },
      { cx: xScale(4.7), cy: yScale(6.5), r: 18, c: "orange" },
      { cx: xScale(5.3), cy: yScale(9), r: 18, c: "orange" },
      { cx: xScale(7), cy: yScale(4), r: 18, c: "orange" },
      { cx: xScale(7.8), cy: yScale(5.3), r: 18, c: "orange" },
      { cx: xScale(8.5), cy: yScale(1), r: 18, c: "orange" },
    ],
    [
      { cx: xScale(1.5), cy: yScale(8), r: 18, c: "orange", label: "\\vec{x}_i" },
      { cx: xScale(2), cy: yScale(1.3), r: 18, c: "steelblue" },
      { cx: xScale(2.3), cy: yScale(2), r: 18, c: "orange" },
      { cx: xScale(4.6), cy: yScale(6), r: 18, c: "orange" },
      { cx: xScale(4.7), cy: yScale(6.5), r: 18, c: "steelblue" },
      { cx: xScale(5.3), cy: yScale(9), r: 18, c: "orange" },
      { cx: xScale(7), cy: yScale(4), r: 18, c: "steelblue" },
      { cx: xScale(7.8), cy: yScale(5.3), r: 18, c: "orange" },
      { cx: xScale(8.5), cy: yScale(1), r: 18, c: "steelblue" },
    ],
  ];

  const actions = useRef([
    {
      start: 1,
      end: 1,
      action: () => {
        updateCircle(states[0]);
        updateCircle(states[1]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updateCircle(states[2]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        updateCircle(states[3]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        updateCircle(states[4]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 7,
      action: () => {},
      remove: () => {
        d3.selectAll(".ml-notation-x-axis", ".ml-notation-y-axis").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        updateCircle(states[5]);
        latexOntoSvg(svg.current, "x", xScale(5), yScale(-0.2), "ml-notation-x-label", "", 25);
      },
      remove: () => {
        d3.selectAll(".ml-notation-x-label").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 7,
      action: () => {
        updateArrow({ x: xScale(0), y: yScale(0) }, { x: xScale(10), y: yScale(0) }, "ml-notation-x-axis");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 7,
      action: () => {},
      remove: () => {
        updateArrow({ x: xScale(0), y: yScale(0) }, { x: xScale(0), y: yScale(0) }, "ml-notation-y-axis");
      },
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        updateCircle(states[6]);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 7,
      action: () => {
        updateArrow({ x: xScale(0), y: yScale(0) }, { x: xScale(0), y: yScale(10) }, "ml-notation-y-axis");
        latexOntoSvg(svg.current, "x_1", xScale(5), yScale(-0.2), "ml-notation-x1-label", "", 25);
        latexOntoSvg(svg.current, "x_2", xScale(-0.3), yScale(5), "ml-notation-x2-label", "", 25);
      },
      remove: () => {
        d3.selectAll(".ml-notation-x1-label").remove();
        d3.selectAll(".ml-notation-x2-label").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        updateCircle(states[7]);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  function updateCircle(data) {
    d3.select(svgRef.current)
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy)
            .attr("r", (d) => d.r)
            .style("fill", (d) => d.c),
        (update) =>
          update
            .transition()
            .duration(300)
            .attr("cx", (d) => d.cx)
            .attr("cy", (d) => d.cy)
            .attr("r", (d) => d.r)
            .style("fill", (d) => d.c),
        (exit) => exit.remove()
      );

    d3.selectAll(".label, .subLabel").remove();

    data.forEach((d) => {
      if (d.label) {
        latexOntoSvg(svg.current, d.label, d.cx, d.cy - d.r - 25, "label", "", 25);
      }
      if (d.subLabel) {
        latexOntoSvg(svg.current, d.subLabel, d.cx, d.cy + d.r + 20, "subLabel", "", 15);
      }
    });
  }

  function updateArrow(start, end, className) {
    d3.select(svgRef.current)
      .selectAll(`.${className}`)
      .data([{ start, end }])
      .join(
        (enter) => {
          const line = enter
            .append("line")
            .attr("x1", (d) => d.start.x)
            .attr("y1", (d) => d.start.y)
            .attr("x2", (d) => d.start.x)
            .attr("y2", (d) => d.start.y)
            .attr("class", className)
            .lower(); 
          line.transition()
            .duration(300)
            .attr("x2", (d) => d.end.x)
            .attr("y2", (d) => d.end.y);

          return line;
        },
        (update) =>
          update
            .transition()
            .duration(300)
            .attr("x1", (d) => d.start.x)
            .attr("y1", (d) => d.start.y)
            .attr("x2", (d) => d.end.x)
            .attr("y2", (d) => d.end.y),
        (exit) => exit.remove()
      );
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
