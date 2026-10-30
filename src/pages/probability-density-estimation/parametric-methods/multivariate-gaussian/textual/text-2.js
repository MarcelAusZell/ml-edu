import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Changing the mean vector {latexFormula("\\mu")} shifts the distribution in the {latexFormula("D")}-dimensional
      space.
    </>
  );
}
