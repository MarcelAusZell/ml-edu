import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      However, taking the derivative of a product can be cumbersome. To simplify the process, we take the negative
      logarithm of the likelihood function and minimize a sum instead, which is equivalent to maximizing the likelihood
      function.
      <br />
      This likelihood is often referred to as the negative log-likelihood or "Energy" {latexFormula("E(\\theta)")}.
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\underset{\\theta}{\\text{arg\\,min}} -\\ln E(\\theta) \\iff - \\frac{d}{d\\theta} \\sum_{i=1}^{N} \\ln p(x_i \\mid \\theta) = 0",
          "crimson"
        )}
      </div>
      <span className="note-text">
        We take the logarithm of the likelihood to derive a sum instead of a product. The normal likelihoods{" "}
        {latexFormula("p(x_i \\mid \\theta)")} are typically in the range between 0 and 1. Because the logarithm is
        negative in this range, we take the negative logarithm, which therefore transitions the problem from maximizing
        to minimizing.
      </span>
    </>
  );
}
