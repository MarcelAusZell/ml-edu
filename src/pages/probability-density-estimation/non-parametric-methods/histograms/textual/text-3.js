import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      The arguably most simple non-parametric method to estimate the probability density is the histogram. In its most
      simple form for one-dimensional data, it divides the range of the data into equally sized bins of bin width{" "}
      {latexFormula("\\Delta_i")} and counts the number {latexFormula("n_i")} of data points that fall into each bin. To
      get a valid probability density estimate, the counts are then divided by the total number of data points{" "}
      {latexFormula("N")}:
      <div className="centered-text-container">{latexFormula("\\displaystyle p_i = \\frac{n_i}{N \\cdot \\Delta_i}")}</div>
      As simple as it is, the histogram has some drawbacks. The choice of the bin width {latexFormula("\\Delta_i")} is
      crucial and can have a big impact on the resulting probability density estimate:
    </>
  );
}
