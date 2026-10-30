import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([-3, 13]).range([100, 900]);
const yScale = d3.scaleLinear().domain([0, 0.5]).range([900, 100]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axisRef = useRef();
  const pathRef = useRef([]);

  const dataPoints = [
    -2, -1, 0, 0.75, 1, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 4, 4.5, 5, 6, 7, 9, 9.5, 10, 10.25, 10.5, 10.75,
    11, 11.25,
  ];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 5,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 900, 900, axisRef);
        drawPoints(axisRef.current);
      },
      remove: () => {
        d3.selectAll(axisRef.current).remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        plotNormalDistribution(4.8, 16.8);
        plotPath(axisRef.current);
        updateHistogram(0.01);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updateHistogram(0.01);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 5,
      action: () => {
        plotMultiModalDenseDistribution();
        plotPath(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        updateHistogram(1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        updateHistogram(4);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        updateHistogram(0.25);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 6,
      action: () => {
        createFirstGrid(svg);
        createSecondGrid(svg);
      },
      remove: () => {
        svg.current.selectAll(".grid-1").remove();
        svg.current.selectAll(".grid-2").remove();
      },
      called: false,
    },
  ]).current;

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-((x - mean) ** 2) / (2 * variance));
  }

  function plotNormalDistribution(mean, variance) {
    const x = d3.range(-3, 12.9, 0.01);
    const y = x.map((d) => univariateGaussian(d, mean, variance));

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
  }

  function plotMultiModalDenseDistribution() {
    const mean1 = 2.5;
    const variance1 = 4;
    const mean2 = 10.5;
    const variance2 = 1;

    const weight1 = 0.8;
    const weight2 = 0.4;

    const pdf = (x) => {
      return weight1 * univariateGaussian(x, mean1, variance1) + weight2 * univariateGaussian(x, mean2, variance2);
    };

    const x = d3.range(-3, 12.9, 0.01);
    const y = x.map((d) => pdf(d));

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const pathData = line(x);
    pathRef.current.push({ data: pathData });
  }

  function plotPath(g) {
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      g.selectAll(".media-2-distribution-path")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "media-2-distribution-path"),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .ease(d3.easeBackOut)
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function drawPoints(g) {
    g.selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "histogram-visual-data-point")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d) => yScale(0))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", 15);
  }

  function updateHistogram(binSize) {
    const histogram = d3
      .histogram()
      .domain([xScale.domain()[0], xScale.domain()[1]])
      .thresholds(d3.range(xScale.domain()[0], xScale.domain()[1], binSize));
    const bins = histogram(dataPoints);
    const bar = axisRef.current.selectAll(".histogram-bar").data(bins);
    const N = dataPoints.length;
    const barGap = 2;

    const barEnter = bar
      .enter()
      .append("rect")
      .attr("class", "histogram-bar")
      .attr("x", (d) => Math.abs(xScale(d.x0) + barGap))
      .attr("y", Math.abs(900))
      .attr("width", (d) => Math.abs(Math.max(0, xScale(d.x1) - xScale(d.x0) - barGap)))
      .attr("height", 0);

    barEnter
      .merge(bar)
      .transition()
      .ease(d3.easeExpOut)
      .duration(300)
      .attr("x", (d) => Math.abs(xScale(d.x0) + barGap))
      .attr("y", (d) => Math.abs(yScale(d.length / N)))
      .attr("width", (d) => Math.abs(Math.max(0, xScale(d.x1) - xScale(d.x0) - barGap)))
      .attr("height", (d) => Math.abs(900 - yScale(d.length / N)));

    // Remove bars that are no longer needed
    bar.exit().remove();
  }

  function createFirstGrid(
    svg,
    xOffset = 80,
    yOffset = 750,
    xDomain = [0, 3],
    yDomain = [0, 10],
    gridWidth = 350,
    gridHeight = 350
  ) {
    const xScale = d3.scaleLinear().domain(xDomain).range([0, gridWidth]);
    const group = svg.current.append("g").attr("class", "grid-1");

    group
      .append("g")
      .attr("class", "visual-x-axis-D1")
      .attr("transform", `translate(${xOffset},${yOffset})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(3)
          .tickFormat(() => "")
      )
      .style("stroke-width", 5);

    group
      .append("text")
      .attr("transform", `translate(${xOffset + gridWidth / 2},${yOffset + 40})`)
      .style("text-anchor", "middle")
      .attr("class", "visual-text-label")
      .text("D = 1");

    group
      .append("text")
      .attr("transform", `translate(${xOffset + gridWidth / 2},${yOffset + 70})`)
      .style("text-anchor", "middle")
      .attr("class", "visual-text-label")
      .text("required bins: 3")
      .attr("opacity", 0.4);
  }

  function createSecondGrid(
    svg,
    xOffset = 550,
    yOffset = 750,
    xDomain = [0, 3],
    yDomain = [0, 3],
    gridWidth = 350,
    gridHeight = 350
  ) {
    const xScale = d3.scaleLinear().domain(xDomain).range([0, gridWidth]);
    const yScale = d3.scaleLinear().domain(yDomain).range([gridHeight, 0]);

    const group = svg.current.append("g").attr("class", "grid-2");

    group
      .append("g")
      .attr("class", "visual-x-axis-D2")
      .attr("transform", `translate(${xOffset},${yOffset})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(3)
          .tickFormat(() => "")
      )
      .style("stroke-width", 5);

    group
      .append("g")
      .attr("class", "visual-y-axis-D")
      .attr("transform", `translate(${xOffset},${yOffset - gridHeight})`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(3)
          .tickFormat(() => "")
      )
      .style("stroke-width", 5);

    group
      .append("g")
      .attr("class", "grid-2")
      .attr("transform", `translate(${xOffset},${yOffset})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(3)
          .tickSize(-gridHeight)
          .tickFormat(() => "")
      )
      .style("stroke-width", 2)
      .style("opacity", 0.5);

    group
      .append("g")
      .attr("class", "grid-2")
      .attr("transform", `translate(${xOffset},${yOffset - gridHeight})`)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(3)
          .tickSize(-gridWidth)
          .tickFormat(() => "")
      )
      .style("stroke-width", 2)
      .style("opacity", 0.5);

    group
      .append("text")
      .attr("transform", `translate(${xOffset + gridWidth / 2},${yOffset + 40})`)
      .style("text-anchor", "middle")
      .attr("class", "visual-text-label")
      .text("D = 2");

    group
      .append("text")
      .attr("transform", `translate(${xOffset + gridWidth / 2},${yOffset + 70})`)
      .style("text-anchor", "middle")
      .text("required bins: 9")
      .attr("class", "visual-text-label")
      .attr("opacity", 0.4);
  }

  function drawCoordSystem(svgRef, xScale, yScale, xTransform, yTransform, coordSystemRef, showAxis = true) {
    const svg = d3.select(svgRef.current);
    const coordSystem = svg.append("g").attr("class", "coord-system");
    coordSystemRef.current = coordSystem;

    if (showAxis) {
      coordSystem
        .append("g")
        .attr("transform", `translate(0,${xTransform})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat((d) => "")
            .tickSize(0)
        )
        .attr("stroke-width", 5)
        .attr("stroke-opacity", 0.5)
        .style("font-size", "20px");
    }
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
