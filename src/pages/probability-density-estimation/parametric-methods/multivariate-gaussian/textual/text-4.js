import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text4() {
  return (
    <>
      A more general covariance matrix allows for elliptical distributions:
      <div className="centered-text-container">
        {latexFormula(
          `\\Sigma = \\text{diag}\\{\\sigma_i^2\\} = \\begin{bmatrix} \\sigma_1^{2} & 0 \\\\ 0 & \\sigma_2^{2} \\end{bmatrix}`
        )}
        <TextPlaceholder height={10} />
        {latexFormula("\\sigma_1^2 \\neq \\sigma_2^2")}
      </div>
      Changing the values of the diagonal elements resulting in widening/narrowing along the horizontal or vertical axis.
    </>
  );
}
