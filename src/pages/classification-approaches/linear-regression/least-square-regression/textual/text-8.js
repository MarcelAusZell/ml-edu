import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      While this results in a low RMSE (or even zero) for the training data, the model performs poorly on new, unseen
      data due to its inability to generalize beyond the training set:
      <br />
      <span className="note-text">
        The RMSE is zero because for {latexFormula("9")} data points, a {latexFormula("9^{th}")}-degree polynomial can pass through all points exactly.
        This is not the case for new data points.
      </span>
    </>
  );
}
