import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      We saw that outliers, be they "too incorrect" or "too correct" predictions, receive a very high penalty, which
      distorts the decision boundary which can ultimately lead to misclassifications. This is because we allow the
      output {latexFormula("y(\\vec{x};\\vec{w})")} to grow arbitrarily large.
    </>
  );
}
