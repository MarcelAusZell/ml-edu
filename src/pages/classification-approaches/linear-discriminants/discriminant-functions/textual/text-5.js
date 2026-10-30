import latexFormula from "../../../../../utils/latex-formula";

export default function Text5() {
  return (
    <>
      The bias term {latexFormula("w_{0}")} determines the location of the hyperplane in the feature space, {latexFormula("\\dots")}
    </>
  );
}
