import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      <div className="centered-text-container">
      Exponential Distribution
        <TextPlaceholder height={10} />
        {latexFormula("p(x \\mid \\theta) = \\lambda e^{-\\lambda x}")} with {latexFormula("\\theta = \\lambda")}
      </div>
    </>
  );
}
