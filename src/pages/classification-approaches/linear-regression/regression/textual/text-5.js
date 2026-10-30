import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      Minimizing this error
      <div className="centered-text-container">
        {latexFormula(
          "\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}} = \\frac{\\partial}{\\partial\\vec{w}} \\left(\\frac{1}{2} \\displaystyle\\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2\\right) = 0"
        )}
      </div>
      <div className="centered-text-container">
        {latexFormula("\\iff \\displaystyle \\sum_{n=1}^N(\\vec{w}^T\\vec{x}_n - t_n)\\vec{x}_n = 0")}
      </div>
      <div className="centered-text-container">{latexFormula("\\iff X^T(X\\vec{w} - \\vec{t}) = 0")}</div>
      <div className="centered-text-container">
        {latexFormula("\\iff \\vec{w} = (X^T X)^{-1} X^T \\vec{t}")}
      </div>
      leads consequently to the same solution as in the classification case.
    </>
  );
}
