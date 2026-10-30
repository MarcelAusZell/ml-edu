import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      A full covariance matrix allows for arbitrary rotations:
      <div className="centered-text-container">
        {latexFormula(
          `\\Sigma = \\text{diag}\\{\\sigma_i^2\\} = \\begin{bmatrix} \\sigma_1^{2} & \\rho\\sigma_1\\sigma_2 \\\\ \\rho\\sigma_1\\sigma_2 & \\sigma_2^{2} \\end{bmatrix}`
        )}
      </div>
    </>
  );
}
