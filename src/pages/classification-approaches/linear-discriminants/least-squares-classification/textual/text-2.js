import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      If we solve the minimization problem:
      <br />
      {latexFormula("\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}} = 0")}
      <TextPlaceholder height={8} />
      {latexFormula(
        "\\iff \\frac{\\partial}{\\partial\\vec{w}} \\left(\\frac{1}{2} \\displaystyle\\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2\\right) = 0"
      )}
      <TextPlaceholder height={8} />
      {latexFormula("\\iff \\displaystyle \\sum_{n=1}^N(\\vec{w}^\\top\\vec{x}_n - t_n)\\vec{x}_n = 0")}
      <TextPlaceholder height={8} />
      {latexFormula("\\iff X^\\top(X\\vec{w} - \\vec{t}) = 0")}
      <TextPlaceholder height={8} />
      {latexFormula("\\iff \\vec{w} = (X^\\top X)^{-1} X^\\top \\vec{t}")}
      <TextPlaceholder height={8} />
      {latexFormula("\\iff \\vec{w} = X^\\dagger \\vec{t}")}
      <br />
      we obtain a closed-formed solution for the optimal weight vector {latexFormula("\\vec{w}")} with which the
      decision boundary can be defined:
      <div className="centered-text-container">
        {latexFormula("y(\\vec{x}) = \\vec{w}^\\top\\vec{x} = \\vec{t}^\\top(X^\\dagger)^\\top\\vec{x}")}
      </div>
      <span className="note-text">
        {latexFormula("X^\\dagger = (X^T X)^{-1} X^\\top")} is referred to as the Moore-Penrose pseudo-inverse of the matrix{" "}
        {latexFormula("X")}
      </span>
    </>
  );
}
