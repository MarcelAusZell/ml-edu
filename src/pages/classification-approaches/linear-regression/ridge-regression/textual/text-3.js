import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      To mitigate this problem, we can introduce <span className="emphasized-text">regularization</span>, which involves
      adding a penalty for large coefficients to our model:
      <div className="centered-text-container">
        {latexFormula("E(\\vec{w}) = L(\\vec{w}) + \\lambda \\Omega(\\vec{w})")}
      </div>
      where {latexFormula("L(\\vec{w})")} is the loss function (e.g., the previous squared loss used previously) and
      {latexFormula("\\lambda")} is the regularization strength. Regularization discourages the model from fitting the
      noise in the data by keeping the coefficient values smaller and more generalized.
      <br />
      <span className="note-text">
        We discourage overfitting by adding a penalty for too large coefficients of {latexFormula("\\vec{w}")} to the
        loss function. That means the objective of minimizing the loss is now constrained by preventing the coefficients
        from becoming too large which therefore mitigates the risk of overfitting.
      </span>
    </>
  );
}
