import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      The previous Gradient Descent method of starting with an initial guess of the model parameters{" "}
      {latexFormula("\\vec{w}^{(0)}")} and then updating them by taking steps in the direction of the negative gradient
      of the error function {latexFormula("E(\\vec{w})")}
      <div className="centered-text-container">
        {latexFormula("\\vec{w}^{(\\tau+1)} = \\vec{w}^{(\\tau)} - \\eta \\nabla E(\\vec{w}^{(\\tau)})")}
      </div>
      will lead that we easily get stuck in a local minimum where {latexFormula("\\nabla E(\\vec{w}) = 0")} depending on
      the initial guess of the parameters.
    </>
  );
}
