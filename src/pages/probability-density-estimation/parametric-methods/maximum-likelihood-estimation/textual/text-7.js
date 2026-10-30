import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      Solving the optimization problem
      <div className="centered-text-container">
        {latexFormula("\\underset{\\theta}{\\text{arg\\,min}} -\\ln E(\\theta)")}
      </div>
      results in the Maximum Likelihood Estimate for the mean{" "}
      <div className="centered-text-container">
        {latexFormula("\\displaystyle \\hat{\\mu} = \\frac{1}{N} \\sum_{i=1}^N x_n")}
      </div>
      which we then can use to derive the variance estimate{" "}
      <div className="centered-text-container">
        {latexFormula("\\displaystyle \\hat{\\sigma}^2 = \\frac{1}{N} \\sum_{i=1}^N (x_i - \\hat{\\mu})^2")}
      </div>
      We call {latexFormula("\\hat{\\theta} = (\\hat{\\mu}, \\hat{\\sigma})")} the Maximum Likelihood Estimate for the
      parameters of the normal distribution.
    </>
  );
}
