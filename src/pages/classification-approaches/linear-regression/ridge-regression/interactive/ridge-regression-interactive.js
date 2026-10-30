import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexFormula from "../../../../../utils/latex-formula";
import "./ridge-regression-interactive.scss";

export default function RidgeRegression() {
  const svgRef = useRef();
  const pathRef = useRef(null);
  const coordinateSystemRef = useRef();
  const maxPoints = 30;
  const [dataPoints, setDataPoints] = useState([
    {
      x: 0.05,
      y: 0.26,
    },
    {
      x: 0.09,
      y: 0.42,
    },
    {
      x: 0.17,
      y: 0.57,
    },
    {
      x: 0.28,
      y: 0.62,
    },
    {
      x: 0.37,
      y: 0.5,
    },
    {
      x: 0.42,
      y: 0.33,
    },
    {
      x: 0.47,
      y: 0.19,
    },
    {
      x: 0.57,
      y: 0.17,
    },
    {
      x: 0.66,
      y: 0.29,
    },
    {
      x: 0.71,
      y: 0.44,
    },
    {
      x: 0.75,
      y: 0.55,
    },
    {
      x: 0.82,
      y: 0.66,
    },
    {
      x: 0.9,
      y: 0.69,
    },
    {
      x: 0.95,
      y: 0.69,
    },
  ]);
  const [polyDegree, setPolyDegree] = useState(8);
  const [regulariationFactor, setRegulariationFactor] = useState(1e-6);
  const [RMSE, setRMSE] = useState(0);

  const xScale = d3.scaleLinear().domain([0, 1]).range([5, 1000]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([495, 0]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 495, 5, coordinateSystemRef);
  }, []);

  useEffect(() => {
    clickToAddPoints();
    plotPointOnAxis();
    plotRidgeRegression();
  }, [dataPoints, polyDegree, regulariationFactor]);

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
      .attr("opacity", 0.5);

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => "")
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5);
  }

  function clickToAddPoints() {
    const svg = d3.select(svgRef.current);

    svg.on("mousemove", (event) => {
      if (dataPoints.length >= maxPoints) {
        svg.style("cursor", "not-allowed");
      } else {
        svg.style("cursor", "pointer");
      }
    });

    svg.on("click", (event) => {
      setDataPoints((prev) => {
        if (prev.length >= maxPoints) {
          return prev;
        }
        const [clickX, clickY] = d3.pointer(event, svg.node());
        const xValue = xScale.invert(clickX);
        const yValue = yScale.invert(clickY);
        return [...prev, { x: xValue, y: yValue }];
      });
    });
  }

  function plotPointOnAxis() {
    const points = coordinateSystemRef.current.selectAll("circle").data(dataPoints, (d) => `${d.x},${d.y}`);
    points.exit().remove();

    points
      .enter()
      .append("circle")
      .merge(points)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("class", "linear-regression-point")
      .attr("r", 10);
  }

  function plotRidgeRegression() {
    if (dataPoints.length < 2) return;

    const weights = calculateRegressionLine(dataPoints);
    updateRegressionLine(weights);
    updateVerticalLinesToRegression(weights);
  }

  function rootMeanSquareError(weights) {
    const error = dataPoints.reduce((acc, { x, y }) => {
      const predictedY = weights.reduce((sum, weight, idx) => sum + weight * Math.pow(x, idx), 0);
      return acc + Math.pow(y - predictedY, 2);
    }, 0);

    const rmse = Math.sqrt(error / dataPoints.length);
    return isNaN(rmse) ? 0 : rmse;
  }

  function calculateRegressionLine(dataPoints) {
    const X = dataPoints.map(({ x }) => generateBasisFunctions(x, polyDegree));
    const t = dataPoints.map(({ y }) => [y]);

    const XT = numeric.transpose(X);
    const XTX = numeric.dot(XT, X);
    const identityMatrix = numeric.identity(XTX.length);
    const regularizedXTX = numeric.add(XTX, numeric.mul(identityMatrix, regulariationFactor));

    const pseudoInverse = numeric.dot(numeric.inv(regularizedXTX), XT);
    const weights = numeric.dot(pseudoInverse, t);
    setRMSE(rootMeanSquareError(weights));
    return weights;
  }

  function updateRegressionLine(weights) {
    const start = xScale.domain()[0];
    const end = xScale.domain()[1];
    const xValues = d3.range(start, end, 0.005);

    const decisionBoundary = xValues.map((x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return { x: x, y: z[0] };
    });

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    let path = coordinateSystemRef.current.select("path.ridge-regression-line");

    if (path.empty()) {
      path = coordinateSystemRef.current.append("path").attr("class", "ridge-regression-line");
    }
    path.datum(decisionBoundary).transition().ease(d3.easeBackOut).duration(200).attr("d", line);
  }

  function updateVerticalLinesToRegression(weights) {
    const leastSquareRegressionLine = (x) => {
      const phiX = generateBasisFunctions(x, polyDegree);
      const z = numeric.dot(phiX, weights);
      return z[0];
    };

    const verticalLines = coordinateSystemRef.current
      .selectAll(".vertical-line-to-linear-regression-line")
      .data(dataPoints);

    verticalLines
      .enter()
      .append("line")
      .attr("class", "vertical-line-to-linear-regression-line")
      .attr("x1", (d) => xScale(d.x))
      .attr("y1", (d) => yScale(d.y))
      .attr("x2", (d) => xScale(d.x))
      .attr("y2", (d) => yScale(leastSquareRegressionLine(d.x)))
      .merge(verticalLines)
      .each(function (d) {
        d3.select(this)
          .transition()
          .ease(d3.easeBackOut)
          .duration(200)
          .attr("x1", (d) => xScale(d.x))
          .attr("y1", (d) => yScale(d.y))
          .attr("x2", (d) => xScale(d.x))
          .attr("y2", (d) => yScale(leastSquareRegressionLine(d.x)));
      });
    verticalLines.exit().remove();
  }

  function generateBasisFunctions(x, degree) {
    const basisFunctions = [];
    for (let i = 0; i <= degree; i++) {
      basisFunctions.push(Math.pow(x, i));
    }
    return basisFunctions;
  }

  function clear() {
    setDataPoints([]);
    coordinateSystemRef.current.selectAll("circle").remove();
    coordinateSystemRef.current.selectAll("path.ridge-regression-line").remove();
    coordinateSystemRef.current.selectAll(".vertical-line-to-linear-regression-line").remove();
    if (pathRef.current) {
      pathRef.current.remove();
      pathRef.current = null;
    }
  }

  function formatRegulariationFactor(value) {
    const exponent = Math.log10(value);
    return `10^{${Math.round(exponent)}}`;
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} viewBox={`0 0 1000 500`} />
      </div>

      <div className="setting-container-slider">
        {latexFormula(`$\\text{RMSE}: ${RMSE.toFixed(2)} $`)}
        {latexFormula(`$\\text{M}: ${polyDegree} $`)}

        <input
          className="form-range"
          type="range"
          min="0"
          max="20"
          step="1"
          value={polyDegree}
          onChange={(e) => setPolyDegree(parseFloat(e.target.value))}
        />

        <div className="plus-minus-toggler">
          <svg
            className="minus-button"
            onClick={() => setRegulariationFactor(Math.max(regulariationFactor / 10, 1e-15))}
          >
            <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
          </svg>

          {latexFormula(`$\\lambda: ${formatRegulariationFactor(regulariationFactor)}$`)}

          <svg className="plus-button" onClick={() => setRegulariationFactor(Math.min(regulariationFactor * 10, 1))}>
            <line x1="10" y1="20" x2="30" y2="20" strokeWidth="4" />
            <line x1="20" y1="10" x2="20" y2="30" strokeWidth="4" />
          </svg>
        </div>
      </div>

      <div className="setting-changer">
        <div className="clear-button">
          <svg
            width="40"
            height="40"
            onClick={clear}
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
