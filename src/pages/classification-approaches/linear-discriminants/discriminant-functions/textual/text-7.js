import latexFormula from "../../../../../utils/latex-formula";

export default function Text7() {
  return (
    <>
      Lastly {latexFormula("y(\\vec{x})")} determines the distance from point {latexFormula("\\vec{x}")} to the decision boundary.
    </>
  );
}
