import latexFormula from "../../../../../utils/latex-formula";

export default function Text4() {
  return (
    <>
      {latexFormula("\\dots")} whereas for a logistic regression that utilizes a discriminate approach we only need{" "}
      {latexFormula("M")} parameters. That means for big input feature space logistic regression is much more efficient.
      <br />
      <span className="note-text">{latexFormula("M+1")} parameters if we include the bias term</span>
    </>
  );
}
