import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexFormula from "../../../../../utils/latex-formula";
import "./basis-functions-interactive.scss";

export default function BasisFunctionsInteractive({ svgWidth, svgHeight }) {
  const [dataPoints, setDataPoints] = useState([
    { x: -0.75, y: 0, t: 1 },
    { x: -0.25, y: 0, t: -1 },
    { x: 0.25, y: 0, t: 1 },
    { x: 0.75, y: 0, t: -1 },
  ]);
  const [classValue, setClassValue] = useState(-1);
  const [polyDegree, setPolyDegree] = useState(3);

  const maxPoints = 12;
  const svgRef = useRef();
  const axisRef = useRef();
  const pathRef = useRef(null);
  const regionRef = useRef(null);

  const xScale = d3.scaleLinear().domain([-1, 1]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([-10, 10]).range([450, 50]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 250, 50, axisRef);
  }, []);

  useEffect(() => {
    plotPointOnAxis();
    clickToAddPoints();
    calculateDecisionBoundaryWithBasisFunctions();
  }, [dataPoints, classValue, polyDegree]);

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
      .attr("stroke-width", 5)
      .attr("stroke-opacity", 0.5)
      .style("font-size", "20px");
  }

  function clickToAddPoints() {
    const svg = d3.select(svgRef.current);
    svg.on("mousemove", (event) => {
      const classPoints = dataPoints.filter((point) => point.t === classValue);
      if (classPoints.length >= maxPoints) {
        svg.style("cursor", "not-allowed");
      } else {
        svg.style("cursor", "pointer");
      }
    });

    svg.on("click", (event) => {
      setDataPoints((prev) => {
        const classPoints = prev.filter((point) => point.t === classValue);
        if (classPoints.length >= maxPoints) {
          return prev;
        }
        const [clickX, clickY] = d3.pointer(event, svg.node());
        const xValue = xScale.invert(clickX);
        const yValue = yScale.invert(clickY);
        return [...prev, { x: xValue, y: yValue, t: classValue }];
      });
    });
  }

  function calculateDecisionBoundaryWithBasisFunctions() {
    const hasPositive = dataPoints.some((point) => point.t === 1);
    const hasNegative = dataPoints.some((point) => point.t === -1);
    if (!hasPositive || !hasNegative) return;

    const X = dataPoints.map((d) => generateBasisFunctions(d.x, polyDegree));
    const t = dataPoints.map((d) => d.t);

    let weights = new Array(polyDegree + 1).fill(0.1);

    const learningRate = 0.25;
    const maxIterations = 10000;
    const tolerance = 1e-5;

    for (let iter = 0; iter < maxIterations; iter++) {
      const predictions = X.map((x) => {
        const z = numeric.dot(x, weights);
        return Math.tanh(z);
      });

      const errors = numeric.sub(predictions, t);

      const gradient = X.reduce((grad, x, idx) => {
        const derivativeTanh = errors[idx] * (1 - Math.tanh(predictions[idx]) ** 2);
        return numeric.add(grad, numeric.mul(derivativeTanh, x));
      }, new Array(polyDegree + 1).fill(0));

      weights = numeric.sub(weights, numeric.mul(learningRate, gradient));

      if (numeric.norm2(gradient) < tolerance) {
        break;
      }
    }

    const xValues = d3.range(-1, 1, 0.01);
    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    if (!pathRef.current) {
      pathRef.current = axisRef.current.append("path").attr("class", "lq-with-basis-decision-boundary");
    }

    pathRef.current.datum(decisionBoundary).transition().ease(d3.easeBackOut).duration(600).attr("d", line);
    addVerticalLinesAndShading(decisionBoundary);
  }

  function addVerticalLinesAndShading(decisionBoundary) {
    const zeroCrossings = findZeroCrossings(decisionBoundary);

    const lineGroup = axisRef.current.selectAll(".class-separator").data(zeroCrossings);
    lineGroup
      .enter()
      .append("line")
      .attr("class", "class-separator")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 500)
      .attr("y2", 500)
      .merge(lineGroup)
      .transition()
      .ease(d3.easeBackOut)
      .duration(600)
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", 500);

    lineGroup.exit().remove();
  }

  function findZeroCrossings(boundary) {
    const zeroCrossings = [];
    for (let i = 1; i < boundary.length; i++) {
      if ((boundary[i - 1].y > 0 && boundary[i].y < 0) || (boundary[i - 1].y < 0 && boundary[i].y > 0)) {
        const zeroX =
          boundary[i - 1].x -
          (boundary[i - 1].y * (boundary[i].x - boundary[i - 1].x)) / (boundary[i].y - boundary[i - 1].y);
        zeroCrossings.push(zeroX);
      }
    }
    return zeroCrossings;
  }

  function plotPointOnAxis() {
    axisRef.current
      .selectAll("circle")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", (d) => (d.t === -1 ? "point-negative" : "point-positive"))
      .attr("r", 12)
      .transition()
      .ease(d3.easeBounceOut)
      .duration(400)
      .attr("cy", yScale(0));
  }

  function clear() {
    setDataPoints([]);
    axisRef.current.selectAll("circle").remove();
    axisRef.current.selectAll(".class-separator").remove();

    if (pathRef.current) {
      pathRef.current.remove();
      pathRef.current = null;
    }
    if (regionRef.current) {
      regionRef.current.remove();
      regionRef.current = null;
    }
  }

  function generateBasisFunctions(x, degree) {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      basisFunctions.push(Math.pow(x, i));
    }
    return basisFunctions;
  }

  return (
    <>
      <div className="centered-text-container" style={{ opacity: 0.5 }}>
        {latexFormula(
          `\\underset{\\vec{w}}{\\text{argmin}} \\; E(\\vec{w}) = \\underset{\\vec{w}}{\\text{argmin}}  \\left(\\frac{1}{2} \\sum_{n=1}^N ({\\tanh(y(\\vec{\\phi}(\\vec{x}_n))}) - t_n)^2\\right) = \\vec{w}^*`
        )}
        <br />
        <br />
        <div style={{ opacity: 0.5 }}>
          No closed-form solution, needs iterative optimization to find optimal weights {latexFormula(`\\vec{w}^*`)}
        </div>
      </div>
      <div className="centered-text-container">
        {latexFormula(`y(\\vec{x}) = {\\vec{w}^*}^\\top\\vec{\\phi}(\\vec{x})`)}
      </div>

      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="poly-degree">
        <svg className="minus-button" onClick={() => setPolyDegree(Math.max(polyDegree - 1, 1))}>
          <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
        </svg>

        <span>M: {polyDegree}</span>

        <svg className="plus-button" onClick={() => setPolyDegree(Math.min(polyDegree + 1, 20))}>
          <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
          <line x1="20" y1="10" x2="20" y2="30" strokeWidth="4" />
        </svg>
      </div>

      <div className="setting-changer">
        <div className="change-class-button">
          <svg onClick={() => setClassValue(classValue === -1 ? 1 : -1)}>
            <circle
              cx="20"
              cy="20"
              r="15"
              className={classValue === -1 ? "point-negative" : "point-positive"}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </svg>
          <strong>Change class</strong>
        </div>

        <div className="clear-button">
          <svg
            width="40"
            height="40"
            onClick={() => clear()}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <line x1="10" y1="10" x2="30" y2="30" stroke="red" strokeWidth="4" />
            <line x1="10" y1="30" x2="30" y2="10" stroke="red" strokeWidth="4" />
          </svg>
          <strong>Clear</strong>
        </div>
      </div>
    </>
  );
}
