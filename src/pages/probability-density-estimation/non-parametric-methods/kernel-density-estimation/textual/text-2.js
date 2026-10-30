import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      The rather naive histogram approach earlier gave us one important insight: To estimate the probability density at
      a certain point, we can use the data points that lie in the vicinity of that point: Each data point/observation{" "}
      {latexFormula("x_i")} gives local confidence that the probability density at that point is high but also
      that the probability density close to {latexFormula("x_i")} should be high as well, which will shrink as we move
      further away from {latexFormula("x_i")}. In Kernel Density estimation, we express this behavior by using a kernel
      function {latexFormula("k(u)")} (e.g., a gaussian Kernel) which assigns a weight to the non-observed data points {latexFormula("x")}{" "}
      depending on how far away they are from the observed point {latexFormula("x_i")}. 
    </>
  );
}
