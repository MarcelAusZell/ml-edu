import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      Therefore, the gradient of logistic regression directly utilizes the input data points{" "}
      {latexFormula("\\vec{x}_n")} weighted by the classification error {latexFormula("(y_n - t_n)")} into the update
      rule. This first-order gradient descent suffers nonetheless from the flaws of first-order optimization.
      <span className="note-text">
        <br />
        The above update rule is also known as the Least Mean Squares (LMS) update rule because it shares the same as
        Least Squares, if we apply first-order optimization.
      </span>
    </>
  );
}
