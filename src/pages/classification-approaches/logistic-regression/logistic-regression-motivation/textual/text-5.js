import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      We again can minimize the negative log-likelihood instead of maximizing the likelihood, which leads to the binary
      cross-entropy loss function:
      <div className="centered-text-container">
        {latexFormula(
          "E(\\vec{w}) = -\\ln p(\\vec{t} \\mid \\vec{w}) = -\\displaystyle \\sum_{n=1}^N (t_n \\ln y_n +(1 - t_n)\\ln(1 -y_n))"
        )}
      </div>
      In general, generalized linear models that incorporate nonlinear activation functions and/or basis functions
      cannot be optimized using closed-form solutions. We therefore will use iterative optimization algorithms like
      Gradient Descent to find the optimal weights {latexFormula("\\vec{w}")} that minimize the loss function{" "}
      {latexFormula("E(\\vec{w})")}
      <br />
      <span className="note-text">
        The multi-class extension of the binary cross-entropy error is the softmax cross-entropy error:
        <div style={{ textAlign: "center" }}>
          {latexFormula("E(\\vec{w}) = -\\displaystyle \\sum_{n=1}^N \\displaystyle \\sum_{k=1}^K t_{nk} \\ln y_{nk}")}
        </div>
      </span>
    </>
  );
}
