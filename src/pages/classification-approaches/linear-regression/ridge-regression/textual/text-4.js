import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      In Ridge Regression, the loss function is the familiar squared loss function, and the regularization term is the
      squared norm of the weight vector
      <div className="centered-text-container">
        {latexFormula(
          "E(\\vec{w}) = \\frac{1}{2} \\displaystyle\\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2) + \\frac{\\lambda}{2} \\|\\vec{w}\\|^2"
        )}
      </div>
      With {latexFormula("\\lambda > 0")} the regularization term is a penalty term that discourages the coefficients
      from becoming too large, that means {latexFormula("\\lambda")} controls the trade-off between the data fitting and
      the regularization (keeping the coefficients small). The solution of our new regression model is now given by:
      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        {latexFormula("\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}} = 0")}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula(
          "\\iff  \\frac{\\partial}{\\partial\\vec{w}} (\\frac{1}{2} \\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2  + \\frac{\\lambda}{2} \\|\\vec{w}\\|^2 ) = 0"
        )}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula(
          "\\iff  \\sum_{n=1}^N(\\vec{w}^T\\vec{\\phi}(\\vec{x}_n) - t_n)\\vec{\\phi}(\\vec{x}_n) + \\lambda \\vec{w} = 0"
        )}{" "}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("\\iff  \\sum_{n=1}^N(\\vec{w}^T\\vec{\\phi}_n - t_n)\\vec{\\phi}_n + \\lambda \\vec{w} = 0")}{" "}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("\\iff \\Phi^T(\\Phi\\vec{w} - \\vec{t}) + \\lambda \\vec{w} = 0")}{" "}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("\\iff (\\Phi^T\\Phi + \\lambda I)\\vec{w} = \\Phi^T\\vec{t}")}{" "}
      </div>
      <div style={{ marginBottom: "1rem" }}>
        {latexFormula("\\iff \\vec{w} = (\\Phi^T\\Phi + \\lambda I)^{-1}\\Phi^T\\vec{t}")}{" "}
      </div>
      So we can see that the solution of the Ridge Regression model is the same as the solution of the Least Square
      Regression model with the addition of the regularization term. The regularization term{" "}
      {latexFormula("\\lambda I")}
      is added to the diagonal of the {latexFormula("\\Phi^T\\Phi")} matrix which prevents the matrix from becoming
      singular i.e. non-invertible.
      <br />
      <span className="note-text">
        The choice of the regularization term could be different, e.g., instead of L2-Regularization (Ridge Regression)
        where we add the squared norm of the weight vector to the loss function, we could also use L1-Regularization
        (Lasso Regression) where we add the absolute norm of the weight vector to the loss function.
      </span>
    </>
  );
}
