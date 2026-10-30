import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      In the case of regression, the output is a continuous value {latexFormula("t_n \\in \\mathbb{R}")}. Unlike
      classification, where the goal is to assign inputs to predefined categories, regression aims to model the
      relationship between the input variables and the output, enabling us to predict a value within a continuous range.
      This means that instead of a decision boundary, we fit a function (e.g., a line in the case of linear regression)
      to the data points in such a way that it minimizes the difference between the predicted values and the actual
      values. This fitted function can then be used to make predictions.
      <br />
      <span className="note-text">
        The example shows a supervised case where a data point is specified through its feature and continues target
        value {latexFormula("(x, t_n)")} where {latexFormula("t_n \\in \\mathbb{R}")}
      </span>
    </>
  );
}
