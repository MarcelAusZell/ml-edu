import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      In the Maximum Likelihood Estimation approach, we then try to find the parameter values {latexFormula("\\theta")}{" "}
      that maximize the likelihood function {latexFormula("L(\\theta \\mid x)")}. Visually, we see this by looking for
      the peak of the likelihood function. But how do we find this peak analytically? By taking the derivative of the
      likelihood function and setting it to zero.
      <div className="centered-text-container">
        {latexFormula(
          "\\displaystyle \\underset{\\theta}{\\text{arg\\,max}} \\; L(\\theta)  \\iff \\frac{d}{d\\theta} L(\\theta) = 0  \\iff \\frac{d}{d\\theta}\\prod_{i=1}^{N} p(x_i \\mid \\theta) = 0",
          "limegreen"
        )}
      </div>
    </>
  );
}
