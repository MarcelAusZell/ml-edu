import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      We saw how to fit a line to a set of points using the least square regression method. The goal was to
      find the line that minimizes the sum of the squared differences between the observed values and the
      values predicted by the line:
      <div className="centered-text-container">
        {latexFormula("E(\\vec{w}) = \\frac{1}{2} \\sum_{n=1}^{N} (y(\\vec{x}_n; \\vec{w}) - t_n)^2")}
      </div>
      where {latexFormula("y(\\vec{x}_n; \\vec{w})")} is the predicted value for the input{" "}
      {latexFormula("\\vec{x}_n")}
      which resulted in the solution of:
      <div className="centered-text-container">{latexFormula("\\vec{w} = (X^TX)^{-1}X^T\\vec{t}")}</div>
    </>
  );
}
