import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      A uniform variance results in a circular distribution:
      <div className="centered-text-container">
        {latexFormula(`\\Sigma = \\sigma^2 I = \\begin{bmatrix} \\sigma^{2} & 0 \\\\ 0 & \\sigma^{2} \\end{bmatrix}`)}
      </div>
    </>
  );
}
