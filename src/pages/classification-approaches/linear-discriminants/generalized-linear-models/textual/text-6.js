import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      {latexFormula("\\dots")} and for {latexFormula("x \\rightarrow \\infty")} the sigmoid function approaches{" "}
      {latexFormula("1")}. This means that the activation function is bounded, which is a desirable property because it
      limits the growth of the output {latexFormula("y(\\vec{x})")} and therefore the influence of outliers.
    </>
  );
}
