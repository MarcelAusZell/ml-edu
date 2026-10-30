import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./visual.scss";

const xScale = d3.scaleLinear().domain([0, 20]).range([100, 900]);
const yScale = d3.scaleLinear().domain([0, 0.5]).range([900, 100]);

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  const axisRef = useRef();
  const lineRef = useRef([]);
  const pathRef = useRef([]);
  const kernelRefs = [useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([]), useRef([])];

  const dataPoints = [4, 7.5, 8, 8.5, 9, 10, 14, 16, 18];

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 12,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 900, 900, axisRef);
        drawPoints(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 12,
      action: () => {
        plotGausssianKernels();
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
      },
      remove: () => {
        d3.selectAll(".kde-visual-gaussian-path").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        for (let i = 0; i <= 8; i++) {
          plotPathGaussianKernels(axisRef.current, i, i === 0 ? 1 : undefined);
        }
      },
      remove: () => {
        d3.selectAll(".kde-visual-vertical-line").remove();
      },
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        plotPathGaussianKernels(axisRef.current, 0, 0.1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 3,
      end: 3,
      action: () => {
        plotVerticalLine(dataPoints[0], dataPoints[0]);
        plotPathVerticalLine(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        plotVerticalLine(dataPoints[0] + 1, dataPoints[0]);
        plotPathVerticalLine(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        plotVerticalLine(dataPoints[0] + 2, dataPoints[0]);
        plotPathVerticalLine(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 6,
      end: 7,
      action: () => {
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index, 1);
        });
        plotPointOnKernels(dataPoints[0] + 2);
      },
      remove: () => {
        d3.selectAll(".kde-visual-point-on-kernel").remove();
      },
      called: false,
    },
    {
      start: 7,
      end: 7,
      action: () => {
        plotKernelDensityPointEstimate(dataPoints[0] + 2);
      },
      remove: () => {
        d3.selectAll(".kde-visual-point-estimate").remove();
      },
      called: false,
    },

    {
      start: 8,
      end: 8,
      action: () => {
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
        plotAnimatedKernelDensityEstimation();
      },
      remove: () => {
        d3.selectAll(".kde-visual-point-on-kernel-animated").remove();
        d3.selectAll(".kde-visual-point-estimate-animated").remove();
        if (animatedKernelInterval) {
          clearInterval(animatedKernelInterval);
        }
      },
      called: false,
    },
    {
      start: 9,
      end: 12,
      action: () => {},
      remove: () => {
        d3.selectAll(".kde-visual-kde-path").remove();
      },
      called: false,
    },
    {
      start: 9,
      end: 9,
      action: () => {
        plotGausssianKernels(1);
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
        plotKernelDensityEstimation(1);
        plotPathKDE(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 10,
      end: 10,
      action: () => {
        plotGausssianKernels(5);
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
        plotKernelDensityEstimation(5);
        plotPathKDE(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 11,
      end: 11,
      action: () => {
        plotGausssianKernels(0.05);
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
        plotKernelDensityEstimation(0.05);
        plotPathKDE(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 12,
      end: 12,
      action: () => {
        plotTriangularKernels(2);
        kernelRefs.forEach((_, index) => {
          plotPathGaussianKernels(axisRef.current, index);
        });
        plotKernelDensityEstimationTriangular(2);
        plotPathKDE(axisRef.current);
      },
      remove: () => {},
      called: false,
    },
  ]).current;

  let animatedKernelInterval = null;

  function plotAnimatedKernelDensityEstimation() {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.05);
    let yValue = 0;
    let i = 0;
    animatedKernelInterval = setInterval(() => {
      if (i >= x.length) {
        clearInterval(animatedKernelInterval);
        return;
      }
      const xValue = x[i];
      dataPoints.forEach((d, index) => {
        axisRef.current
          .append("circle")
          .attr("cx", xScale(xValue))
          .attr("cy", yScale(univariateGaussian(xValue, d, 1)))
          .attr("r", 14)
          .attr("class", "kde-visual-point-on-kernel-animated")
          .transition()
          .duration(20)
          .remove();

        yValue += univariateGaussian(xValue, d, 1);
      });
      const y = yValue / dataPoints.length;
      axisRef.current
        .append("circle")
        .attr("cx", xScale(xValue))
        .attr("cy", yScale(y))
        .attr("r", 5)
        .attr("class", "kde-visual-point-estimate-animated");
      yValue = 0;
      i++;
    }, 10);
  }

  function plotVerticalLine(xValue, mean) {
    const x = xValue;
    const y1 = univariateGaussian(x, mean, 1);
    const y2 = 0;
    const line = d3
      .line()
      .x((d, i) => xScale(x))
      .y((d, i) => (i === 0 ? yScale(y1) : yScale(y2)));

    const pathData = line([0, 1]);
    lineRef.current.push({ data: pathData });
  }

  function plotPointOnKernels(xValue) {
    dataPoints.forEach((d, index) => {
      axisRef.current
        .append("circle")
        .attr("cx", xScale(xValue))
        .attr("cy", yScale(univariateGaussian(xValue, d, 1)))
        .attr("r", 14)
        .attr("class", "kde-visual-point-on-kernel");
    });
  }

  function plotKernelDensityPointEstimate(xValue) {
    let yValue = 0;
    dataPoints.forEach((d, index) => {
      yValue += univariateGaussian(xValue, d, 1);
    });
    const y = yValue / dataPoints.length;
    axisRef.current.append("circle").attr("cx", xScale(xValue)).attr("cy", yScale(y)).attr("r", 10).attr("class", "kde-visual-point-estimate");
  }

  function plotGausssianKernels(bandwidth = 1) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    dataPoints.forEach((d, index) => {
      const y = x.map((x) => univariateGaussian(x, d, bandwidth));
      const line = d3
        .line()
        .x((d, i) => xScale(x[i]))
        .y((d, i) => yScale(y[i]));

      const pathData = line(y);
      kernelRefs[index].current.push({ data: pathData });
    });
  }

  function plotTriangularKernels(bandwidth = 1) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    dataPoints.forEach((d, index) => {
      const y = x.map((x) => univariateTriangle(x, d, bandwidth));
      const line = d3
        .line()
        .x((d, i) => xScale(x[i]))
        .y((d, i) => yScale(y[i]));

      const pathData = line(y);
      kernelRefs[index].current.push({ data: pathData });
    });
  }

  function plotPathGaussianKernels(g, index, opacity = 0.1) {
    if (kernelRefs[index].current.length > 0) {
      const lastPath = kernelRefs[index].current[kernelRefs[index].current.length - 1];
      g.selectAll(".kde-visual-gaussian-path-" + index)
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("opacity", opacity)
              .attr("class", (d) => "kde-visual-gaussian-path kde-visual-gaussian-path-" + index),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(400)
                .attr("d", (d) => d.data)
                .attr("opacity", opacity)
            )
        );
    }
  }

  function univariateGaussian(x, mean, variance) {
    return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(-((x - mean) ** 2) / (2 * variance));
  }

  function plotPathVerticalLine(g) {
    if (lineRef.current.length > 0) {
      const lastPath = lineRef.current[lineRef.current.length - 1];
      g.selectAll(".kde-visual-vertical-line")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "kde-visual-vertical-line"),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(400)
                .attr("d", (d) => d.data)
            )
        );
    }
  }

  function plotPathKDE(g) {
    if (pathRef.current.length > 0) {
      const lastPath = pathRef.current[pathRef.current.length - 1];
      g.selectAll(".kde-visual-kde-path")
        .data([lastPath])
        .join(
          (enter) =>
            enter
              .append("path")
              .attr("d", (d) => d.data)
              .attr("class", (d) => "kde-visual-kde-path"),
          (update) =>
            update.call((update) =>
              update
                .transition()
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
      .attr("class", "kde-visual-data-point")
      .attr("cx", (d) => xScale(d))
      .attr("cy", (d) => yScale(0))
      .attr("r", 0)
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .attr("r", 14);
  }

  function plotKernelDensityEstimation(bandwidth) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map((x) => {
      let yValue = 0;
      dataPoints.forEach((d, index) => {
        yValue += univariateGaussian(x, d, bandwidth);
      });
      return yValue / dataPoints.length;
    });

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const pathData = line(y);
    pathRef.current.push({ data: pathData });
  }

  function univariateTriangle(x, mean, bandwidth) {
    return Math.abs((x - mean) / bandwidth) <= 1 ? 1 - Math.abs((x - mean) / bandwidth) : 0;
  }

  function plotKernelDensityEstimationTriangular(bandwidth) {
    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map((x) => {
      let yValue = 0;
      dataPoints.forEach((d, index) => {
        yValue += univariateTriangle(x, d, bandwidth);
      });
      return yValue / dataPoints.length;
    });

    const line = d3
      .line()
      .x((d, i) => xScale(x[i]))
      .y((d, i) => yScale(y[i]));

    const pathData = line(y);
    pathRef.current.push({ data: pathData });
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
