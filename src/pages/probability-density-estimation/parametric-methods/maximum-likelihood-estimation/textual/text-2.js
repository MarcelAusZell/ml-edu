import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      It is a method that tries to find the parameter values {latexFormula("\\theta = (\\mu, \\sigma)")}, that best fits
      the training data {latexFormula("\\mathcal{X} = \\{\\vec{x}_1, \\ldots, \\vec{x}_N\\}")}. Considering the visual
      example, we see that different distributions may fit the data better than others.
      <br />
    </>
  );
}
