import latexFormula from "../../../../../utils/latex-formula";

export default function Text6() {
  return (
    <>
      {latexFormula("\\dots")} it shifts the decision boundary away from the origin.
      <br />
      <span className="note-text">
        In the case of two dimensions, the bias term {latexFormula("w_0")} is the intercept with the axis.
      </span>
    </>
  );
}
