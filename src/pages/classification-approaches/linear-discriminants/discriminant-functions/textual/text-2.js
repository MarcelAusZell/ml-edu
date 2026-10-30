import latexFormula from "../../../../../utils/latex-formula";

export default function Text2() {
  return (
    <>
      It divides the feature space into two half-spaces. Every feature vector {latexFormula("\\vec{x}")} that lies on the 
      left side of the hyperplane is evaluated to {latexFormula("y(\\vec{x}) < 0", "orange")}, and every feature vector that lies on
      the right side of the hyperplane evaluates to {latexFormula("y(\\vec{x}) > 0", "steelblue")}. The hyperplane itself is defined by
      the equation {latexFormula("y(\\vec{x}) = 0")}. 
    </>
  );
}
