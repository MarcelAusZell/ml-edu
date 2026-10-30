import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      The most simple form of a Gradient Descent algorithm formulizes this in the iterative update rule:
      <div className="centered-text-container">
        {latexFormula("x^{(\\tau+1)} = x^{(\\tau)} - \\eta \\nabla f(x^{(\\tau)})")}
      </div>
      which can be understood as follows:
      <br />
      Given a starting point {latexFormula("x^{(0)}")}, we move a distance of {latexFormula("\\tau")} in the direction
      of steepest descent given by the negative gradient of the function {latexFormula("f")} to reach the next point{" "}
      {latexFormula("x^{(\\tau+1)}")}. The step size {latexFormula("\\eta")} is also called the learning rate and
      determines the size of the steps we take in the direction of the negative gradient.
      <br />
      <span className="note-text">
        <br />
        In the one-dimensional case, the gradient {latexFormula("\\nabla f")} is the derivative of the objective
        function {latexFormula("f^{'}")}
      </span>
    </>
  );
}
