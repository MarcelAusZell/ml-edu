import latexFormula from "../../../../../utils/latex-formula";

export default function Text3() {
  return (
    <>
      One popular choice for the activation function {latexFormula("g(\\cdot)")} is the sigmoid function
      <div className="centered-text-container">{latexFormula("\\sigma(x) = \\frac{1}{1 + e^{-x}}")}</div>
    </>
  );
}
