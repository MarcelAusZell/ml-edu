import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      To address the issue of overfitting, we can consider the following observation: When examining the coefficients{" "}
      {latexFormula("\\vec{w}^*")} of a polynomial regression model, we notice that as the polynomial degree increases,
      the magnitude of the coefficients typically increases as well. This happens because the coefficients become highly
      tuned to the data, developing very large and negative values to ensure the polynomial function precisely fits each
      data point. One way of capturing the magnitude of the coefficients is by observing the norm of the weight vector {latexFormula("\\vec{w}")}.
    </>
  );
}
