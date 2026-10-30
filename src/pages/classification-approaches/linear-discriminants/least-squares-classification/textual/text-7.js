import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      The <span className="txt-2">ideal missclassification error</span> would give a penalty of {latexFormula("1")} for
      each missclassification and {latexFormula("0")} for each correct classification. That means instead of summing
      over the differences between the predicted and actual values, we would effectively count the number of
      missclassifications{" "}
      <div className="centered-text-container">
        {latexFormula("\\displaystyle \\sum_{n=1}^N E(z_n) = \\text{Number of missclassifications}")}.
      </div>
      So, we would end up minimizing the number of misclassified data points, which is the ideal function to minimize
      for. This function is challenging to minimize directly because it is discontinuous at zero and has zero gradients
      everywhere else. In other words, small changes in the model parameters do not lead to small changes in the
      function value, making it difficult for optimization algorithms to find a direction to improve the model.
    </>
  );
}
