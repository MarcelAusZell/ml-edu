import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      In the previous section, we saw how to distinguish between classes using discriminant functions. The result of the
      training phase was a decision boundary that allows to predict the class - a discrete value e.g.{" "}
      {latexFormula("t_n \\in \\{-1, 1\\}")} - of a new data point.
      <br />
      <span className="note-text">
        The example shows a supervised case where a datapoint is specified through its feature and discrete target value{" "}
        {latexFormula("(x_1, x_2, t_n)")} where {latexFormula("t_n \\in \\{-1,1\\}")}
      </span>
    </>
  );
}
