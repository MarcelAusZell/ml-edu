import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      One modification to this gradient descent algorithm is a second-order optimization called Newton-Raphson method
      The iterative update rule for the Newton Raphson method is given by:
      <div className="centered-text-container">
        {latexFormula("x^{(\\tau+1)} = x^{(\\tau)} - H^{-1} \\nabla f(x^{(\\tau)})")}
      </div>
      where {latexFormula("H")} is the Hessian matrix of the function {latexFormula("f")}, i.e.{" "}
      {latexFormula("H = \\nabla^2 f")}
      <br />
      <span className="note-text">
        <br />
        In the one-dimensional case, the Hessian {latexFormula("H")} is the second derivative of the objective function{" "}
        {latexFormula("f^{''}")}
      </span>
    </>
  );
}
