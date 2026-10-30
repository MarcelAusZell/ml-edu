import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      Naturally, we want to maximize the probability of observing the data {latexFormula("\\mathcal{X}")} given the
      parameters {latexFormula("\\theta")} to therefore have the best fit for the data.
    </>
  );
}
