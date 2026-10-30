import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text9() {
  return (
    <>
      It captures the probability density for all different possible values of {latexFormula("x")} that we did not
      explicitly observe.
      <div className="centered-text-container">
        <span className="txt-2">
          {latexFormula("\\hat{p}(x \\, ; h) = \\frac{1}{N} \\displaystyle\\sum_{i=1}^{N} k_h(x - x_i)")}
        </span>
      </div>
      Similar to the histogram, we again have a smoothing parameter {latexFormula("h")} (bandwidth) that determines the
      width of the kernel. For a Gaussian kernel, this is the standard deviation of the Gaussian distribution.
    </>
  );
}
