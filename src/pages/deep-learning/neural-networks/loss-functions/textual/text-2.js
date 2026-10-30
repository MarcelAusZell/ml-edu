import latexFormula from "../../../../../utils/latex-formula";
import TextPlaceholder from "../../../../../utils/text-placeholder";

export default function Text2() {
  return (
    <>
      If we now want to apply Machine Learning the first step would be to describe the problem that we want to solve and
      then define how to quantify the performance of our model. In other words, we need to define an error function
      which we then can minimize:
      <div className="centered-text-container">
        {latexFormula(
          "E(\\vec{w}) = \\displaystyle\\sum_{n=1}^{N} L(t_n, y(\\vec{x}_n, \\vec{w})) + \\lambda \\Omega(\\vec{w})"
        )}
      </div>
      where the first term {latexFormula("L(t_n, y(\\vec{x}_n, \\vec{w}))")} is the loss function which quantifies the
      difference between the target value {latexFormula("t_n")} and the predicted value{" "}
      {latexFormula("y(\\vec{x}_n, \\vec{w})")} to measure the performance of the model. The second term{" "}
      {latexFormula("\\Omega(\\vec{w})")} is the regularization term and becomes an important consideration as we are
      now dealing with a model that has a large number of parameters. In the section about Regression we have already
      seen the {latexFormula("L_2")} regularizer{" "}
      {latexFormula("\\Omega(\\vec{w}) = \\frac{1}{2} \\lVert\\vec{w}\\rVert^2")} which prevents overfitting by
      penalizing large weights. There is also the {latexFormula("L_1")} regularizer{" "}
      {latexFormula("\\Omega(\\vec{w}) = \\lVert\\vec{w}\\rVert_1")} which is used to induce sparsity in the model.
    </>
  );
}
