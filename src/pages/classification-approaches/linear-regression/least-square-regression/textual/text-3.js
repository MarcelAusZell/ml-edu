import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      As to answer the question of which degree of polynomial to use which will become an important hyperparameter to
      consider, we can compare the estimation quality of the model for different degrees of polynomial. One approach is
      to observe the so-called <span className="emphasized-text">Root Mean Square Error</span> (RMSE):
      <div className="centered-text-container">
        {latexFormula(
          "RMSE = \\sqrt{\\frac{1}{N} \\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2} = \\sqrt{\\frac{2 E(w^*)}{N}}"
        )}
      </div>
      The division by {latexFormula("N")} normalizes the error, making it an average per data point. The multiplication
      by {latexFormula("2")} is due to the error function's definition, often including a factor of{" "}
      {latexFormula("\\frac{1}{2}")} for mathematical convenience in optimization. The square root is applied to convert
      the squared error back to the original unit of the target variable, making RMSE more interpretable. Let us analyze
      the behavior of the RMSE and the predictive model for different degrees of polynomial:
      <br />
      <span className="note-text">
        {latexFormula("w^*")} is the optimal weight vector that minimizes the error function{" "}
        {latexFormula("E(\\vec{w})")}, the one found in the closed form solution
      </span>
    </>
  );
}
