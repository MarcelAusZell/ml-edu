import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import "./visual.scss";

export default function Visual({ currentStep, scrollProgress }) {
  const svgRef = useRef();
  const svg = useRef();
  
  const coordSystemRef = useRef();
  const xScale = d3.scaleLinear().domain([-2, 2]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([-2, 4]).range([750, 50]);
  const xScaleGDvsSGD = d3.scaleLinear().domain([-2, 2]).range([50, 950]);
  const yScaleGDvsSGD = d3.scaleLinear().domain([-2, 2]).range([750, 50]);

  const surfaceFunction = (x, y) => 2 * x ** 2 - 1.05 * x ** 4 + x ** 6 / 6 + x * y + y ** 2;

  const GradSurfaceFunction = (X, Y) => {
    const grad_x = 4 * X - 4.2 * X ** 3 + X ** 5 + Y;
    const grad_y = X + 2 * Y;
    return [grad_x, grad_y];
  };

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

  useEffect(() => {
    svg.current = d3.select(svgRef.current);
  }, []);

  const actions = useRef([
    {
      start: 1,
      end: 10,
      action: () => {
        drawCoordSystem(svgRef, xScale, yScale, 750, 50, coordSystemRef);
        drawNNStep([inputLayerPointsLegend, hiddenLayerPointsLegend, outputLayerPointsLegend]);
        drawErrorFunctionStep();
        drawCalculateGradientsStep();
        drawUpdateWeightsStep();
        changeOpacityOfSteps(1, 1, 1, 1);
      },
      remove: () => {},
      called: false,
    },
    {
      start: 1,
      end: 2,
      action: () => {},
      remove: () => {
        d3.selectAll(".sgd-convex-vs-non-convex").remove();
      },
      called: false,
    },
    {
      start: 1,
      end: 1,
      action: () => {
        updateGraph((x) => x ** 2 - 2, "Convex (Single global minimum with no local minima)");
      },
      remove: () => {},
      called: false,
    },
    {
      start: 2,
      end: 2,
      action: () => {
        updateGraph((x) => x ** 4 + x ** 3 - 2 * x ** 2 - 2 * x, "Non-convex (multiple local minima)");
        animateGradientDescentSteps();
      },
      remove: () => {
        d3.selectAll(".gd-data-point-animated").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 5,
      action: () => {
        draw2DSurface(coordSystemRef.current, xScaleGDvsSGD, yScaleGDvsSGD);
      },
      remove: () => {
        d3.selectAll(".sgd-convex-vs-non-convex-surface-visual").remove();
      },
      called: false,
    },
    {
      start: 3,
      end: 4,
      action: () => {},
      remove: () => {
        d3.selectAll(".trajectory-sgd-vs-gd-visual").remove();
        d3.selectAll(".start-end-circles-sgd-vs-gd-visual").remove();
      },
      called: false,
    },
    {
      start: 4,
      end: 4,
      action: () => {
        drawTrajectory(
          coordSystemRef.current,
          GradientDescent([-1.9, -0.9], 0.15, 50),
          xScaleGDvsSGD,
          yScaleGDvsSGD,
          2000,
          "white",
          "trajectory-gd-visual"
        );
      },
      remove: () => {
        d3.selectAll(".trajectory-gd-visual").remove();
        d3.selectAll(".trajectory-gd-visual-start-end-circles").remove();
      },
      called: false,
    },
    {
      start: 5,
      end: 5,
      action: () => {
        drawTrajectory(
          coordSystemRef.current,
          StochasticGradientDescent([-1.9, -0.9], 0.2, 50),
          xScaleGDvsSGD,
          yScaleGDvsSGD,
          4000,
          "white",
          "trajectory-sgd-visual"
        );
      },
      remove: () => {
        d3.selectAll(".trajectory-sgd-visual").remove();
        d3.selectAll(".trajectory-sgd-visual-start-end-circles").remove();
      },
      called: false,
    },
  ]).current;

  function animateGradientDescentSteps() {
    const f = (x) => x ** 4 + x ** 3 - 2 * x ** 2 - 2 * x;

    const dataPoint = d3
      .select(".coord-system")
      .append("circle")
      .attr("class", "gd-data-point-animated")
      .attr("cx", xScale(-1.9))
      .attr("cy", yScale(f(-1.9)))
      .attr("r", 20)
      .raise();

    dataPoint
      .transition()
      .duration(2000)
      .attrTween("cx", () => {
        const interpolateX = d3.interpolate(-1.9, -1.232);
        return function (t) {
          return xScale(interpolateX(t));
        };
      })
      .attrTween("cy", () => {
        const interpolateX = d3.interpolate(-1.9, -1.232);
        return function (t) {
          const x = interpolateX(t);
          const y = f(x);
          return yScale(y);
        };
      })
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
          .tickFormat((d) => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => "")
          .tickSize(0)
      )
      .attr("stroke-width", 7)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");
  }

  function updateGraph(mapping, text) {
    let g = svg.current.select("g.sgd-convex-vs-non-convex");

    if (g.empty()) {
      g = svg.current.append("g").attr("class", "sgd-convex-vs-non-convex");
    }

    const x = d3.range(xScale.domain()[0], xScale.domain()[1], 0.01);
    const y = x.map(mapping);

    const line = d3
      .line()
      .x((d) => xScale(d))
      .y((d, i) => yScale(y[i]));

    const path = g.selectAll("path").data([x]);

    path
      .enter()
      .append("path")
      .merge(path)
      .attr("class", "sgd-convex-vs-non-convex")
      .transition()
      .ease(d3.easeBackOut)
      .duration(400)
      .attr("d", line);

    g.selectAll("text").remove();
    g.append("text")
      .attr("x", 500)
      .attr("y", 100)
      .text(text)
      .attr("class", "sgd-convex-vs-non-convex-text")
      .attr("text-anchor", "middle")
      .style("font-size", "30px");
  }

  function draw2DSurface(coordSystem, xScale, yScale) {
    const rectSize = 0.1;
    const startX = xScale.domain()[0];
    const endX = xScale.domain()[1];
    const startY = yScale.domain()[0];
    const endY = yScale.domain()[1];

    const x = d3.range(startX, endX, rectSize);
    const y = d3.range(startY, endY, rectSize);
    const surface = [];
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        surface.push({ x: x[i], y: y[j], z: surfaceFunction(x[i], y[j]) });
      }
    }
    const min = d3.min(surface, (d) => d.z);
    const max = d3.max(surface, (d) => d.z);

    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([min, max]);
    const rectWidth = xScale(rectSize) - xScale(0);
    const rectHeight = yScale(0) - yScale(rectSize);

    coordSystem
      .selectAll("rect")
      .data(surface)
      .enter()
      .append("rect")
      .attr("class", "sgd-convex-vs-non-convex-surface-visual")
      .attr("x", (d) => xScale(d.x))
      .attr("y", (d) => yScale(d.y) - rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("stroke", (d) => colorScale(d.z))
      .attr("fill", (d) => colorScale(d.z));
  }

  function GradientDescent(startingPoint, learningRate, numIterations) {
    let point = startingPoint.slice();
    let trajectory = [point];
    for (let i = 0; i < numIterations; i++) {
      const [grad_x, grad_y] = GradSurfaceFunction(point[0], point[1]);
      point = [point[0] - learningRate * grad_x, point[1] - learningRate * grad_y];
      trajectory.push(point);
    }
    return trajectory;
  }

  // draw calculated trajectory for sgd but return a fixed trajectory for the sake of the visual consistency
  function StochasticGradientDescent(startingPoint, learningRate, numIterations) {
    // let point = startingPoint.slice();
    // let trajectory = [point];
    // for (let i = 0; i < numIterations; i++) {
    //   const [grad_x, grad_y] = GradSurfaceFunction(point[0], point[1]);
    //   const noise = [d3.randomNormal(0, 0.75)(), d3.randomNormal(0, 0.75)()];
    //   point = [point[0] - learningRate * (grad_x + noise[0]), point[1] - learningRate * (grad_y + noise[1])];
    //   trajectory.push(point);
    //   if (Math.sqrt(grad_x * grad_x + grad_y * grad_y) < 10e-2) {
    //     console.log(`Early stopping at iteration ${i}`);
    //     break;
    //   }
    // }
    // console.log(trajectory);
    // return trajectory;
    return [
      [-1.9, -0.9],
      [-1.2168120049590818, 0.10743949139374454],
      [-1.4092303329214435, 0.30887502929925514],
      [-1.4923957826635428, 0.5433960770467515],
      [-1.606072402990321, 0.6432623570804659],
      [-1.9083970634066445, 0.9109369063908421],
      [-1.5710050126981772, 0.6076801953127371],
      [-1.8029832959689753, 0.6065179551438489],
      [-1.4052161730454649, 0.6434721813648335],
      [-1.5737058994513782, 0.6918270092961146],
      [-1.762415601667736, 0.8252620798027489],
      [-1.9011704321171778, 1.0227066805029579],
      [-1.348574898597874, 0.7256352994424738],
      [-1.6422808806158977, 0.7428503774756738],
      [-1.6143025714975714, 0.7167423704194411],
      [-1.934497032076528, 0.8145914804567429],
      [-1.3525953048365484, 0.8154625618879283],
      [-1.2494017192032338, 0.9021785351756182],
      [-1.5672575135715132, 0.8113559004003641],
      [-2.0010911208128666, 0.911091590857656],
      [-0.9574059468737517, 0.8214485444127588],
      [-0.8775632576910626, 0.7177500319117199],
      [-0.629459635640478, 0.7743819832065292],
      [-0.7445549299018188, 0.4475535283605707],
      [-0.7425128319086276, 0.3877633154632681],
      [-0.5235837635747383, 0.1239667892896788],
      [-0.27429198811987676, 0.48373822318864856],
      [-0.01189383308614983, 0.35332765220497353],
      [0.10347676062357229, 0.19054377369743733],
      [-0.041315746108330234, 0.016153934715347623],
      [-0.1508476124790537, 0.04372444930468532],
      [-0.006475457679069763, 0.044104998493285474],
      [0.2075323869568138, -0.0876040934086478],
    ];
  }

  function drawTrajectory(coordSystem, trajectory, xScale, yScale, animationDuration, color, className) {
    coordSystem.selectAll(".trajectory").remove();
    coordSystem.selectAll(".start-end-circles").remove();

    const path = coordSystem
      .append("path")
      .datum(trajectory)
      .attr("class", className)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]))
      );

    const totalLength = path.node().getTotalLength();

    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(animationDuration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Draw start circle
    coordSystem
      .append("circle")
      .attr("class", `${className}-start-end-circles start-circle`)
      .attr("cx", xScale(trajectory[0][0]))
      .attr("cy", yScale(trajectory[0][1]))
      .attr("r", 10)
      .attr("fill", "limegreen")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Create the end circle but don't position it yet
    const endCircle = coordSystem
      .append("circle")
      .attr("class", `${className}-start-end-circles end-circle`)
      .attr("r", 10)
      .attr("fill", "red")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Create a timer to update the end circle's position
    const timer = d3.timer((elapsed) => {
      const progress = elapsed / animationDuration; // duration of the animation
      const currentLength = progress * totalLength;
      const point = path.node().getPointAtLength(currentLength);
      endCircle.attr("cx", point.x).attr("cy", point.y);
      if (progress >= 1) {
        timer.stop();
      }
    });
  }

  /*------------------------------------------------------------------------------------------------------------*/
  function changeOpacityOfSteps(nnOpacity, errorFunctionOpacity, calculateGradientsOpacity, updateWeightsOpacity) {
    d3.select(".nn-step-svg").transition().duration(200).attr("opacity", nnOpacity);
    d3.select(".error-function-step-svg").transition().duration(200).attr("opacity", errorFunctionOpacity);
    d3.select(".calculate-gradients-step-svg").transition().duration(200).attr("opacity", calculateGradientsOpacity);
    d3.select(".update-weights-step-svg").transition().duration(200).attr("opacity", updateWeightsOpacity);
  }

  function drawNNStep(layers) {
    const subSvg = svg.current
      .append("svg")
      .attr("class", "nn-step-svg")
      .attr("width", 200)
      .attr("height", 200)
      .attr("x", 0)
      .attr("y", 800);

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

    latexOntoSvg(
      subSvg,
      "\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}}",
      150,
      80,
      "calculate-gradients-step",
      "",
      "25"
    );
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
    g.append("text")
      .attr("x", x)
      .attr("y", y)
      .attr("text-anchor", "middle")
      .text(text)
      .attr("font-size", fontSize)
      .attr("class", className);
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
