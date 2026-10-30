import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      To minimize the error function {latexFormula("E(\\vec{w})")} we need to find the optimal weights{" "}
      {latexFormula("\\vec{w}^*")} that minimize the error function this is done by calculating the gradients{" "}
      {latexFormula("\\frac{\\partial E(\\vec{w})}{\\partial \\vec{w}}")} of the error function {latexFormula("\\dots")}
    </>
  );
}
