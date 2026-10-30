import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      {latexFormula("\\dots")} the hyperbolic tangent function
      <div className="centered-text-container">{latexFormula("\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}")}</div>
      {latexFormula("\\dots")}
    </>
  );
}
