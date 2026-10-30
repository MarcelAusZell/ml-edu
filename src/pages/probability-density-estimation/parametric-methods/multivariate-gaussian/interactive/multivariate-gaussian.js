import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import * as d3 from "d3";
import numeric from "numeric";
import latexOntoSvg from "../../../../../utils/latex-onto-svg-viewbox";
import latexFormula from "../../../../../utils/latex-formula";
import "./multivariate-gaussian.scss";

export default function MultivariateGaussian() {
  const svgRef = useRef();
  const axisRef = useRef();
  const isocontourGroupRef = useRef();

  const xScale = d3.scaleLinear().domain([-5, 5]).range([50, 950]);
  const yScale = d3.scaleLinear().domain([-2.5, 2.5]).range([500, 50]);

  const [mean, setMean] = useState([0, 0]);
  const [sigmaX, setSigmaX] = useState(1);
  const [sigmaY, setSigmaY] = useState(1);
  const [rho, setRho] = useState(0);
  const stepSize = 0.01;

  const covariance = useMemo(() => {
    const covXX = sigmaX ** 2;
    const covYY = sigmaY ** 2;
    const covXY = rho * sigmaX * sigmaY;
    return [
      [covXX, covXY],
      [covXY, covYY],
    ];
  }, [sigmaX, sigmaY, rho]);

  const multivariateGaussian = useMemo(() => {
    const size = mean.length;
    const det = numeric.det(covariance);
    const inv = numeric.inv(covariance);
    const coefficient = 1 / (Math.pow(2 * Math.PI, size / 2) * Math.sqrt(Math.abs(det)));
    return function (x) {
      const diff = numeric.sub(x, mean);
      const diffInv = numeric.dot(diff, inv);
      const exponent = -0.5 * numeric.dot(diffInv, diff);
      return coefficient * Math.exp(exponent);
    };
  }, [mean, covariance]);

  useEffect(() => {
    drawCoordSystem(svgRef, xScale, yScale, 500, 50, axisRef);
    if (!isocontourGroupRef.current) {
      isocontourGroupRef.current = d3.select(svgRef.current).append("g").attr("class", "isocontour-group");
    }
  }, []);

  useEffect(() => {
    if (isocontourGroupRef.current) {
      isocontourGroupRef.current.selectAll("*").remove();
      plotMultivariateGaussian(isocontourGroupRef.current, mean, covariance);
    }
  }, [mean, covariance, multivariateGaussian]);

  const plotMultivariateGaussian = useCallback(
    (g, mean, covariance) => {
      const pdf = multivariateGaussian;
      const thresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

      thresholds.forEach((threshold) => {
        const points = samplePointsForThreshold(pdf, threshold, mean);
        if (points) {
          drawIsocontour(g, points, covariance, threshold);
        }
      });
    },
    [multivariateGaussian]
  );

  const samplePointsForThreshold = useCallback((pdf, threshold, mean) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const points = directions.map((dir) => {
      let step = 0.1;
      let [dx, dy] = dir;
      let x = mean[0] + dx * step;
      let y = mean[1] + dy * step;
      let value = pdf([x, y]);

      while (value > threshold) {
        step += 0.1;
        x = mean[0] + dx * step;
        y = mean[1] + dy * step;
        value = pdf([x, y]);
      }
      return { x, y };
    });

    return points;
  }, []);

  const drawIsocontour = useCallback(
    (g, points, covariance, threshold) => {
      const cx = d3.mean(points, (d) => d.x);
      const cy = d3.mean(points, (d) => d.y);

      const eigen = numeric.eig(covariance);
      const angle = Math.atan2(eigen.E.x[0][1], eigen.E.x[0][0]) * (180 / Math.PI);
      const scalingFactor = Math.sqrt(-2 * Math.log(threshold));
      const rx = scalingFactor * Math.sqrt(eigen.lambda.x[0]);
      const ry = scalingFactor * Math.sqrt(eigen.lambda.x[1]);

      g.append("ellipse")
        .attr("class", "ellipse")
        .attr("cx", xScale(cx))
        .attr("cy", yScale(cy))
        .attr("rx", Math.abs(xScale(rx) - xScale(0)))
        .attr("ry", Math.abs(yScale(ry) - yScale(0)))
        .attr("transform", `rotate(${angle}, ${xScale(cx)}, ${yScale(cy)})`)
        .style("fill-opacity", threshold ** 4 + 0.1);
    },
    [xScale, yScale]
  );

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
          .tickFormat((d) => d3.format("d")(d))
          .tickValues([-4, -3, -2, -1, 0, 1, 2, 3, 4])
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "15px");

    coordSystem
      .append("g")
      .attr("transform", `translate(${yTransform},0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat((d) => d3.format("d")(d))
          .tickValues([-2, -1, 0, 1, 2])
          .tickSize(0)
      )
      .attr("stroke-width", 5)
      .attr("opacity", 0.5)
      .style("font-size", "15px");

    latexOntoSvg(
      svg,
      "f(\\vec{x}) = \\frac{1}{(2\\pi)^{D/2}\\sqrt{\\text{det}(\\Sigma)}} \\; \\text{exp}(-\\frac{1}{2}(\\vec{x}-\\vec{\\mu})^T \\; \\Sigma^{-1} \\; (\\vec{x}-\\vec{\\mu}))",
      500,
      50,
      "",
      "",
      "15"
    );
  }

  return (
    <>
      <div className="interactive-svg">
        <svg ref={svgRef} width={1000} height={600} viewBox={`0 0 1000 520`}></svg>
      </div>{" "}
      <div className="multivariate-settings">
        <div className="slider-container-multivariate">
          <div className="slider-label">{latexFormula("\\mu_0")}</div>
          <input
            type="range"
            className="form-range"
            min="-3"
            max="3"
            step={stepSize}
            value={mean[0]}
            onChange={(e) => setMean([+e.target.value, mean[1]])}
          />
          <div className="slider-value">{latexFormula(`${Number(mean[0]).toFixed(2)}`)}</div>
        </div>
        <div className="slider-container-multivariate">
          <div className="slider-label">{latexFormula("\\mu_1")}</div>
          <input
            type="range"
            className="form-range"
            min="-3"
            max="3"
            step={stepSize}
            value={mean[1]}
            onChange={(e) => setMean([mean[0], +e.target.value])}
          />
          <div className="slider-value">{latexFormula(`${Number(mean[1]).toFixed(2)}`)}</div>
        </div>
        <div className="slider-container-multivariate">
          <div className="slider-label">{latexFormula("\\sigma_1")}</div>
          <input
            type="range"
            className="form-range"
            min="0.1"
            max="1"
            step={stepSize}
            value={sigmaX}
            onChange={(e) => setSigmaX(+e.target.value)}
          />
          <div className="slider-value">{latexFormula(`${Number(sigmaX).toFixed(2)}`)}</div>
        </div>
        <div className="slider-container-multivariate">
          <div className="slider-label">{latexFormula("\\sigma_2")}</div>
          <input
            type="range"
            className="form-range"
            min="0.1"
            max="1"
            step={stepSize}
            value={sigmaY}
            onChange={(e) => setSigmaY(+e.target.value)}
          />
          <div className="slider-value">{latexFormula(`${Number(sigmaY).toFixed(2)}`)}</div>
        </div>
        <div className="slider-container-multivariate">
          <div className="slider-label">{latexFormula("\\rho_{\\;}")}</div>
          <input
            type="range"
            className="form-range"
            min="-0.99"
            max="0.99"
            step={0.01}
            value={rho}
            onChange={(e) => setRho(+e.target.value)}
          />
          <div className="slider-value">{latexFormula(`${Number(rho).toFixed(2)}`)}</div>
        </div>
      </div>
    </>
  );
}
