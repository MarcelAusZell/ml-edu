import latexFormula from "../../../../../utils/latex-formula";

export default function Text1() {
  return (
    <>
      In real-world applications of regression, the exact relationship between the input {latexFormula("x")} and the
      target value {latexFormula("t")} is typically unknown. The primary objective of regression is to construct a model
      that can approximate this relationship based on the data available. For this artificial example, let us for now
      consider a controlled example where the data is generated from a known, ideal function, for instance{" "}
      {latexFormula("mx + b")} to represent a simple linear relationship between input {latexFormula("x")} and target
      value {latexFormula("t")}. This ideal function will serve as a baseline against which we can evaluate the
      effectiveness of the regression model we will build.
    </>
  );
}
