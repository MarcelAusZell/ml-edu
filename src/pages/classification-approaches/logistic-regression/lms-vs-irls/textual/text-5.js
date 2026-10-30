import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text5() {
  return (
    <>
      For this update method, we need besides the gradient
      <TextPlaceholder height={10} />
      {latexFormula(
        "\\nabla E(\\vec{w})= \\displaystyle \\sum_{n=1}^{N} (y_n - t_n) \\vec{x}_n = X^	\\top (\\vec{y} - \\vec{t})"
      )}
      <TextPlaceholder height={10} />
      also the Hessian matrix
      <TextPlaceholder height={10} />
      {latexFormula(
        "\\nabla\\nabla  E(\\vec{w}) = H = \\displaystyle \\sum_{n=1}^{N} y_n(1 - y_n) \\vec{x}_n \\vec{x}_n^\\top = X^\\top R X"
      )}
      <TextPlaceholder height={10} />
      where {latexFormula("R = diag(y_n(1 - y_n)) \\in \\mathbb{R}^{N \\times N}")} is a diagonal matrix we therefore
      get the update rule:
      <TextPlaceholder height={10} />
      {latexFormula("\\vec{w}^{(\\tau + 1)}  = \\vec{w}^{(\\tau)} - H^{-1} \\nabla E(\\vec{w}) ")}
      <TextPlaceholder height={10} />
      {latexFormula(" = \\vec{w}^{(\\tau)} - (X^\\top R X)^{-1} X^\\top (\\vec{y} - \\vec{t})")}
      <TextPlaceholder height={10} />
      {latexFormula(" =  (X^\\top R X)^{-1} (X^\\top R X \\vec{w}^{(\\tau)} - X^\\top (\\vec{y} - \\vec{t}))")}
      <TextPlaceholder height={10} />
      {latexFormula(" =  (X^\\top R X)^{-1} X^\\top R \\vec{z} \\quad")} where{" "}
      {latexFormula("\\vec{z} = X \\vec{w}^{(\\tau)} - R^{-1} (\\vec{y} - \\vec{t})")}
      <TextPlaceholder height={10} />
      This update rule is known as the Iteratively Reweighted Least Squares (IRLS) update rule.
      <br />
      <span className="note-text">
        <ul>
          <li>The matrix notation allows us to express the update rule in a more compact form.</li>
          <li>
            The final update rule resembles the form of normal equations for a weighted least squares problem. Since the
            weight matrix {latexFormula("R")} changes with each update, we need to iteratively apply the normal
            equations using the new weight vector {latexFormula("\\vec{w}")} to recalculate {latexFormula("R")}, hence
            the name Iteratively Reweighted Least Squares.
          </li>
        </ul>
      </span>
    </>
  );
}
