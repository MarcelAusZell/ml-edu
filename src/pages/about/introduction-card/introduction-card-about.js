import { useEffect, useRef } from "react";
import { useTheme } from "../../../utils/theme-provider";
import * as d3 from "d3";
import "./introduction-card-about.scss";

export default function IntroductionCardAbout() {
  const svgRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();

  function circleInterpolation() {
    const svg = d3.select(svgRef.current);
    const colorInterpolator = isDarkMode
      ? d3.interpolateRgb("rgb(255, 217, 0)", "rgb(255, 99, 71)")
      : d3.interpolateRgb("rgb(255, 99, 71)", "rgb(255, 217, 0)");

    for (let i = 0; i < 100; i += 15) {
      svg
        .append("circle")
        .attr("cx", i)
        .attr("cy", 15)
        .attr("r", 15)
        .attr("class", "ml-intro-circle")
        .attr("fill", "none")
        .attr("stroke", colorInterpolator(i / 100));
    }
  }

  useEffect(() => {
    circleInterpolation();
  }, [isDarkMode]);

  return (
    <div className="introduction-card-wrapper">
      <div className="introduction-card-container">
        <svg ref={svgRef} viewBox="0 0 100 30" style={{ overflow: "visible" }} />
      </div>
      <div className="centered-text">About this Project</div>
    </div>
  );
}
