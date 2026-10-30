import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      {latexFormula("\\dots")} or the arguably more popular choice, the rectified linear unit (ReLU) function
      <div className="centered-text-container">{latexFormula("ReLU(x) = \\text{max}\\{0, x\\}")}</div>
      ReLU is a particularly popular because it helps mitigate the vanishing gradient problem of the sigmoidal
      functions.
    </>
  );
}
