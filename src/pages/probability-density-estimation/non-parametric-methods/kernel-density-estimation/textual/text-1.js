import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Given only {latexFormula("N")} datapoints {latexFormula("\\{x_1, \\dots, x_N\\}")} we still ask ourselves how to
      use just these {latexFormula("N")}
      datapoints to capture the whole probability distribution for all values of {latexFormula("x")} without making any
      assumptions about the underlying distribution.
    </>
  );
}
