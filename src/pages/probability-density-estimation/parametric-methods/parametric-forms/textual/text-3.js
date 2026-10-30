import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text3() {
  return (
    <>
      <div className="centered-text-container">
        Gamma Distribution
        <TextPlaceholder height={10} />
        {latexFormula(
          "p(x \\mid \\theta) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha - 1} e^{-\\beta x}"
        )}{" "}
        with {latexFormula("\\theta = (\\alpha, \\beta)")}
      </div>
      <TextPlaceholder height={10} />
      or another of the many possible distributions.
    </>
  );
}
