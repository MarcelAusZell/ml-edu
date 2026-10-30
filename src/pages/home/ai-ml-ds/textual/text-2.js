import latexFormula from "../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Let us consider the example of recognizing handwritten digits.
      <br />
      Each digit corresponds to a {latexFormula("\\texttt{28} \\times \\texttt{28}")} pixel image, which means there
      are {latexFormula("\\texttt{784}")} pixels in total for one image, that can be represented as
      a vector {latexFormula("\\vec{x}")} of {latexFormula("\\texttt{784}")} elements.
      <br />
      The goal is to build a machine, that given such a vector {latexFormula("\\vec{x}")} can
      identify the digit {latexFormula("\\texttt{0,...,9}")} as the output.
    </>
  );
}
