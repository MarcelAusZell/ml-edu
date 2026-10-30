import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Though this method works well for data that follow a linear trend, it may not be the best choice for data that
      follows a non-linear trend. Similar how we used basis functions to adjust the linear discriminant classification
      model to work with non-linear scenarios we can do the same with the regression model. We therefore can choose a
      set of basis functions such as polynomial basis functions {latexFormula("\\phi_j(x) = x^j")} to redefine the model
      as:
      <div className="centered-text-container">
        {latexFormula(
          "\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}} = \\frac{\\partial}{\\partial\\vec{w}} \\left(\\frac{1}{2} \\displaystyle\\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2\\right) = 0"
        )}
      </div>
      <div className="centered-text-container">
        {latexFormula(
          "\\iff \\displaystyle \\sum_{n=1}^N(\\vec{w}^T\\vec{\\phi}(\\vec{x}_n) - t_n)\\vec{\\phi}(\\vec{x}_n) = 0"
        )}
      </div>
      <div className="centered-text-container">
        {latexFormula("\\iff \\displaystyle \\sum_{n=1}^N(\\vec{w}^T\\vec{\\phi}_n - t_n)\\vec{\\phi}_n = 0")}
      </div>
      <div className="centered-text-container">{latexFormula("\\iff \\Phi^T(\\Phi\\vec{w} - \\vec{t}) = 0")}</div>
      <div className="centered-text-container">
        {latexFormula("\\iff \\vec{w} = (\\Phi^T\\Phi)^{-1}\\Phi^T\\vec{t}")}
      </div>
      <span className="note-text">
        {latexFormula("\\Phi")} is the same as {latexFormula("X")} but with the basis functions applied to each data
        point.
      </span>
    </>
  );
}
