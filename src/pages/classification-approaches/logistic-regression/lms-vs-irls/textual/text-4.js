import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      To converge faster and become independent of the learning rate, we can utilize a second-order optimization
      algorithm
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{(\\tau + 1)}  = \\vec{w}^{(\\tau)} - H^{-1} \\nabla E(\\vec{w})")}
      </div>
    </>
  );
}