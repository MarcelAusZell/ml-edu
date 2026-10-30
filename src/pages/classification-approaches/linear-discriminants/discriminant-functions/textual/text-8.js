import latexFormula from "../../../../../utils/latex-formula";

export default function Text8() {
  return (
    <>
      To see this lets us consider the orthogonal projection {latexFormula("\\vec{x_{\\perp}}")} of {latexFormula("\\vec{x}")} onto the decision boundary. 
      We see that walking a distance {latexFormula("r")} into the direction of the weight vector {latexFormula("\\vec{w}")} from the point {" "}
      {latexFormula("\\vec{x_{\\perp}}")} which lies on the decision boundary, we reach the point {latexFormula("\\vec{x}")}.
    </>
  );
}
