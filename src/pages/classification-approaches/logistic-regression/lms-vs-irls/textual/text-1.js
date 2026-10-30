import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text1() {
  return (
    <>
      Because in Logistic Regression, the binary-cross-entropy error:
      <div className="centered-text-container">
        {latexFormula("E(\\vec{w}) = \\displaystyle -\\sum_{n=1}^{N} (t_n \\ln(y_n) + (1 - t_n) \\ln(1 - y_n))")}
      </div>
      has no closed-form solution, we need to use an iterative optimization algorithm to find the optimal weights. For
      first-order gradient descent, we need besides an initial guess for the weights, the gradient:
      <br />
      {latexFormula("\\nabla E(\\vec{w}) ")}
      <TextPlaceholder height={10} />
      {latexFormula(
        " = - \\displaystyle \\sum_{n=1}^{N} t_n \\frac{\\partial}{\\partial \\vec{w}} \\ln(y_n) + (1 - t_n) \\frac{\\partial}{\\partial \\vec{w}} \\ln(1 - y_n)"
      )}
      <TextPlaceholder height={10} />
      {latexFormula(
        " = - \\displaystyle \\sum_{n=1}^{N} t_n \\frac{\\frac{\\partial}{\\partial \\vec{w}} y_n}{y_n} + (1 - t_n) \\frac{\\frac{\\partial}{\\partial \\vec{w}} \\ln(1 - y_n)}{(1 - y_n)}"
      )}
      <TextPlaceholder height={10} />
      {latexFormula(
        " = - \\displaystyle \\sum_{n=1}^{N} t_n \\frac{y_n(1 - y_n)}{y_n}\\vec{x}_n - (1 - t_n) \\frac{y_n(1 - y_n)}{(1 - y_n)}\\vec{x}_n"
      )}
      <TextPlaceholder height={10} />
      {latexFormula(" = - \\displaystyle \\sum_{n=1}^{N} (t_n - t_n y_n - y_n + t_n y_n)\\vec{x}_n")}
      <TextPlaceholder height={10} />
      {latexFormula(" = \\displaystyle \\sum_{n=1}^{N} (y_n - t_n) \\vec{x}_n")}
      <TextPlaceholder height={10} />
      which thus leads to the update rule:
      <TextPlaceholder height={10} />
      {latexFormula(
        "\\vec{w}^{(\\tau + 1)}  = \\vec{w}^{(\\tau)} + \\eta \\nabla E(\\vec{w})=  \\vec{w}^{(\\tau)} + \\eta \\displaystyle \\sum_{n=1}^{N} (y_n - t_n) \\vec{x}_n"
      )}
      <br />
      <span className="note-text">
        <br />
        <ul>
          <li>{latexFormula("y_n = \\sigma(\\vec{w}^T \\vec{x}_n)")}</li>
          <li>The Logistic sigmoid has the property of {latexFormula("\\sigma'(a) = \\sigma(a)(1 - \\sigma(a))")}</li>
          <li>
            Because of chain rule{" "}
            {latexFormula(
              "\\frac{\\partial y_n}{\\partial \\vec{w}} = \\frac{\\partial \\sigma(\\vec{w}^T\\vec{x}_n)}{\\partial \\vec{w}} = \\sigma(\\vec{w}^T\\vec{x}_n)(1 - \\vec{w}^T\\vec{x}_n)\\vec{x}_n = y_n(1 - y_n)\\vec{x}_n"
            )}
          </li>
        </ul>
      </span>
    </>
  );
}
