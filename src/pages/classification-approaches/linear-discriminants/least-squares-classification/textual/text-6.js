import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      The continuous value of {latexFormula("z_n")} can be interpreted as a measure of confidence in the sense that it
      represents how far away the data points are from the decision boundary. The further away the data point is from
      the decision boundary, the higher the value of {latexFormula("y(x_n)")} and therefore the higher the value of{" "}
      {latexFormula("z_n")} / confidence in the classification. E.g. datapoints {latexFormula("z_n")} near 0 are close
      to the decision boundary and therefore the classification is less confident because there is higher uncertainty if
      the classification is correct.
      <br />
      Lastly {latexFormula("E(z_n)")} captures the error for the datapoint {latexFormula("z_n")}.
    </>
  );
}
