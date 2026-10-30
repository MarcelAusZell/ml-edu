import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      {latexFormula("\\dots")} however the resulting error function which needs to be minimized, has a very small
      gradient for apparent misclassifications, it thus is very hard to learn from these errors because optimizing in
      the direction of the gradient will not change the output of the decision function by much.
      <span className="note-text">
        <br />
        The activation function will also lead to no closed-form solution, so that we need to use an iterative
        optimization algorithm. However, the error function is convex such that a unique minimum exists.
      </span>
    </>
  );
}
