import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      For our two-class classification problem with binary labels {latexFormula("t_n \\in \\{-1, 1\\}")}, we have to
      modify this activation function to
      <div className="centered-text-container">{latexFormula("\\tanh(x) = 2\\sigma(2x) - 1")}</div>
    </>
  );
}
