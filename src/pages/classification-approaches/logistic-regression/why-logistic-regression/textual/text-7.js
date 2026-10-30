import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      We mitigated this problem by limiting the growth of the output of {latexFormula("y(\\vec{w}; \\vec{x}_n)")} by
      using a convenient activation function such as {latexFormula("\\sigma(x) = \\frac{1}{1 + e^{-x}}")} or{" "}
      {latexFormula("\\sigma(x) = \\tanh(x)")}
      <br />
      The result where no penalization for "too" correct data points {latexFormula("\\dots")}
    </>
  );
}
